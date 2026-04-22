"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";

interface EstimateEditFormProps {
  post: any;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EstimateEditForm({ post, onCancel, onSuccess }: EstimateEditFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // General fields
  const [title, setTitle] = React.useState(post.title || "");
  const [author, setAuthor] = React.useState(post.author || "");
  
  // Details JSON fields
  const details = post.details || {};
  const [phone, setPhone] = React.useState(details.phone || "");
  const [email, setEmail] = React.useState(details.email || "");
  const [buildingName, setBuildingName] = React.useState(details.buildingName || "");
  const [address, setAddress] = React.useState(details.address || "");
  const [buildingType, setBuildingType] = React.useState(details.buildingType || "");
  const [managementType, setManagementType] = React.useState(details.managementType || "");
  const [scale, setScale] = React.useState(details.scale || "");
  const [units, setUnits] = React.useState(details.units || "");
  const [elevator, setElevator] = React.useState(details.elevator || "");
  const [services, setServices] = React.useState<string[]>(details.services || []);
  const [mainProblem, setMainProblem] = React.useState(details.mainProblem || "");
  const [extraInfo, setExtraInfo] = React.useState(details.extraInfo || "");

  const toggleService = (srv: string) => {
    setServices(prev => prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    const updatedDetails = {
      phone, email, buildingName, address, buildingType, managementType,
      scale, units, elevator, services, mainProblem, extraInfo
    };

    const { error } = await supabase.from('inquiries').update({
      title,
      author,
      details: updatedDetails,
    })
    .eq('id', post.id)
    .eq('password', post.password); // Ensure only this specifically unlocked post is updated

    setIsSubmitting(false);

    if (error) {
      alert("수정 중 오류가 발생했습니다: " + error.message);
    } else {
      alert("성공적으로 수정되었습니다.");
      onSuccess();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">게시글 수정</h2>
        <p className="text-slate-500 text-sm mt-1">기존 작성하신 내용을 수정합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. 게시글 정보 */}
        <div>
          <h3 className="text-base font-bold text-brand-dark mb-3">1. 게시글 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">글 제목 <span className="text-red-500">*</span></label>
              <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">작성자명 <span className="text-red-500">*</span></label>
              <input type="text" value={author} onChange={e=>setAuthor(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
          </div>
        </div>

        {/* 2. 건물 정보 */}
        <div>
          <h3 className="text-base font-bold text-brand-dark mb-3 border-t border-slate-100 pt-5">2. 건물 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">연락처 <span className="text-red-500">*</span></label>
              <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">이메일 <span className="text-red-500">*</span></label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">건물명 <span className="text-red-500">*</span></label>
              <input type="text" value={buildingName} onChange={e=>setBuildingName(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">건물 주소 <span className="text-red-500">*</span></label>
              <input type="text" value={address} onChange={e=>setAddress(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">건물 유형 <span className="text-red-500">*</span></label>
              <select required value={buildingType} onChange={e=>setBuildingType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200">
                <option value="공동주택">공동주택</option>
                <option value="상업용">상업용</option>
                <option value="산업용">산업용</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">현재 관리 방식 <span className="text-red-500">*</span></label>
              <select required value={managementType} onChange={e=>setManagementType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200">
                <option value="자체 관리">자체 관리</option>
                <option value="타 관리업체 위탁">타 관리업체 위탁</option>
                <option value="관리 부재">관리 부재</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">건물 규모 (총 층수)</label>
              <input type="text" value={scale} onChange={e=>setScale(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">세대수/호실</label>
              <input type="number" value={units} onChange={e=>setUnits(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200" />
            </div>
            <div className="md:col-span-2 mt-2">
               <label className="block text-sm font-bold text-slate-700 mb-2">엘리베이터 유무</label>
               <div className="flex gap-6">
                 <label className="flex items-center gap-2 leading-none"><input type="radio" value="있음" checked={elevator==='있음'} onChange={e=>setElevator(e.target.value)} className="w-4 h-4" />있음</label>
                 <label className="flex items-center gap-2 leading-none"><input type="radio" value="없음" checked={elevator==='없음'} onChange={e=>setElevator(e.target.value)} className="w-4 h-4" />없음</label>
               </div>
            </div>
          </div>
        </div>

        {/* 3. 요청 내용 */}
        <div>
          <h3 className="text-base font-bold text-brand-dark mb-3 border-t border-slate-100 pt-5">3. 요청 사항</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">요청 서비스</label>
              <div className="flex flex-wrap gap-2">
                {['종합 위탁 관리', '정기 청소 관리', '소방/전기 안전관리', '주차 및 경비', '승강기 관리대행', '관리비 부과대행'].map(srv => (
                  <label key={srv} className="flex items-center gap-1.5 p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 cursor-pointer">
                    <input type="checkbox" checked={services.includes(srv)} onChange={() => toggleService(srv)} className="w-3.5 h-3.5" />
                    {srv}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">주요 문제점 / 니즈 <span className="text-red-500">*</span></label>
              <textarea required value={mainProblem} onChange={e=>setMainProblem(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">특이사항 추가</label>
              <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200"></textarea>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-100">
          <Button type="button" variant="outline" className="w-1/3 py-4" onClick={onCancel}>취소</Button>
          <Button type="submit" disabled={isSubmitting} className="w-2/3 py-4 font-bold shadow-md text-base">
            {isSubmitting ? '저장 중...' : '수정 완료'}
          </Button>
        </div>
      </form>
    </div>
  );
}
