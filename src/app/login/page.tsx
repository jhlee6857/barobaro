"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Link from "next/link";
import { UserCircle, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'resident' | 'admin'>('resident');
  
  // 관리자 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 이미 로그인된 사용자는 각각의 대시보드로 자동 리다이렉트
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        if (session.user.app_metadata?.provider === 'kakao') {
          // 입주민의 경우 실제 등록 여부 확인
          const rawPhone = session.user.user_metadata?.phone_number || "";
          const cleanPhone = rawPhone.replace(/^\+82\s?/, "0").replace(/[^0-9]/g, "");
          
          if (cleanPhone) {
            const { data } = await supabase
              .from("pre_registered_residents")
              .select("is_registered")
              .eq("phone_number", cleanPhone)
              .single();
            
            if (data?.is_registered) {
              router.push("/resident");
            } else {
              router.push("/resident/register");
            }
          } else {
            router.push("/resident/register");
          }
        } else {
          router.push("/admin/buildings");
        }
      }
    });
  }, [router]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/admin/buildings");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">바로 로그인</h1>
          <p className="text-slate-500 text-sm">스마트한 건물 관리의 시작</p>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
          <button 
            onClick={() => setActiveTab('resident')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'resident' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <UserCircle size={18} />
            입주민
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'admin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ShieldCheck size={18} />
            관리자
          </button>
        </div>

        {/* 입주민 로그인 탭 */}
        {activeTab === 'resident' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FEE500]">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 2C4.029 2 0 4.978 0 8.649C0 10.96 1.488 12.986 3.754 14.167C3.518 14.939 2.593 17.587 2.533 17.787C2.473 17.986 2.628 18.066 2.766 17.973C2.905 17.88 5.767 15.938 6.786 15.241C7.502 15.42 8.243 15.514 9 15.514C13.971 15.514 18 12.536 18 8.865C18 5.194 13.971 2 9 2Z" fill="black"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-800">카카오톡 1초 로그인</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                복잡한 회원가입 없이 카카오톡 계정으로<br/>안전하고 빠르게 로그인하세요.
              </p>
            </div>
            
            <KakaoLoginButton label="카카오로 로그인 (입주민 전용)" />
            
            <p className="text-xs text-center text-slate-400 mt-4">
              카카오 로그인 시 바로 서비스 이용약관 및<br/>개인정보 처리방침에 동의한 것으로 간주됩니다.
            </p>
          </div>
        )}

        {/* 관리자 로그인 탭 */}
        {activeTab === 'admin' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded-lg font-medium text-center">{error}</p>}
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">관리자 이메일</label>
                <input 
                  type="email" 
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-slate-800 outline-none transition-all bg-slate-50 focus:bg-white"
                  value={email} onChange={(e) => setEmail(e.target.value)} required 
                  placeholder="admin@barobm.co.kr"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">비밀번호</label>
                <input 
                  type="password" 
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-slate-800 outline-none transition-all bg-slate-50 focus:bg-white"
                  value={password} onChange={(e) => setPassword(e.target.value)} required 
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors mt-2 disabled:opacity-50"
              >
                {isLoading ? "인증 중..." : "관리자 로그인"}
              </button>
            </form>
          </div>
        )}

      </div>
      
      {/* 홈으로 돌아가기 */}
      <Link href="/" className="absolute bottom-8 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
        메인 홈으로 돌아가기
      </Link>
    </div>
  );
}
