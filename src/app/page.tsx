import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FaqJsonLd } from "@/components/JsonLd";
import { mockCases, faqData, servicesPreview, processSteps } from "@/data/mockData";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Clock,
  Settings,
  ClipboardCheck,
  FileSignature,
  BarChart,
  CalendarCheck,
  Sparkles,
  Wrench,
  Calculator,
  UserCheck
} from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  CalendarCheck,
  Sparkles,
  ShieldCheck,
  Wrench,
  Calculator,
  UserCheck,
  ClipboardCheck,
  FileSignature,
  Settings,
  BarChart
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <FaqJsonLd />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/building_hero.png"
            alt="프리미엄 건물관리"
            fill
            priority
            className="object-cover object-center opacity-35 scale-[1.02] transform transition-all duration-1000"
          />
          {/* 고급스러운 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark" />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center animate-fadeIn">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-secondary font-semibold text-sm mb-6 tracking-wide backdrop-blur-sm">
            스마트 건물 관리의 새로운 기준
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            건물관리, <br className="md:hidden" />
            이제 <span className="text-brand-accent">바로</span>와 함께하세요
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            투명한 회계, 빠른 민원 처리, 그리고 확실한 가치 상승.<br className="hidden md:block" />
            프리미엄 건물 관리 플랫폼 바로건물관리가 책임집니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp delay-200">
            <Link 
              href="/estimate" 
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-brand-accent hover:bg-yellow-400 text-brand-dark px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(252,211,77,0.3)] hover:shadow-[0_0_60px_rgba(252,211,77,0.5)] hover:-translate-y-1"
            >
              무료 견적 문의
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1"
            >
              카카오톡 상담
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center text-white/50">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* 2. Trust Metrics Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4 animate-slideUp">
              <div className="text-4xl md:text-5xl font-black text-brand-dark mb-2">1,200<span className="text-brand-secondary">+</span></div>
              <div className="text-sm md:text-base text-slate-500 font-medium">누적 관리 건물</div>
            </div>
            <div className="text-center px-4 animate-slideUp delay-100">
              <div className="text-4xl md:text-5xl font-black text-brand-dark mb-2">98<span className="text-brand-secondary">%</span></div>
              <div className="text-sm md:text-base text-slate-500 font-medium">재계약률</div>
            </div>
            <div className="text-center px-4 animate-slideUp delay-200">
              <div className="text-4xl md:text-5xl font-black text-brand-dark mb-2">15<span className="text-brand-secondary">분</span></div>
              <div className="text-sm md:text-base text-slate-500 font-medium">평균 민원 응답</div>
            </div>
            <div className="text-center px-4 animate-slideUp delay-300">
              <div className="text-4xl md:text-5xl font-black text-brand-dark mb-2">0<span className="text-brand-secondary">원</span></div>
              <div className="text-sm md:text-base text-slate-500 font-medium">도입/상담 비용</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pain Point & Empathy */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight">
              아직도 직접 건물 관리를<br />하시나요?
            </h2>
            <p className="text-lg md:text-xl text-slate-600">
              월세 체납, 새벽에 터지는 누수, 입주민 간의 주차 갈등...<br />
              건물주의 스트레스, 바로건물관리가 모두 넘겨받겠습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">연체 및 미납 스트레스</h3>
              <p className="text-slate-500 leading-relaxed">매달 직접 연락하기 껄끄러운 월세와 관리비 미납. 체계적인 고지와 관리 시스템으로 연체율을 최소화합니다.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">24시간 쏟아지는 민원</h3>
              <p className="text-slate-500 leading-relaxed">휴일이나 야간에 발생하는 누수, 소음 등 각종 민원을 전담 상황실에서 1차 대응하여 건물주의 휴식을 보장합니다.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">불투명한 시설 관리</h3>
              <p className="text-slate-500 leading-relaxed">제대로 청소가 되고 있는지, 불필요한 보수 비용이 청구되는지 불안하신가요? 모든 내역을 투명하게 보고합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Solutions (Zig-zag Layout) */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <span className="text-brand-secondary font-bold tracking-wider text-sm mb-3 block">SMART SOLUTION</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6">문제는 확실하게,<br className="md:hidden"/> 관리는 투명하게</h2>
          </div>

          <div className="space-y-24 md:space-y-32">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="bg-slate-100 rounded-[2rem] p-8 aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                   <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="투명한 리포트" fill className="object-cover rounded-[2rem]" />
                   <div className="absolute inset-0 bg-brand-dark/10"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-light text-brand-primary">
                  <BarChart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-brand-dark leading-tight">스마트폰으로 확인하는<br />투명한 관리 리포트</h3>
                <p className="text-lg text-slate-500 leading-relaxed">
                  매월 발생한 수입과 지출, 청소 전후 사진, 민원 처리 내역을 모바일에서 한눈에 확인하세요. 영수증 한 장까지 빠짐없이 첨부합니다.
                </p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-secondary" /> 실시간 회계 장부 공유</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-secondary" /> 작업 전/후 사진 리포팅</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-secondary" /> 미납 세대 자동 고지 시스템</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-light text-brand-primary">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-brand-dark leading-tight">하청 없는 직영 체제,<br />빠르고 완벽한 A/S</h3>
                <p className="text-lg text-slate-500 leading-relaxed">
                  외주 업체에 떠넘기지 않습니다. 검증된 본사 직영 마스터가 배정되어 책임지고 건물을 관리하며, 하자 발생 시 즉시 출동하여 해결합니다.
                </p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-secondary" /> 전담 직영 마스터 배정</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-secondary" /> 24시간 긴급 출동 서비스</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-secondary" /> 자체 설비팀 보유로 비용 절감</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-slate-100 rounded-[2rem] p-8 aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                   <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="전문적인 유지보수" fill className="object-cover rounded-[2rem]" />
                   <div className="absolute inset-0 bg-brand-dark/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services (Bento Grid Style) */}
      <section className="py-24 md:py-32 bg-brand-dark text-white">
         <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-brand-accent font-bold tracking-wider text-sm mb-3 block">OUR SERVICES</span>
              <h2 className="text-3xl md:text-5xl font-black mb-4">건물관리에 필요한 모든 것</h2>
              <p className="text-slate-400 text-lg">청소부터 회계, 행정, 시설 유지보수까지 올인원 서비스</p>
            </div>
            <Link href="/services" className="hidden md:inline-flex items-center gap-2 text-white hover:text-brand-accent font-bold transition-colors pb-2">
              서비스 전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesPreview.map((srv, idx) => {
              const Icon = IconMap[srv.icon] || CheckCircle2;
              return (
                <div key={srv.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{srv.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/services" className="inline-flex items-center gap-2 text-white hover:text-brand-accent font-bold transition-colors">
               서비스 전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
         </div>
      </section>

      {/* 6. Process */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <span className="text-brand-secondary font-bold tracking-wider text-sm mb-3 block">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6">투명하고 체계적인 도입 절차</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>
            {processSteps.map((step, idx) => {
              const Icon = IconMap[step.icon] || CheckCircle2;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-light shadow-md flex items-center justify-center text-brand-primary mb-6 transition-transform hover:scale-110">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="text-brand-secondary font-black text-lg mb-2">STEP 0{idx + 1}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-32 relative overflow-hidden bg-brand-primary text-center px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            건물의 가치를 높이는 가장 쉬운 방법
          </h2>
          <p className="text-xl text-brand-light mb-12 opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
            건물관리에 대한 고민, 이제 내려놓으세요.<br />
            전문가가 귀하의 건물을 직접 방문하여 최적의 솔루션을 제안해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/estimate" 
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark hover:bg-yellow-400 active:scale-[0.98] px-10 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1"
            >
              무료 방문 컨설팅 신청
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 border border-white/30 active:scale-[0.98] px-10 py-5 rounded-full font-bold text-xl transition-all backdrop-blur-sm"
            >
              <PhoneCall className="w-5 h-5" />
              1588-0000
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
