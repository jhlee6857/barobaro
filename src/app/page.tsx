import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { mockCases, faqData, servicesPreview, processSteps } from "@/data/mockData";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 bg-brand-dark overflow-hidden flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="container relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            건물관리는,<br className="md:hidden" /> <span className="text-brand-secondary">바로.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium mb-10">
            접수는 빠르게, 대응은 정확하게, 관리는 투명하게.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/estimate" className="w-full sm:w-auto text-center bg-brand-secondary hover:bg-brand-accent text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              무료 견적 문의
            </Link>
            <Link href="/resident" className="w-full sm:w-auto text-center border-2 border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              입주민 민원 접수
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Strengths */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">왜 바로건물관리인가요?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">기존 관리업체의 느린 대응과 불투명성을 완벽히 해결한 4대 강점을 약속합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-none shadow-sm hover:shadow-md transition">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">빠른 응답</h3>
              <p className="text-slate-500 text-sm">접수부터 방문까지 압도적인 속도로 문제를 초기에 진압합니다.</p>
            </Card>
            <Card className="text-center p-6 border-none shadow-sm hover:shadow-md transition">
               <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">책임 직영제</h3>
              <p className="text-slate-500 text-sm">하청이 아닌 직영 마스터를 파견하여 서비스 품질을 유지합니다.</p>
            </Card>
            <Card className="text-center p-6 border-none shadow-sm hover:shadow-md transition">
               <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">투명한 회계/안전</h3>
              <p className="text-slate-500 text-sm">철저한 보안, 비공개 접수 폼 및 투명한 월별 비용 청구를 지향합니다.</p>
            </Card>
            <Card className="text-center p-6 border-none shadow-sm hover:shadow-md transition">
               <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">높은 입주민 만족도</h3>
              <p className="text-slate-500 text-sm">갈등을 미연에 방지하는 체계적 민원 관리 시스템을 갖췄습니다.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Services Summary */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">어떤 관리가 필요하신가요?</h2>
              <p className="text-slate-600">청소부터 하자보수, 회계까지 건물관리에 필요한 모든 것을 대행합니다.</p>
            </div>
            <Link href="/services" className="hidden md:inline-flex text-brand-secondary font-bold hover:underline">
              전체 서비스 보기 &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesPreview.map((srv) => (
              <Card key={srv.id} className="hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-800">{srv.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">{srv.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/services" className="text-brand-secondary font-bold hover:underline">
               전체 서비스 보기 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">투명하고 빈틈없는 운영 절차</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">계약 맺고 끝나는 것이 아닌, 진짜 관리는 지금부터 시작입니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>
            {processSteps.map((step, idx) => (
              <div key={step.id} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-brand-light flex items-center justify-center shadow-sm mb-6 text-2xl font-black text-brand-primary">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Case Study */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">단지 가치 상승의 증명</h2>
              <p className="text-slate-600">실제 바로건물관리 도입 전/후 어떤 변화가 일어났는지 확인해보세요.</p>
            </div>
            <Link href="/cases" className="hidden md:inline-flex text-brand-secondary font-bold hover:underline">
              모든 사례 보기 &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockCases.slice(0, 2).map((c) => (
              <div key={c.id} className="flex flex-col border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-brand-light text-brand-primary text-xs font-bold rounded-full mb-2">
                      {c.region}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">{c.buildingType}</h3>
                  </div>
                  <div className="text-sm text-slate-500 font-medium">{c.scale}</div>
                </div>
                <div className="p-6 bg-white space-y-4">
                  <div>
                     <strong className="block text-sm text-slate-400 mb-1">AS-IS (주요문제)</strong>
                     <p className="text-slate-700 text-sm">{c.mainProblem}</p>
                  </div>
                  <div>
                     <strong className="block text-sm text-brand-secondary mb-1">TO-BE (개선결과)</strong>
                     <p className="text-slate-800 font-medium text-sm">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/cases" className="text-brand-secondary font-bold hover:underline">
              모든 사례 보기 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">자주 묻는 질문</h2>
            <p className="text-slate-600">고객님들이 가장 궁금해하시는 점들을 모았습니다.</p>
          </div>
          
          <Accordion items={faqData} />
          
          <div className="text-center mt-10">
            <Link href="/resident" className="text-slate-500 hover:text-brand-primary text-sm font-bold transition">
              입주민센터에서 더 많은 정보 확인하기 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-24 bg-brand-primary text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            신뢰할 수 있는 건물관리 파트너,<br />바로건물관리
          </h2>
          <p className="text-brand-light mb-10 text-lg opacity-90 max-w-xl mx-auto">
            내 건물처럼 아끼고 투명하게 관리하겠습니다. 지금 바로 전문가의 무료 1:1 방문 컨설팅을 받아보세요.
          </p>
          <Link href="/estimate" className="inline-block bg-white text-brand-primary hover:bg-slate-100 px-10 py-5 rounded-full font-black text-xl transition-transform hover:-translate-y-1 shadow-xl">
            무료 견적 문의하기
          </Link>
        </div>
      </section>
    </div>
  );
}
