"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { formatPhoneNumber, formatPhoneNumberWithHyphen } from "@/lib/utils";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("로그인 정보를 확인하고 있습니다...");

  useEffect(() => {
    let isSubscribed = true;

    const checkUserAndRedirect = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (event === 'SIGNED_IN' && newSession && isSubscribed) {
              subscription.unsubscribe();
              processSession(newSession);
            }
          });
          
          setTimeout(() => {
            if (isSubscribed) router.push("/login");
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

      const metadata = session.user.user_metadata || {};
      const identities = session.user.identities || [];
      const kakaoIdentity = identities.find((id: any) => id.provider === 'kakao');
      const identityData = kakaoIdentity?.identity_data || {};

      // [핵심] 카카오 본명 추출 (우선순위: identityData.name -> kakao_account.name -> metadata)
      const realName = identityData.name || identityData.kakao_account?.name || metadata.name || metadata.full_name || "이름없음";

      console.log("Session User:", session.user);
      console.log("User Metadata:", metadata);
      console.log("Identity Data:", identityData);

      // 전화번호 추출 (직접 입력한 stored_phone 우선, 그 다음 카카오 제공 정보)
      const rawPhone = metadata.stored_phone 
                    || session.user.phone 
                    || metadata.phone_number 
                    || metadata.phone 
                    || identityData.phone_number 
                    || identityData.phone 
                    || identityData.kakao_account?.phone_number
                    || identityData.kakao_account?.phone
                    || identityData.profile?.phone_number
                    || "";

      const cleanPhone = formatPhoneNumber(rawPhone);
      
      // 전화번호를 못 가져온 경우 (에러 팝업 대신 조용히 등록 페이지로 이동)
      if (!cleanPhone || cleanPhone.length < 10) {
        console.warn("저장되거나 카카오에서 제공받은 전화번호가 부족합니다. 수동 등록 페이지로 이동합니다.");
        setStatus("전화번호 등록이 필요합니다.");
        const params = new URLSearchParams();
        if (realName !== "이름없음") params.append("name", realName);
        router.push(`/resident/register?${params.toString()}`);
        return;
      }

      setStatus("입주민 명단을 조회 중입니다...");

      // 하이픈이 포함된 형식으로 변환 (010-XXXX-XXXX)
      const hyphenPhone = formatPhoneNumberWithHyphen(cleanPhone);

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
        setStatus(`${realName}님, 환영합니다!`);
        
        // 관리자용 저장을 위해 본명과 포맷팅된 전화번호(하이픈 포함)로 확실하게 업데이트
        await supabase
          .from("pre_registered_residents")
          .update({ 
            is_registered: true,
            name: realName,
            phone_number: hyphenPhone // 010-XXXX-XXXX 형식 저장
          })
          .eq("id", residents[0].id);
          
        setTimeout(() => router.push("/resident"), 800);
      } else {
        console.warn("명단에 일치하는 번호가 없습니다. (입력/수신된 번호:", hyphenPhone, ")");
        setStatus("미등록 사용자입니다. 인증 페이지로 이동합니다.");
        const params = new URLSearchParams();
        if (realName !== "이름없음") params.append("name", realName);
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
