import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60;

export default async function CasesPage() {
  let displayCases: any[] = [];
  
  try {
    const { data: cases } = await supabase.from('cases').select('*').order('created_at', { ascending: false });
    if (cases) displayCases = cases;
  } catch (e) {
    console.error("Failed to fetch cases:", e);
  }

  return (
    <div>
      <PageHero 
        title="관리사례" 
        description="바로건물관리의 손길이 닿으면 가치가 달라집니다. 다양한 건물의 해결 사례를 확인하세요."
      />

      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-6">
          {displayCases.length === 0 ? (
            <div className="text-center py-20 text-slate-500 bg-white shadow-sm rounded-lg max-w-2xl mx-auto">
              <p className="font-medium text-lg">현재 등록된 관리 사례가 없습니다.</p>
              <p className="text-sm mt-2">관리자 페이지에서 사례를 추가해주세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {displayCases.map((c: any) => (
                <Card key={c.id} className="border-none shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full bg-white">
                  {c.imageUrl && (
                    <div className="w-full h-64 overflow-hidden bg-slate-100">
                      <img src={c.imageUrl} alt="현장 사진" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                  )}
                  <CardHeader className="bg-slate-100 p-6 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <span className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full">
                        {c.region}
                      </span>
                      <span className="text-sm font-medium text-slate-500">{c.scale}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mt-2">{c.buildingType}</h3>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <strong className="text-sm text-slate-800 font-bold">AS-IS (도입 전 주요 문제)</strong>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed p-4 bg-slate-50 rounded-lg whitespace-pre-line">{c.mainProblem}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                        <strong className="text-sm text-slate-800 font-bold">진행 과정</strong>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed p-4 bg-blue-50 rounded-lg border border-blue-100 whitespace-pre-line">{c.process}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <strong className="text-sm text-brand-primary font-black">TO-BE (개선 결과)</strong>
                      </div>
                      <p className="text-slate-800 font-bold text-base whitespace-pre-line">{c.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
