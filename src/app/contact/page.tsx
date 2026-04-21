import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { MessageCircle, Phone, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "상담하기 | 바로건물관리 - 카톡·전화·온라인 상담",
  description: "건물관리 관련 궁금한 점이 있으신가요? 카카오톡 실시간 채팅, 전화 상담, 온라인 게시판을 통해 언제든 문의하세요.",
};

export default function ContactPage() {
  const kakaoUrl = "https://open.kakao.com/o/sfCuuuri";
  const phoneNum = "010-8578-4066";

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero 
        title="상담 및 문의" 
        description="가장 편안한 방법으로 문의해 주세요. 전문가가 친절하게 안내해 드립니다." 
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* 카카오톡 상담 */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-[#FEE500] rounded-2xl flex items-center justify-center mb-6 shadow-md">
                   <MessageCircle className="w-10 h-10 text-[#3c1e1e]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">카카오톡 실시간 상담</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  별도의 회원가입 없이 카카오톡으로<br />
                  빠르고 간편하게 1:1 상담을 받아보세요.
                </p>
                <a 
                  href={kakaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#FEE500] text-[#3c1e1e] font-black rounded-xl hover:bg-[#F7E600] transition shadow-lg flex items-center justify-center gap-2"
                >
                  카톡으로 바로 상담하기
                </a>
              </div>

              {/* 전화 상담 */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-md">
                   <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">대표번호 전화 상담</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  직접 목소리로 상세한 상담이 필요하시면<br />
                  언제든 대표번호로 전화 주세요.
                </p>
                <a 
                  href={`tel:${phoneNum}`}
                  className="w-full py-4 bg-brand-primary text-white font-black rounded-xl hover:bg-brand-dark transition shadow-lg flex items-center justify-center gap-2"
                >
                  {phoneNum} 전문 상담
                </a>
              </div>
            </div>

            {/* 기타 안내 */}
            <div className="bg-slate-100 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                    <Clock className="text-brand-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">상담 시간</h4>
                    <p className="text-sm text-slate-500">평일 09:00 - 18:00<br/>토/일/공휴일 휴무</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                    <ShieldCheck className="text-brand-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">24시 긴급대응</h4>
                    <p className="text-sm text-slate-500">긴급 민원 및 시설 하자는<br/>상황실에서 24시간 대응</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                    <MessageSquare className="text-brand-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">온라인 견적 문의</h4>
                    <p className="text-sm text-slate-500">게시판을 통한 무료 견적<br/>산출이 가능합니다.</p>
                    <Link href="/estimate" className="text-xs font-bold text-brand-primary hover:underline mt-2 inline-block">
                      게시판 바로가기 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
