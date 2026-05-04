"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

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

      setStatus("입주민 명단을 조회 중입니다...");

      // 카카오에서 넘어온 정보 추출
      const metadata = session.user.user_metadata || {};
      const fullName = metadata.full_name || metadata.name || "";
      const rawPhone = metadata.phone_number || "";
      
      // 전화번호 정제: +82 10-1234-5678 -> 01012345678
      let cleanPhone = rawPhone.replace(/^\+82\s?/, "0").replace(/[^0-9]/g, "");
      
      // 만약 1012345678 형식으로 오면 앞에 0을 붙여줌
      if (cleanPhone.length === 10 && cleanPhone.startsWith("1")) {
        cleanPhone = "0" + cleanPhone;
      }

      if (!cleanPhone) {
        console.log("전화번호를 가져올 수 없어 인증 페이지로 이동합니다.");
        router.push("/resident/register");
        return;
      }

      // 사전 등록 명단에서 전화번호 검색
      const { data: residents, error: dbError } = await supabase
        .from("pre_registered_residents")
        .select("*")
        .eq("phone_number", cleanPhone);

      if (dbError) {
        console.error("DB Error:", dbError);
        router.push("/resident/register");
        return;
      }

      if (residents && residents.length > 0) {
        // 이미 등록된 입주민인 경우: 방문 기록 업데이트 및 이동
        await supabase
          .from("pre_registered_residents")
          .update({ 
            is_registered: true,
            // 이름이 비어있었다면 카카오에서 받은 이름으로 업데이트
            name: residents[0].name || fullName 
          })
          .eq("phone_number", cleanPhone);
          
        setStatus(`${fullName || "입주민"}님, 환영합니다! 대시보드로 이동합니다.`);
        setTimeout(() => router.push("/resident"), 1000);
      } else {
        // 명단에 없는 경우: PIN 코드 인증 페이지로 이동하되, 이름/번호 정보를 쿼리스트링으로 전달
        setStatus("등록된 정보가 없습니다. 인증 화면으로 이동합니다.");
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
