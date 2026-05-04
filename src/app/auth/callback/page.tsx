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
      console.log("Kakao Auth Metadata:", metadata);

      const fullName = metadata.full_name || metadata.name || "";
      const rawPhone = metadata.phone_number || "";
      const cleanPhone = formatPhoneNumber(rawPhone);
      
      console.log("Cleaned Phone Number:", cleanPhone);

      if (!cleanPhone) {
        console.error("전화번호 정보가 없습니다. 카카오 설정이나 동의항목을 확인해주세요.");
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
        
        await supabase
          .from("pre_registered_residents")
          .update({ 
            is_registered: true,
            name: residents[0].name || fullName 
          })
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
