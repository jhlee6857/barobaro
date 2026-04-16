import { PageHero } from "@/components/shared/PageHero";
import { servicesPreview } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function ServicesPage() {
  return (
    <div>
      <PageHero 
        title="서비스 소개" 
        description="바로건물관리 하나면 충분합니다. 건물의 유지, 보수, 행정을 아우르는 A to Z 토탈 케어 서비스를 제공합니다."
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {servicesPreview.map((srv, idx) => (
              <Card key={srv.id} className="border border-slate-100 shadow-sm hover:shadow-md transition">
                <CardHeader className="flex flex-row items-center gap-4 bg-slate-50 border-b border-slate-100 p-6">
                  <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-full flex items-center justify-center font-bold text-xl">
                    {idx + 1}
                  </div>
                  <CardTitle className="text-2xl text-brand-dark m-0">{srv.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-600 font-medium mb-6 text-lg">{srv.desc}</p>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <strong className="text-red-700 text-sm block mb-1">이런 분들께 필요합니다</strong>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        <li>외주 업체의 관리가 불만족스러우신 분</li>
                        <li>건물 노후화로 잦은 수리가 필요하신 분</li>
                      </ul>
                    </div>
                    
                    <div className="bg-brand-light p-4 rounded-lg">
                      <strong className="text-brand-primary text-sm block mb-1">바로의 해결책</strong>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        <li>직영 마스터 배정으로 일관된 관리 품질 유지</li>
                        <li>문제 발생 시 지체 없는 출동 및 즉각 보수 진행</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
