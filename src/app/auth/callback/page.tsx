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
      const fullName = metadata.full_name || metadata.name || "";

      console.log("Session User:", session.user);
      console.log("User Metadata:", metadata);

      // [핵심] Supabase-Kakao 연동 버그로 인해 phone_number가 "1"로 오는 문제가 있음.
      // 대신 이전에 사용자가 직접 입력하여 updateUser로 저장한 'stored_phone' 값을 우선 사용.
      const storedPhone = formatPhoneNumber(metadata.stored_phone || "");
      
      // storedPhone이 없으면 등록 페이지에서 전화번호를 직접 입력받음
      if (!storedPhone) {
        console.warn("저장된 전화번호 없음. 등록 페이지로 이동합니다.");
        setStatus("전화번호 등록이 필요합니다.");
        const params = new URLSearchParams();
        if (fullName) params.append("name", fullName);
        router.push(`/resident/register?${params.toString()}`);
        return;
      }

      setStatus("입주민 명단을 조회 중입니다...");

      const hyphenPhone = storedPhone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

      const { data: residents, error: dbError } = await supabase
        .from("pre_registered_residents")
        .select("*")
        .or(`phone_number.eq.${storedPhone},phone_number.eq.${hyphenPhone}`);

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
            name: fullName || residents[0].name
          })
          .eq("id", residents[0].id);
          
        setTimeout(() => router.push("/resident"), 800);
      } else {
        console.warn("명단에 일치하는 번호가 없습니다. (입력된 번호:", storedPhone, ")");
        setStatus("미등록 사용자입니다. 인증 페이지로 이동합니다.");
        const params = new URLSearchParams();
        if (fullName) params.append("name", fullName);
        if (storedPhone) params.append("phone", storedPhone);
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
