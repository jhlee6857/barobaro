"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { faqData } from "@/data/mockData";
import { cn, formatPhoneNumber, formatPhoneNumberWithHyphen } from "@/lib/utils";

type TabMenu = "complain";

export default function ResidentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<TabMenu>("complain");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkResidentAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // 1. 세션이 없거나 카카오 로그인이 아니면 로그인 페이지로
      if (!session || session.user.app_metadata?.provider !== 'kakao') {
        router.push("/login");
        return;
      }

      // 2. 실제 등록 여부 확인 - stored_phone 우선 사용 (카카오 버그 우회)
      const metadata = session.user.user_metadata || {};
      const cleanPhone = formatPhoneNumber(metadata.stored_phone || "");

      // 전화번호가 없으면 등록(register) 페이지로 이동
      if (!cleanPhone) {
        router.push("/resident/register");
        return;
      }

      const hyphenPhone = formatPhoneNumberWithHyphen(cleanPhone);

      const { data: resident } = await supabase
        .from("pre_registered_residents")
        .select("is_registered")
        .or(`phone_number.eq.${cleanPhone},phone_number.eq.${hyphenPhone}`)
        .single();

      if (!resident?.is_registered) {
        router.push("/resident/register");
        return;
      }

      setIsLoading(false);
    };

    checkResidentAuth();
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // 3초 후 폼 리셋 효과
    setTimeout(() => {
      setIsSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero 
        title="입주민센터" 
        description="불편사항 접수부터 각종 문의까지, 투명한 비공개 상담으로 안전하게 소통합니다." 
      />

      <div className="container mx-auto px-4 md:px-6 py-12">

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 mb-8 max-w-4xl mx-auto hide-scrollbar">
          <button 
            className={cn("px-6 py-4 font-bold text-sm md:text-base whitespace-nowrap border-b-2 transition-colors", activeTab === "complain" ? "border-brand-primary text-brand-primary" : "border-transparent text-slate-500 hover:text-slate-700")}
            onClick={() => {setActiveTab("complain"); setIsSubmitted(false);}}
          >
            민원 접수
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          


          {/* 민원 접수 */}
          {activeTab === "complain" && (
            <div>
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-bold text-brand-dark mb-2">민원 접수</h2>
                <p className="text-slate-600">세대의 불편사항이나 공용부 문제를 적어주시면 빠르게 출동하여 해결합니다.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-lg text-center my-10">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">민원 접수가 완료되었습니다.</h3>
                  <p className="text-slate-600 font-medium">접수 내용을 확인한 후 순차적으로 안내드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">이름 <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="홍길동" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">연락처 <span className="text-red-500">*</span></label>
                      <input type="tel" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="숫자만 입력 (예: 01012345678)" onChange={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">건물명 <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 바로빌라" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">동/호수 <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 101동 202호" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">문의 유형 <span className="text-red-500">*</span></label>
                    <select required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 bg-white">
                      <option value="">유형을 선택해주세요</option>
                      <option value="leak">누수/설비 (긴급)</option>
                      <option value="electric">전기/통신</option>
                      <option value="noise">층간/벽간 소음</option>
                      <option value="parking">주차 불편/불법주차</option>
                      <option value="clean">환경/청소/쓰레기</option>
                      <option value="etc">기타 불편사항</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">상세 내용 <span className="text-red-500">*</span></label>
                    <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="발생한 문제 상황을 구체적으로 적어주세요."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">사진 첨부 (선택)</label>
                    <input type="file" accept="image/*" className="w-full px-4 py-3 rounded-lg border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-light file:text-brand-primary hover:file:bg-brand-light/70" />
                    <p className="text-xs text-slate-500 mt-2">※ 하자가 발생한 곳의 사진을 첨부해주시면 더 빠른 상황 파악이 가능합니다.</p>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
                    <input type="checkbox" id="privacyItem1" required className="mt-1 w-4 h-4 text-brand-primary border-slate-300 rounded focus:ring-brand-primary" />
                    <label htmlFor="privacyItem1" className="text-sm text-slate-600 leading-tight">
                      (필수) 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 민원 처리 목적 이외에는 사용되지 않습니다.
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full text-lg shadow-md font-bold">민원 접수하기</Button>
                  </div>
                </form>
              )}
            </div>
          )}



        </div>

      </div>
    </div>
  )
}
