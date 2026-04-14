"use client";

import * as React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";

export default function EstimatePage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero 
        title="무료 견적 문의" 
        description="관리비 절감과 건물 가치 상승, 지금 바로 전문가의 무료 1:1 방문 컨설팅을 받아보세요." 
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {isSubmitted ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center py-20">
              <div className="w-20 h-20 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="text-3xl font-black text-brand-dark mb-4">견적 문의가 성공적으로 접수되었습니다!</h2>
              <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
                담당자가 내용을 확인 중이며, 영업일 기준 24시간 이내에 기재해주신 연락처로 안내 전화를 드리겠습니다. 감사합니다.
              </p>
              <Button size="lg" onClick={() => window.location.href = '/'}>홈으로 돌아가기</Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
              <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 bg-brand-light text-brand-primary font-bold rounded-full mb-4 text-sm">B2B 관리위탁 견적</span>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">상세 정보 입력</h2>
                <p className="text-slate-500">건물의 정보를 자세히 적어주실수록 정확한 1차 견적 산출이 가능합니다.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. 기본 정보 */}
                <div>
                  <h3 className="text-lg font-bold text-brand-dark mb-4 border-b border-slate-100 pb-2">1. 담당자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">담당자명 (또는 대표자) <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="홍길동" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">연락처 <span className="text-red-500">*</span></label>
                      <input type="tel" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="010-0000-0000" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">이메일 <span className="text-red-500">*</span></label>
                      <input type="email" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="example@domain.com" />
                    </div>
                  </div>
                </div>

                {/* 2. 건물 정보 */}
                <div>
                  <h3 className="text-lg font-bold text-brand-dark mb-4 border-b border-slate-100 pb-2">2. 건물 기본 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">건물명 <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 바로빌딩" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">건물 주소 <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="시/군/구 동까지 입력" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">건물 유형 <span className="text-red-500">*</span></label>
                      <select required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 bg-white">
                        <option value="">유형을 선택하세요</option>
                        <option value="apartment">공동주택 (빌라/다세대/아파트 등)</option>
                        <option value="office">상업용 (오피스텔/상가/꼬마빌딩 등)</option>
                        <option value="factory">산업용 (공장/지식산업센터 등)</option>
                        <option value="etc">기타</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">현재 관리 방식 <span className="text-red-500">*</span></label>
                      <select required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 bg-white">
                        <option value="">방식을 선택하세요</option>
                        <option value="self">자체 관리 / 소유주 직접 관리</option>
                        <option value="outsource">타 관리업체 위탁 중</option>
                        <option value="none">관리 부재</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">건물 규모 (총 층수)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 지하 1층, 지상 5층" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">세대수 (또는 입점 호실 수)</label>
                      <input type="number" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 25" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-slate-700 mb-3">엘리베이터 유무</label>
                       <div className="flex gap-6">
                         <label className="flex items-center gap-2 cursor-pointer">
                           <input type="radio" name="elevator" value="yes" className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                           <span>있음</span>
                         </label>
                         <label className="flex items-center gap-2 cursor-pointer">
                           <input type="radio" name="elevator" value="no" className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                           <span>없음</span>
                         </label>
                       </div>
                    </div>
                  </div>
                </div>

                {/* 3. 요청 내용 */}
                <div>
                  <h3 className="text-lg font-bold text-brand-dark mb-4 border-b border-slate-100 pb-2">3. 서비스 요청 내용</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">요청 서비스 (중복 선택 가능)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['종합 위탁 관리', '정기 청소 관리', '소방/전기 안전관리', '주차 및 경비', '승강기 관리대행', '관리비 부과대행'].map(srv => (
                          <label key={srv} className="flex items-center gap-2 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                            <input type="checkbox" value={srv} className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary" />
                            <span className="text-sm font-medium text-slate-700">{srv}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">현재 가장 큰 문제점 (또는 니즈) <span className="text-red-500">*</span></label>
                      <textarea required rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="기존 업체의 불만족스러운 부분이나 현명하게 해결하고 싶은 문제를 적어주세요."></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">특이사항 및 추가 문의 내용</label>
                      <textarea rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="도입 희망 시기 등 추가 내용을 자유롭게 입력해주세요."></textarea>
                    </div>
                  </div>
                </div>

                {/* 동의 */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="mt-1 w-5 h-5 text-brand-primary rounded border-slate-300 focus:ring-brand-primary" />
                      <span className="text-sm text-slate-700 leading-relaxed font-bold">
                        (필수) 개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                    <p className="text-xs text-slate-500 pl-8">수집된 정보는 견적 산출 및 방문 상담 목적으로만 활용되며, 외부로 유출되지 않습니다.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full text-xl py-6 shadow-xl font-black">무료 견적 요청 완료하기</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
