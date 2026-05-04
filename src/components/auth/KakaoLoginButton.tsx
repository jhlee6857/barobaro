"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface KakaoLoginButtonProps {
  label?: string;
  className?: string;
}

export default function KakaoLoginButton({ 
  label = "카카오로 시작하기", 
  className = "" 
}: KakaoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'consent', // 카카오 동의 화면 강제 노출 (새로운 권한 획득용)
          }
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Kakao login error:", error.message);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#e6cf00] text-black/85 font-bold py-3.5 px-6 rounded-xl transition-colors ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9 2C4.029 2 0 4.978 0 8.649C0 10.96 1.488 12.986 3.754 14.167C3.518 14.939 2.593 17.587 2.533 17.787C2.473 17.986 2.628 18.066 2.766 17.973C2.905 17.88 5.767 15.938 6.786 15.241C7.502 15.42 8.243 15.514 9 15.514C13.971 15.514 18 12.536 18 8.865C18 5.194 13.971 2 9 2Z" fill="currentColor"/>
      </svg>
      {isLoading ? "연결 중..." : label}
    </button>
  );
}
