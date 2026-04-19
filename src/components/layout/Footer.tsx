import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">바로건물관리</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              건물관리의 모든 것을 즉시 해결합니다.<br />
              공동주택·빌라·소형빌딩 종합관리 전문.<br />
              B2B 건물관리 전문 파트너.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">고객 센터</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-white text-lg font-bold">010-3811-4066</span> (24시)
              </li>
              <li>lyc342@naver.com</li>
              <li className="pt-2">
                <Link href="/estimate" className="inline-block bg-brand-secondary hover:bg-brand-accent text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                  무료 건물관리 견적 문의 →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">건물관리 서비스</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-white transition">종합건물관리 서비스 소개</Link></li>
              <li><Link href="/process" className="hover:text-white transition">건물관리 운영방식</Link></li>
              <li><Link href="/cases" className="hover:text-white transition">건물관리 사례 보기</Link></li>
              <li><Link href="/resident" className="hover:text-white transition">입주민 민원 접수</Link></li>
              <li><Link href="/about" className="hover:text-white transition">회사소개</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">본사 위치</h4>
            <address className="text-sm leading-relaxed mb-3 not-italic">
              서울특별시 강남구 테헤란로 123<br />
              바로타워 1층
            </address>
            <p className="text-xs text-slate-500">평일 09:00 ~ 18:00<br />긴급 민원 24시간 대응</p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2026 바로건물관리 (Baro Building Management). All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

