import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { processSteps } from "@/data/mockData";

export const metadata: Metadata = {
  title: "운영방식 | 바로건물관리 - 감사에서 유지보수까지",
  description: "바로건물관리의 체계적인 건물관리 운영 절차를 안내합니다. 사전 감사부터 일상 유지보수, 비상대응까지 투명하고 빈틈없는 코스 확인.",
  keywords: ["건물관리 셀업", "건물관리 프로세스", "공동주택관리 방법", "건물유지보수", "건물관리 비용"],
  alternates: { canonical: "https://barobm.co.kr/process" },
  openGraph: {
    title: "운영방식 | 바로건물관리",
    description: "투명하고 빈틈없는 건물관리 운영 절차 안내",
    url: "https://barobm.co.kr/process",
  },
};


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


    </div>
  )
}
