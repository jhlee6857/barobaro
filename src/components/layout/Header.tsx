"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'resident' | null>(null);

  useEffect(() => {
    const checkRole = (session: any) => {
      if (!session) {
        setUserRole(null);
        return;
      }
      // 카카오 로그인인 경우 입주민, 이메일 로그인인 경우 관리자
      if (session.user.app_metadata?.provider === 'kakao') {
        setUserRole('resident');
      } else {
        setUserRole('admin');
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkRole(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      checkRole(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] md:h-[135px] bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center flex-none w-auto lg:w-[350px]">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="바로건물관리" 
              width={400} 
              height={120} 
              priority
              className="h-[85px] md:h-[120px] w-auto object-contain mix-blend-multiply hover:opacity-90 transition transform scale-[2.2] md:scale-[2.5] origin-left" 
            />
          </Link>
        </div>

        {/* GNB (Desktop) */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-10 font-[800] text-slate-800 text-[15px] xl:text-[17px] whitespace-nowrap">
          <Link href="/services" className="flex items-center hover:text-brand-primary transition">서비스 소개 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/process" className="flex items-center hover:text-brand-primary transition">운영방식 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/cases" className="flex items-center hover:text-brand-primary transition">관리사례 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/notices" className="flex items-center hover:text-brand-primary transition">공지사항</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center justify-end gap-3 flex-none w-auto lg:w-[350px] whitespace-nowrap">
          <Link 
            href="/contact" 
            className="text-[#3c1e1e] font-black hover:bg-[#e6ce00] transition-colors px-5 py-2.5 rounded-full bg-[#FEE500] flex items-center gap-1.5 shadow-sm"
          >
            카카오톡 상담
          </Link>
          <Link 
            href="/estimate" 
            className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm"
          >
            무료 견적 문의
          </Link>
          <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>
          {!userRole && (
            <Link 
              href="/login" 
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              로그인
            </Link>
          )}
          {userRole === 'admin' && (
            <Link 
              href="/admin/buildings" 
              className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              관리자 대시보드
            </Link>
          )}
          {userRole === 'resident' && (
            <Link 
              href="/resident" 
              className="bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              나의 입주민센터
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100px] left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col px-6 py-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-4">
            <Link href="/services" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>서비스 소개</Link>
            <Link href="/process" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>운영방식</Link>
            <Link href="/cases" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>관리사례</Link>
            <Link href="/notices" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>공지사항</Link>
            <Link href="/about" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>회사소개</Link>
            <Link href="/contact" className="text-lg font-bold text-brand-primary pb-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>카톡/전화 상담</Link>
            <Link href="/estimate" className="bg-brand-primary text-white text-center py-3 rounded-xl font-bold shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>무료 견적 문의</Link>
            {!userRole && (
              <Link href="/login" className="bg-slate-100 text-slate-700 text-center py-3 rounded-xl font-bold shadow-sm mt-2" onClick={() => setIsMobileMenuOpen(false)}>로그인</Link>
            )}
            {userRole === 'admin' && (
              <Link href="/admin/buildings" className="bg-slate-800 text-white text-center py-3 rounded-xl font-bold shadow-sm mt-2" onClick={() => setIsMobileMenuOpen(false)}>관리자 대시보드</Link>
            )}
            {userRole === 'resident' && (
              <Link href="/resident" className="bg-brand-primary text-white text-center py-3 rounded-xl font-bold shadow-sm mt-2" onClick={() => setIsMobileMenuOpen(false)}>나의 입주민센터</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
