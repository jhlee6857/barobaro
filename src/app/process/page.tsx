import { PageHero } from "@/components/shared/PageHero";
import { processSteps } from "@/data/mockData";

export default function ProcessPage() {
  return (
    <div>
      <PageHero 
        title="운영방식" 
        description="투명하고 꼼꼼한 관리 시스템. 문제 접수부터 해결까지 체계적인 매뉴얼로 움직입니다."
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-16">계약 및 정기관리 프로세스</h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {processSteps.map((step, idx) => (
              <div key={step.id} className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start group">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center text-2xl font-black shrink-0 relative z-10 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  {idx !== processSteps.length - 1 && (
                    <div className="w-1 h-24 bg-slate-200 -mt-2 group-hover:bg-brand-light transition-colors"></div>
                  )}
                </div>
                
                <div className="md:hidden w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center text-2xl font-black shrink-0 mx-auto">
                  {idx + 1}
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl w-full border border-slate-100 hover:border-brand-light transition-colors text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">비상 대응 체계</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">야간, 주말, 공휴일에 관계없이 긴급 상황에 대비합니다.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-center text-center">
              <div className="mb-6 md:mb-0">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                  <span className="font-bold">상황 발생</span>
                </div>
                <p className="text-sm font-bold text-slate-700">누수, 정전, 화재 등</p>
              </div>
              
              <div className="hidden md:block w-24 h-0.5 bg-slate-200 relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-slate-300 rotate-45 transform origin-center"></div>
              </div>
              <div className="md:hidden h-10 w-0.5 bg-slate-200 my-4"></div>

              <div className="mb-6 md:mb-0">
                <div className="w-20 h-20 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-100">
                  <span className="font-bold">1588 상황실</span>
                </div>
                <p className="text-sm font-bold text-slate-700">24시 접수 및 전파</p>
              </div>

              <div className="hidden md:block w-24 h-0.5 bg-slate-200 relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-slate-300 rotate-45 transform origin-center"></div>
              </div>
              <div className="md:hidden h-10 w-0.5 bg-slate-200 my-4"></div>

              <div>
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <span className="font-bold">즉시 출동</span>
                </div>
                <p className="text-sm font-bold text-slate-700">인근 기사 응급 보수</p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-slate-50 rounded-xl text-center">
              <p className="text-slate-600 text-sm">※ 상황 종료 후 다음 영업일에 상세 내역 보고 및 정식 수리 견적(필요시)을 제출합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
