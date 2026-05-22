import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "공지사항 | 바로건물관리",
  description: "바로건물관리 공지사항 게시판은 현재 준비 중입니다.",
};

export default function NoticesPage() {
  return (
    <div className="bg-[#f1f3f5] min-h-screen pb-20">
      <PageHero 
        title="공지사항" 
        description="새로운 소식을 전해드리기 위해 준비 중입니다."
      />
      
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mb-6">
             <Wrench className="w-12 h-12 text-brand-primary" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">페이지 준비 중입니다</h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
            더 나은 서비스를 제공하기 위해 공지사항 게시판을 단장하고 있습니다.<br/>
            이용에 불편을 드려 죄송합니다. 빠른 시일 내에 찾아뵙겠습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
