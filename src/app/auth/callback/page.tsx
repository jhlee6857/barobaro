"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("로그인 정보를 확인하고 있습니다...");

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session) {
          router.push("/login");
          return;
        }

        setStatus("입주민 명단을 조회 중입니다...");

        // 카카오에서 넘어온 전화번호 추출
        // 카카오 정책에 따라 phone_number 형식이 다를 수 있음 (예: +82 10-1234-5678)
        let rawPhone = session.user.user_metadata?.phone_number || "";
        
        // 국가번호(+82) 제거 및 하이픈 등 특수문자 제거하여 숫자만 추출
        let cleanPhone = rawPhone.replace(/^\+82\s?/, "0").replace(/[^0-9]/g, "");

        if (!cleanPhone) {
          // 전화번호가 없는 경우 (동의를 안했거나 심사 전)
          // 임시 테스트를 위해 고유 ID나 닉네임 등을 쓸 수 있으나, 정석대로라면 PIN 등록 화면으로 보냅니다.
          router.push("/resident/register");
          return;
        }

        // 사전 등록 명단에서 전화번호 검색
        const { data: residents, error: dbError } = await supabase
          .from("pre_registered_residents")
          .select("id, is_registered")
          .eq("phone_number", cleanPhone);

        if (dbError) throw dbError;

        if (residents && residents.length > 0) {
          // 일치하는 명단이 있으면 즉시 등록 완료 처리 후 대시보드로 이동
          const { error: updateError } = await supabase
            .from("pre_registered_residents")
            .update({ is_registered: true })
            .eq("phone_number", cleanPhone);
            
          if (updateError) console.error("상태 업데이트 실패:", updateError);
          
          setStatus("환영합니다! 대시보드로 이동합니다.");
          router.push("/resident");
        } else {
          // 명단에 없으면 PIN 등록 화면으로 이동
          setStatus("등록된 정보가 없습니다. 인증 화면으로 이동합니다.");
          router.push("/resident/register");
        }

      } catch (error) {
        console.error("Callback error:", error);
        setStatus("오류가 발생했습니다. 다시 로그인해 주세요.");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    checkUserAndRedirect();
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mb-4"></div>
      <p className="text-slate-600 font-medium">{status}</p>
    </div>
  );
}
