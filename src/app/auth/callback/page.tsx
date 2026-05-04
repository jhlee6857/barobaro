"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "@/lib/utils";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("로그인 정보를 확인하고 있습니다...");

  useEffect(() => {
    let isSubscribed = true;

    const checkUserAndRedirect = async () => {
      try {
        // 1. 현재 세션 확인
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        // 세션이 아직 없다면 조금 더 기다려봅니다 (OAuth 교환 시간 고려)
        if (!session) {
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (event === 'SIGNED_IN' && newSession && isSubscribed) {
              subscription.unsubscribe();
              processSession(newSession);
            }
          });
          
          // 5초 후에도 세션이 없으면 로그인 페이지로 이동
          setTimeout(() => {
            if (isSubscribed) {
              router.push("/login");
            }
          }, 5000);
          return;
        }

        processSession(session);

      } catch (error) {
        console.error("Callback error:", error);
        setStatus("오류가 발생했습니다. 다시 로그인해 주세요.");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    const processSession = async (session: any) => {
      if (!isSubscribed) return;

      setStatus("사용자 정보를 분석 중입니다...");

      // [디버깅] 카카오에서 넘어온 메타데이터 전체 출력
      const metadata = session.user.user_metadata || {};
      const identities = session.user.identities || [];
      const kakaoIdentity = identities.find((id: any) => id.provider === 'kakao');
      const identityData = kakaoIdentity?.identity_data || {};
      
      console.log("Session User:", session.user);
      console.log("Kakao Auth Metadata:", metadata);
      console.log("Kakao Identity Data:", identityData);

      const fullName = metadata.full_name || metadata.name || identityData.name || "";
      
      // 전화번호를 얻을 수 있는 모든 경로 탐색 (카카오 응답 구조 반영: kakao_account 내부에 존재)
      const rawPhone = session.user.phone 
                    || metadata.phone_number 
                    || metadata.phone 
                    || identityData.phone_number 
                    || identityData.phone 
                    || identityData.kakao_account?.phone_number
                    || identityData.kakao_account?.phone
                    || identityData.profile?.phone_number
                    || "";
                    
      const cleanPhone = formatPhoneNumber(rawPhone);
      
      console.log("Cleaned Phone Number:", cleanPhone);

      if (!cleanPhone) {
        console.error("전화번호 정보가 없습니다. 카카오 설정이나 동의항목을 확인해주세요.");
        alert(
          "카카오 로그인에서 전화번호를 가져오지 못했습니다.\n\n" +
          "만약 예전에 권한 동의 없이 가입하신 적이 있다면,\n" +
          "[카카오톡 > 설정 > 카카오계정 > 연결된 서비스 관리]에서 '바로건물관리'의 연결을 끊고 다시 로그인해 주세요."
        );
        router.push("/resident/register");
        return;
      }

      setStatus("입주민 명단을 조회 중입니다...");

      // 1. 하이픈 없는 번호로 검색
      // 2. 혹시 DB에 하이픈이 있을 수 있으므로 하이픈 포함된 번호도 생성
      const hyphenPhone = cleanPhone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

      const { data: residents, error: dbError } = await supabase
        .from("pre_registered_residents")
        .select("*")
        .or(`phone_number.eq.${cleanPhone},phone_number.eq.${hyphenPhone}`);

      if (dbError) {
        console.error("DB 조회 오류:", dbError);
        router.push("/resident/register");
        return;
      }

      console.log("Found residents from DB:", residents);

      if (residents && residents.length > 0) {
        setStatus(`${fullName || residents[0].name}님, 환영합니다!`);
        
        // [중요] DB에 저장된 전화번호가 부실하거나(예: "1") 업데이트가 필요한 경우 진짜 번호로 갱신
        const updateData: any = { is_registered: true };
        if (fullName) updateData.name = fullName;
        
        // 현재 DB의 번호가 "1"이거나 너무 짧다면 카카오에서 가져온 번호로 덮어씌움
        if (residents[0].phone_number === "1" || residents[0].phone_number.length < 9) {
          updateData.phone_number = cleanPhone;
        }

        await supabase
          .from("pre_registered_residents")
          .update(updateData)
          .eq("id", residents[0].id);
          
        setTimeout(() => router.push("/resident"), 800);
      } else {
        console.warn("명단에 일치하는 번호가 없습니다. (입력된 번호:", cleanPhone, ")");
        setStatus("미등록 사용자입니다. 인증 페이지로 이동합니다.");
        const params = new URLSearchParams();
        if (fullName) params.append("name", fullName);
        if (cleanPhone) params.append("phone", cleanPhone);
        router.push(`/resident/register?${params.toString()}`);
      }
    };

    checkUserAndRedirect();

    return () => {
      isSubscribed = false;
    };
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mb-4"></div>
      <p className="text-slate-600 font-medium">{status}</p>
    </div>
  );
}
