"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'resident' | null>(null);
  const [residentName, setResidentName] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Mobile Menu Drag States
  const [touchStart, setTouchStart] = useState(0);
  const [touchOffset, setTouchOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const checkRole = async (session: any) => {
      if (!session) {
        setUserRole(null);
        return;
      }
      
      const user = session.user;
      const isAdmin = user.app_metadata?.provider === 'email' || user.email?.endsWith('baro-manage.com') || user.email?.endsWith('barobm.co.kr') || user.app_metadata?.role === 'admin';
      
      if (isAdmin) {
        setUserRole('admin');
      } else {
        // 입주민의 경우, DB에서 실제로 '등록 완료(is_registered)' 상태인지 확인
        let rawPhone = user.user_metadata?.stored_phone || user.user_metadata?.phone_number || "";
        let cleanPhone = rawPhone.replace(/^\+82\s?/, "0").replace(/[^0-9]/g, "");

        if (cleanPhone) {
          // 전화번호 하이픈 처리 로직 (utils.ts의 formatPhoneNumberWithHyphen 참고)
          let hyphenPhone = cleanPhone;
          if (cleanPhone.length === 11) {
            hyphenPhone = `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
          } else if (cleanPhone.length === 10) {
            hyphenPhone = `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
          }

          const { data } = await supabase
            .from("pre_registered_residents")
            .select("is_registered")
            .or(`phone_number.eq.${cleanPhone},phone_number.eq.${hyphenPhone}`)
            .single();
          
          if (data?.is_registered) {
            setUserRole('resident');
            setResidentName(user.user_metadata?.full_name || user.user_metadata?.name || '입주민');
          } else {
            setUserRole(null);
          }
        } else {
          setUserRole(null);
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkRole(session);
      setIsAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      checkRole(session);
      setIsAuthLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Mobile Menu Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY;
    const offset = currentY - touchStart;
    
    // 위로 드래그할 때만 오프셋 적용
    if (offset < 0) {
      setTouchOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // 80px 이상 위로 드래그하면 메뉴 닫기
    if (touchOffset < -80) {
      setIsMobileMenuOpen(false);
    }
    setTouchOffset(0);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 h-[100px] md:h-[135px] z-50 border-b border-gray-100 flex items-center"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center justify-start shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="바로건물관리" 
              width={375} 
              height={120} 
              priority
              className="h-[90px] md:h-[120px] w-auto object-contain contrast-[1.05] brightness-[1.02] hover:opacity-90 transition origin-left -translate-y-[2px] md:-translate-y-[4px] cursor-pointer" 
            />
          </Link>
        </div>

        {/* GNB (Desktop) */}
        <nav className="hidden lg:flex flex-none justify-center items-center gap-4 xl:gap-6 font-[800] text-slate-800 text-[15px] xl:text-[16px] whitespace-nowrap mx-2">
          <Link href="/about" className="flex items-center hover:text-brand-primary transition">회사소개 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/notices" className="flex items-center hover:text-brand-primary transition">공지사항 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/services" className="flex items-center hover:text-brand-primary transition">서비스 소개 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/process" className="flex items-center hover:text-brand-primary transition">운영방식 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          <Link href="/cases" className="flex items-center hover:text-brand-primary transition">관리사례 <ChevronDown className="w-5 h-5 ml-0.5 text-slate-400" /></Link>
          {userRole === 'admin' && (
            <Link href="/admin/buildings" className="flex items-center text-brand-primary hover:text-brand-secondary transition">관리자 페이지 <ChevronDown className="w-5 h-5 ml-0.5 text-brand-primary/50" /></Link>
          )}
          {userRole === 'resident' && (
            <Link href="/resident" className="flex items-center text-brand-primary hover:text-brand-secondary transition">나의 입주민센터 <ChevronDown className="w-5 h-5 ml-0.5 text-brand-primary/50" /></Link>
          )}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center justify-end gap-3 whitespace-nowrap">
          <Link 
            href="/contact" 
            className="text-[#3c1e1e] font-black hover:bg-[#e6ce00] transition-colors px-5 py-2.5 rounded-full bg-[#FEE500] flex items-center gap-1.5 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9 2C4.029 2 0 4.978 0 8.649C0 10.96 1.488 12.986 3.754 14.167C3.518 14.939 2.593 17.587 2.533 17.787C2.473 17.986 2.628 18.066 2.766 17.973C2.905 17.88 5.767 15.938 6.786 15.241C7.502 15.42 8.243 15.514 9 15.514C13.971 15.514 18 12.536 18 8.865C18 5.194 13.971 2 9 2Z" fill="currentColor"/>
            </svg>
            카카오톡 상담
          </Link>
          <Link 
            href="/estimate" 
            className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm"
          >
            무료 견적 문의
          </Link>
          
          {/* 인증 로딩이 끝난 후에만 아래 버튼들을 표시 */}
          {!isAuthLoading && (
            <>
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
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleLogout}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    관리자 로그아웃
                  </button>
                </div>
              )}
              {userRole === 'resident' && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleLogout}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    {residentName} 로그아웃
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Buttons & Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          {!isAuthLoading && (
            <>
              {!userRole && (
                <Link 
                  href="/login" 
                  className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-bold text-xs shadow-sm"
                >
                  로그인
                </Link>
              )}
              {userRole === 'admin' && (
                <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-bold text-xs shadow-sm">
                  관리자
                </span>
              )}
              {userRole === 'resident' && (
                <Link 
                  href="/resident" 
                  className="bg-brand-primary text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-sm"
                >
                  센터
                </Link>
              )}
            </>
          )}
          <button 
            className="p-3 -mr-2 text-slate-600 hover:bg-slate-50 active:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden absolute top-[100px] md:top-[135px] left-0 w-full bg-white border-b border-gray-100 shadow-xl z-40 transition-transform duration-300 ease-out origin-top overflow-hidden select-none"
          style={{ 
            transform: `translateY(${touchOffset < 0 ? touchOffset : 0}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Handle for Swipe-up Hint */}
          <div className="w-full flex justify-center py-2 opacity-50">
            <div className="w-10 h-1 bg-slate-200 rounded-full" />
          </div>

          <nav 
            className="flex flex-col px-6 pb-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Link href="/notices" className="w-full block text-lg font-black text-slate-800 py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>공지사항</Link>
            <Link href="/services" className="w-full block text-lg font-black text-slate-800 py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>서비스 소개</Link>
            <Link href="/process" className="w-full block text-lg font-black text-slate-800 py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>운영방식</Link>
            <Link href="/cases" className="w-full block text-lg font-black text-slate-800 py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>관리사례</Link>
            <Link href="/about" className="w-full block text-lg font-black text-slate-800 py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>회사소개</Link>
            <Link href="/contact" className="w-full flex items-center gap-2 text-lg font-black text-[#3c1e1e] py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 2C4.029 2 0 4.978 0 8.649C0 10.96 1.488 12.986 3.754 14.167C3.518 14.939 2.593 17.587 2.533 17.787C2.473 17.986 2.628 18.066 2.766 17.973C2.905 17.88 5.767 15.938 6.786 15.241C7.502 15.42 8.243 15.514 9 15.514C13.971 15.514 18 12.536 18 8.865C18 5.194 13.971 2 9 2Z" fill="currentColor"/>
              </svg>
              카톡/전화 상담
            </Link>
            {userRole === 'admin' && (
              <Link href="/admin/buildings" className="w-full block text-lg font-black text-brand-primary py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>관리자 페이지</Link>
            )}
            {userRole === 'resident' && (
              <Link href="/resident" className="w-full block text-lg font-black text-brand-primary py-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>나의 입주민센터</Link>
            )}
            
            <div 
              className="pt-4 space-y-3"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Link 
                href="/estimate" 
                className="w-full block bg-brand-primary text-white text-center py-3.5 rounded-xl font-black shadow-md active:scale-95 transition-all" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                무료 견적 문의
              </Link>
              
              {!isAuthLoading && (
                <>
                  {!userRole && (
                    <Link 
                      href="/login" 
                      className="w-full block bg-slate-100 text-slate-700 text-center py-3.5 rounded-xl font-black shadow-sm active:scale-95 transition-all" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                    >
                      로그인
                    </Link>
                  )}
                  {(userRole === 'admin' || userRole === 'resident') && (
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full block bg-slate-50 text-slate-500 text-center py-3.5 rounded-xl font-bold border border-slate-100 active:scale-95 transition-all"
                    >
                      로그아웃
                    </button>
                  )}
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
