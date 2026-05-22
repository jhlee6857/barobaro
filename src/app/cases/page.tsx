import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리사례 | 바로건물관리 - 실제 도입 전후 비교",
  description: "바로건물관리를 도입한 실제 고객사의 관리 사례를 확인하세요. AS-IS/TO-BE 비교를 통해 건물 가치 상승 효과를 증명합니다. 공동주택, 빌라, 상가 관리 사례 수록.",
  keywords: ["건물관리 사례", "공동주택관리 사례", "빌라관리 사례", "건물관리 업체 추천", "종합건물관리"],
  alternates: { canonical: "https://barobm.co.kr/cases" },
  openGraph: {
    title: "관리사례 | 바로건물관리",
    description: "실제 도입 전후 비교로 증명하는 바로건물관리의 성과",
    url: "https://barobm.co.kr/cases",
  },
};

export default function CasesPage() {
  return (
    <div className="bg-[#f1f3f5] min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="bg-white pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            <div className="md:w-1/3 flex flex-col justify-center space-y-12">
              <div>
                <p className="text-xl text-slate-500 mb-1">바로를 이용한</p>
                <h1 className="text-2xl font-light text-slate-800 leading-snug">
                  실제 빌라관리, 건물관리, 임대관리 사례를 확인하세요
                </h1>
              </div>
              
              <div className="border-b-4 border-brand-primary w-max pb-2">
                <p className="text-brand-secondary text-lg">관리부터</p>
                <p className="text-brand-secondary text-lg mb-2">보수까지 꼼꼼한</p>
                <h2 className="text-4xl font-black text-brand-primary tracking-tight">바로 서비스</h2>
              </div>

              <div className="pt-4 border-t border-slate-100 md:hidden"></div>
            </div>

            <div className="md:w-2/3 relative">
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-200 shadow-md">
                <img 
                  src="https://loremflickr.com/800/450/building,management/all?lock=1" 
                  alt="건물관리 사례" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-16 hidden md:block w-64 aspect-square bg-white shadow-xl p-2 border border-slate-100">
                <img src="https://loremflickr.com/300/300/clipboard,checklist/all?lock=1" alt="점검" className="w-full h-full object-cover" />
              </div>
            </div>
            
          </div>
          
          <div className="mt-20 md:mt-16 text-center md:text-left text-sm text-slate-600 leading-relaxed max-w-2xl">
            <p>건물관리에 필요한 모든 것을 한 곳에서 관리하세요</p>
            <p>이제껏 경험하지 못 했던 쉽고 편리한 건물 관리</p>
            <p className="font-bold text-black text-base mt-1">지금 시작해 보세요!</p>
          </div>
        </div>
      </section>

      {/* Cases Content */}
      <section className="pt-16 max-w-5xl mx-auto px-4">
        <h3 className="text-xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-300">
          <span className="text-brand-primary">바로</span> 관리 사례
        </h3>

        {/* 건물 관리 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">건물 관리</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://picsum.photos/seed/building${num}/600/400`} alt="건물 관리" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 소방 점검 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">소방 점검</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/fire,alarm/all?lock=${num}`} alt="소방 점검" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 수도 점검 & 안내판 설치 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="col-span-1">
            <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4 whitespace-nowrap">수도 점검</div>
            <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
               <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">01</div>
               <img src={`https://loremflickr.com/600/400/water,meter/all?lock=1`} alt="수도 점검" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4 whitespace-nowrap">안내판 설치</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((num) => (
                <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                   <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                     {num.toString().padStart(2, '0')}
                   </div>
                   <img src={`https://loremflickr.com/600/400/notice,board/all?lock=${num}`} alt="안내판 설치" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 엘리베이터 점검/수리 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">엘리베이터 점검/수리</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/elevator,mechanic/all?lock=${num}`} alt="엘리베이터 점검/수리" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 건물 관리 (Sub) */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">건물 관리</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[4, 5, 6].map((num, idx) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/building,cleaning/all?lock=${num}`} alt="건물 관리" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 재활용 정리 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">재활용 정리</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/recycling,bins/all?lock=${num}`} alt="재활용 정리" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 전기 점검 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">전기 점검</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/electrical,panel/all?lock=${num}`} alt="전기 점검" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 주차장 선작업 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">주차장 선작업</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/parking,painting/all?lock=${num}`} alt="주차장 선작업" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 주차장 차단기 설치 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">주차장 차단기 설치</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/parking,barrier/all?lock=${num}`} alt="주차장 차단기 설치" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* CCTV, NVR 점검 및 수리 */}
        <div className="mb-12">
          <div className="bg-[#1a2035] text-white font-bold py-3 px-6 mb-4">CCTV, NVR 점검 및 수리</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative aspect-[4/3] bg-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 bg-[#1a2035] text-white text-xs font-bold px-3 py-1 z-10">
                  {num.toString().padStart(2, '0')}
                </div>
                <img src={`https://loremflickr.com/600/400/cctv,camera/all?lock=${num}`} alt="CCTV 수리" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}

