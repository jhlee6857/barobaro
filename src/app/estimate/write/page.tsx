"use client";

import * as React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function EstimateWritePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // General fields
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  // Details JSON fields
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [buildingName, setBuildingName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [buildingType, setBuildingType] = React.useState("");
  const [managementType, setManagementType] = React.useState("");
  const [scale, setScale] = React.useState("");
  const [units, setUnits] = React.useState("");
  const [elevator, setElevator] = React.useState("");
  const [services, setServices] = React.useState<string[]>([]);
  const [mainProblem, setMainProblem] = React.useState("");
  const [extraInfo, setExtraInfo] = React.useState("");
  const [agree, setAgree] = React.useState(false);

  const toggleService = (srv: string) => {
    setServices(prev => prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return alert("개인정보 수집 및 이용에 동의해주세요.");
    
    setIsSubmitting(true);

    const details = {
      phone, email, buildingName, address, buildingType, managementType,
      scale, units, elevator, services, mainProblem, extraInfo
    };

    const { data: insertedData, error } = await supabase.from('inquiries').insert([{
      title,
      author,
      password,
      details,
      is_reply: false
    }]).select().single();

    setIsSubmitting(false);

    if (error) {
      alert("등록 중 오류가 발생했습니다: " + error.message);
    } else {
      // 채널톡 동기화 API 호출 (백그라운드에서 처리)
      fetch('/api/inquiry/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          inquiryId: insertedData.id, 
          data: { title, author, details } 
        }),
      }).catch(err => console.error('Channel Talk Sync failed:', err));

      alert("견적 문의가 성공적으로 등록되었습니다.");
      router.push('/estimate');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero 
        title="무료 견적 문의 (게시글 작성)" 
        description="관리비 절감과 건물 가치 상승, 상세한 정보를 남겨주시면 빠르고 정확한 답변을 달아드립니다." 
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
            <div className="mb-10 text-center">
              <span className="inline-block px-4 py-1.5 bg-brand-light text-brand-primary font-bold rounded-full mb-4 text-sm">견적 문의 작성</span>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">상세 정보 입력</h2>
              <p className="text-slate-500">건물의 정보를 자세히 적어주실수록 정확한 1차 견적 산출이 가능합니다.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. 게시글 기본 정보 */}
              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-4 border-b border-slate-100 pb-2">1. 게시글 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">글 제목 <span className="text-red-500">*</span></label>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 강남구 꼬마빌딩 관리 견적 문의합니다." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">작성자명 (또는 대표자) <span className="text-red-500">*</span></label>
                    <input type="text" value={author} onChange={e=>setAuthor(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호 (비밀글 용도) <span className="text-red-500">*</span></label>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="숫자 또는 영문" />
                  </div>
                </div>
              </div>

              {/* 2. 건물 정보 */}
              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-4 border-b border-slate-100 pb-2">2. 건물 기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연락처 <span className="text-red-500">*</span></label>
                    <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="010-0000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">이메일 <span className="text-red-500">*</span></label>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="example@domain.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">건물명 <span className="text-red-500">*</span></label>
                    <input type="text" value={buildingName} onChange={e=>setBuildingName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 바로빌딩" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">건물 주소 <span className="text-red-500">*</span></label>
                    <input type="text" value={address} onChange={e=>setAddress(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="시/군/구 동까지 입력" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">건물 유형 <span className="text-red-500">*</span></label>
                    <select required value={buildingType} onChange={e=>setBuildingType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 bg-white">
                      <option value="">유형을 선택하세요</option>
                      <option value="공동주택">공동주택 (빌라/다세대/아파트 등)</option>
                      <option value="상업용">상업용 (오피스텔/상가/꼬마빌딩 등)</option>
                      <option value="산업용">산업용 (공장/지식산업센터 등)</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">현재 관리 방식 <span className="text-red-500">*</span></label>
                    <select required value={managementType} onChange={e=>setManagementType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 bg-white">
                      <option value="">방식을 선택하세요</option>
                      <option value="자체 관리">자체 관리 / 소유주 직접 관리</option>
                      <option value="타 관리업체 위탁">타 관리업체 위탁 중</option>
                      <option value="관리 부재">관리 부재</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">건물 규모 (총 층수)</label>
                    <input type="text" value={scale} onChange={e=>setScale(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 지하 1층, 지상 5층" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">세대수 (또는 입점 호실 수)</label>
                    <input type="number" value={units} onChange={e=>setUnits(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="예) 25" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-sm font-bold text-slate-700 mb-3">엘리베이터 유무</label>
                     <div className="flex gap-6">
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="radio" name="elevator" value="있음" checked={elevator==='있음'} onChange={e=>setElevator(e.target.value)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                         <span>있음</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="radio" name="elevator" value="없음" checked={elevator==='없음'} onChange={e=>setElevator(e.target.value)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
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
                          <input type="checkbox" checked={services.includes(srv)} onChange={() => toggleService(srv)} className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary" />
                          <span className="text-sm font-medium text-slate-700">{srv}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">현재 가장 큰 문제점 (또는 니즈) <span className="text-red-500">*</span></label>
                    <textarea required value={mainProblem} onChange={e=>setMainProblem(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="기존 업체의 불만족스러운 부분이나 현명하게 해결하고 싶은 문제를 적어주세요."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">특이사항 및 추가 문의 내용</label>
                    <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" placeholder="도입 희망 시기 등 추가 내용을 자유롭게 입력해주세요."></textarea>
                  </div>
                </div>
              </div>

              {/* 동의 */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required checked={agree} onChange={e=>setAgree(e.target.checked)} className="mt-1 w-5 h-5 text-brand-primary rounded border-slate-300 focus:ring-brand-primary" />
                    <span className="text-sm text-slate-700 leading-relaxed font-bold">
                      (필수) 게시판 작성 시, 작성 시 기재한 이메일/연락처 등 개인정보 수집 및 이용에 동의합니다.
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 pl-8">수집된 정보는 견적 산출 및 방문 상담 목적으로만 활용되며, 관리자만 열람할 수 있습니다.</p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button type="button" variant="outline" size="lg" className="w-1/3 text-lg py-6" onClick={() => router.push('/estimate')}>취소</Button>
                <Button type="submit" disabled={isSubmitting} size="lg" className="w-2/3 text-xl py-6 shadow-xl font-black">
                  {isSubmitting ? '접수 중...' : '견적 문의 작성 완료'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
