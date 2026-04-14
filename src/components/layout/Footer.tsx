import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">바로바로건물관리</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              건물관리의 모든 것을 즉시 해결합니다.<br />
              당신의 건물의 가치를 가장 빠르고 확실하게<br />
              높여드리는 B2B 전문 파트너.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">고객 센터</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-white text-lg font-bold">1588-0000</span> (24시)
              </li>
              <li>help@barobaro.com</li>
              <li>Fax: 02-123-4567</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">빠른 메뉴</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-white transition">서비스 소개</Link></li>
              <li><Link href="/resident" className="hover:text-white transition">입주민센터</Link></li>
              <li><Link href="/estimate" className="hover:text-white transition">온라인 견적</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">본사 위치</h4>
            <p className="text-sm leading-relaxed mb-3">
              서울특별시 강남구 테헤란로 123<br />
              바로바로타워 1층
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 바로바로건물관리 (Barobaro Building Management). All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">이용약관</Link>
            <Link href="#" className="text-slate-300 font-bold hover:text-white">개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
