import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "회사소개 | 바로건물관리 - 연혁·철학·조직",
  description: "바로건물관리는 하청없는 직영 마스터 파견으로 신뢰할 수 있는 건물관리를 실현합니다. 회사 연혁, 운영 철학, 전문 인력 현황을 확인하세요.",
  keywords: ["바로건물관리 회사소개", "건물관리 업체", "바로건물관리 연혁", "직영관리", "종합건물관리 업체"],
  alternates: { canonical: "https://barobm.co.kr/about" },
  openGraph: {
    title: "회사소개 | 바로건물관리",
    description: "올바르고 깨끗한 공간 문화를 상조하는 건물관리 전문 파트너",
    url: "https://barobm.co.kr/about",
  },
};


export default function AboutPage() {
  return (
    <div>
      <PageHero 
        title="회사소개" 
        description="올바르고 깨끗한 공간 문화를 창조하는 건물관리 전문 파트너." 
      />

      {/* 인사말 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-full md:w-1/2 aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden relative shadow-lg">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-brand-dark mb-6 leading-tight">
                건물의 가치를 높이는 것,<br />그 시작은 올바른 관리입니다.
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>안녕하십니까, 바로건물관리 대표이사입니다.</p>
                <p>과거의 건물관리는 단순히 청소하고 전구를 갈아끼우는 수동적인 성격이 강했습니다. 하지만 오늘날의 건물은 소유주에게는 주요 자산이자 거주자/이용자에게는 쾌적함을 누릴 수 있는 생활의 터전입니다.</p>
                <p>저희 바로건물관리는 하청의 재하청으로 이루어진 낡은 산업 구조를 혁신하고자 시작되었습니다. 국가 자격을 겸비한 직영 마스터들의 전문성, IT 시스템을 활용한 투명한 정보 공개, 24시간 상황실 운영을 통한 압도적인 응답성으로 업계의 표준을 새롭게 쓰고 있습니다.</p>
                <p>지금 내 건물에서 악취가 나거나 민원이 끊이지 않는다면, 바로를 불러주세요. 결과로 증명하겠습니다.</p>
                <p className="mt-8 font-bold text-slate-800 text-lg">바로건물관리 임직원 일동</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 회사 개요 및 철학 */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">운영 철학 및 핵심가치</h2>
            <p className="text-slate-600">우리가 일하는 방식이며 고객과 맺는 약속입니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-sm pb-6">
              <div className="w-full h-32 bg-brand-light flex items-center justify-center mb-6 rounded-t-xl text-brand-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <CardContent>
                <h3 className="text-xl font-bold mb-3 text-slate-800">투명성(Transparency)</h3>
                <p className="text-slate-500 text-sm">관리비 1원의 쓰임새도 투명하게 공개하여 관리단과 신뢰 관계를 형성합니다.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-sm pb-6">
              <div className="w-full h-32 bg-brand-light flex items-center justify-center mb-6 rounded-t-xl text-brand-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <CardContent>
                <h3 className="text-xl font-bold mb-3 text-slate-800">신속성(Agility)</h3>
                <p className="text-slate-500 text-sm">접수된 모든 민원과 하자는 24시간 내 초동 대처하는 것을 원칙으로 합니다.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-sm pb-6">
              <div className="w-full h-32 bg-brand-light flex items-center justify-center mb-6 rounded-t-xl text-brand-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4 4-4-4M12 8v7"/></svg>
              </div>
              <CardContent>
                <h3 className="text-xl font-bold mb-3 text-slate-800">전문성(Expertise)</h3>
                <p className="text-slate-500 text-sm">전기, 소방, 설비 등 각 분야의 라이선스 보유 직영 마스터가 직접 건물을 점검합니다.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 조직도 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-brand-dark mb-12">조직 및 전문 인력 현황</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-black text-3xl text-brand-primary mb-2">CS 상황실</div>
              <p className="text-sm text-slate-600 font-bold">24H 민원/콜센터 응대</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-black text-3xl text-brand-primary mb-2">FM 설비팀</div>
              <p className="text-sm text-slate-600 font-bold">건축, 전기, 설비 기사</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-black text-3xl text-brand-primary mb-2">클린 마스터</div>
              <p className="text-sm text-slate-600 font-bold">방역 밎 환경 위생 전담</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-black text-3xl text-brand-primary mb-2">행정 지원팀</div>
              <p className="text-sm text-slate-600 font-bold">회계, 관리비 산출 및 부과</p>
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
         <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">오시는 길</h2>
            <p className="text-slate-600">방문 상담을 원하시는 고객님께서는 사전에 예약 부탁드립니다.</p>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3 h-80 md:h-auto bg-slate-200 rounded-xl overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-70"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow font-bold text-slate-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    본사 (지도 표출 영역)
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6">
              <div>
                <h4 className="font-bold text-slate-500 mb-1 text-sm">주소</h4>
                <p className="text-slate-800 font-medium">서울특별시 강남구 테헤란로 123<br />바로타워 1층</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-500 mb-1 text-sm">고객센터 대표번호</h4>
                <p className="text-brand-primary font-black text-xl">010-3811-4066</p>
                <p className="text-sm text-slate-500 mt-1">평일 09:00 ~ 18:00 (주말 휴무)<br />※ 긴급 민원은 24시간 상황실 연결</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-500 mb-1 text-sm">상담 이메일</h4>
                <p className="text-slate-800 font-medium">lyc342@naver.com</p>
              </div>
            </div>
          </div>
         </div>
      </section>
    </div>
  )
}
