import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] md:h-[135px] bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="바로바로건물관리" className="h-[85px] md:h-[120px] w-auto object-contain hover:opacity-90 transition" />
        </Link>

        {/* GNB (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-slate-700">
          <Link href="/services" className="hover:text-brand-secondary transition">서비스 소개</Link>
          <Link href="/process" className="hover:text-brand-secondary transition">운영방식</Link>
          <Link href="/cases" className="hover:text-brand-secondary transition">관리사례</Link>
          <Link href="/resident" className="hover:text-brand-secondary transition">입주민센터</Link>
          <Link href="/about" className="hover:text-brand-secondary transition">회사소개</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link 
            href="/estimate" 
            className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm"
          >
            무료 견적 문의
          </Link>
        </div>

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className="lg:hidden p-2 text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}
