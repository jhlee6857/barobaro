"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] md:h-[135px] bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="바로건물관리" className="h-[85px] md:h-[120px] w-auto object-contain mix-blend-multiply hover:opacity-90 transition" />
        </Link>

        {/* GNB (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-slate-700">
          <Link href="/services" className="hover:text-brand-secondary transition">서비스 소개</Link>
          <Link href="/process" className="hover:text-brand-secondary transition">운영방식</Link>
          <Link href="/cases" className="hover:text-brand-secondary transition">관리사례</Link>
          <Link href="/resident" className="hover:text-brand-secondary transition">입주민센터</Link>
          <Link href="/contact" className="px-4 py-1.5 bg-brand-light text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all font-bold">카카오톡 상담</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/contact" 
            className="text-brand-primary font-bold hover:text-brand-secondary transition-colors px-4 py-2 border border-brand-primary/20 rounded-full bg-brand-light/30 flex items-center gap-1.5"
          >
            카카오톡 상담
          </Link>
          <Link 
            href="/estimate" 
            className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm"
          >
            무료 견적 문의
          </Link>
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
            <Link href="/resident" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>입주민센터</Link>
            <Link href="/about" className="text-lg font-medium text-slate-800 pb-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>회사소개</Link>
            <Link href="/contact" className="text-lg font-bold text-brand-primary pb-4 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>카톡/전화 상담</Link>
            <Link href="/estimate" className="bg-brand-primary text-white text-center py-3 rounded-xl font-bold shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>무료 견적 문의</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
