"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, Calculator, BarChart3, HelpCircle } from "lucide-react";
import Link from "next/link";

// Regional & Type benchmarks (per m² KRW)
const BENCHMARKS: Record<string, Record<string, number>> = {
  seoul: {
    villa: 2000,
    officetel: 3200,
    commercial: 4500,
    apartment: 1800
  },
  gyeonggi: {
    villa: 1800,
    officetel: 2900,
    commercial: 4000,
    apartment: 1650
  },
  incheon: {
    villa: 1700,
    officetel: 2750,
    commercial: 3800,
    apartment: 1600
  },
  other: {
    villa: 1500,
    officetel: 2400,
    commercial: 3500,
    apartment: 1450
  }
};

export default function DiagnosisPage() {
  const [formData, setFormData] = useState({
    region: "seoul",
    buildingType: "villa",
    area: "",
    totalFee: "",
    repairFund: ""
  });

  const [result, setResult] = useState<null | {
    myUnitPrice: number;
    avgUnitPrice: number;
    diffPercent: number;
    grade: "good" | "warning" | "danger";
    savingPotential: number;
  }>(null);

  const [errors, setErrors] = useState({
    area: "",
    totalFee: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const calculateDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    let hasError = false;
    const newErrors = { area: "", totalFee: "" };

    const areaVal = parseFloat(formData.area);
    const totalVal = parseInt(formData.totalFee.replace(/[^0-9]/g, ""));
    const repairVal = parseInt(formData.repairFund.replace(/[^0-9]/g, "") || "0");

    if (isNaN(areaVal) || areaVal <= 0) {
      newErrors.area = "올바른 부과면적(㎡)을 입력해주세요.";
      hasError = true;
    }
    if (isNaN(totalVal) || totalVal <= 0) {
      newErrors.totalFee = "올바른 월 관리비 총액을 입력해주세요.";
      hasError = true;
    }
    if (totalVal <= repairVal) {
      newErrors.totalFee = "월 관리비 총액은 장기수선충당금보다 커야 합니다.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Calculation logic
    const netFee = totalVal - repairVal;
    const myUnitPrice = Math.round(netFee / areaVal);
    const avgUnitPrice = BENCHMARKS[formData.region]?.[formData.buildingType] || 2000;
    const diffPercent = Math.round(((myUnitPrice - avgUnitPrice) / avgUnitPrice) * 100);

    let grade: "good" | "warning" | "danger" = "good";
    if (diffPercent > 20) {
      grade = "danger";
    } else if (diffPercent > 0) {
      grade = "warning";
    }

    // Potential monthly saving (estimate 20% reduction if warning/danger)
    const savingPotential = grade !== "good" ? Math.round(totalVal * 0.25) : 0;

    setResult({
      myUnitPrice,
      avgUnitPrice,
      diffPercent,
      grade,
      savingPotential
    });
  };

  const formatKRW = (num: number) => {
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" })
      .format(num)
      .replace("₩", "") + "원";
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32">
      <PageHero 
        title="바로 관리비 자가 진단" 
        description="고지서 속 숨어있는 거품 관리비를 10초 만에 확인해보세요. 주변 시세와 빅데이터를 기반으로 우리 건물의 관리비 적정성을 진단해 드립니다."
      />

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 text-brand-primary">
              <Calculator className="w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-800 m-0">관리비 기본 정보 입력</h2>
            </div>

            <form onSubmit={calculateDiagnosis} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">건물 소재 지역</label>
                <select 
                  name="region" 
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary transition cursor-pointer"
                >
                  <option value="seoul">서울특별시</option>
                  <option value="gyeonggi">경기도</option>
                  <option value="incheon">인천광역시</option>
                  <option value="other">기타 지방권역</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">건물 유형</label>
                <select 
                  name="buildingType" 
                  value={formData.buildingType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary transition cursor-pointer"
                >
                  <option value="villa">다세대 빌라 / 원룸 건물</option>
                  <option value="officetel">주거용 오피스텔</option>
                  <option value="commercial">상가 / 집합건물</option>
                  <option value="apartment">일반 아파트 단지</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  건물 전체 부과면적 (㎡)
                  <span className="text-xs text-slate-400 font-normal ml-1">(공용면적 포함 전체 면적)</span>
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  name="area"
                  placeholder="예: 250"
                  value={formData.area}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${errors.area ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-primary/25'} rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:border-brand-primary transition`}
                />
                {errors.area && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.area}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  월 관리비 고지 합계 (원)
                  <span className="text-xs text-slate-400 font-normal ml-1">(한 달 평균 고지 총액)</span>
                </label>
                <input 
                  type="text" 
                  name="totalFee"
                  placeholder="예: 650,000"
                  value={formData.totalFee}
                  onChange={(e) => {
                    const cleanValue = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = cleanValue ? parseInt(cleanValue).toLocaleString("ko-KR") : "";
                    setFormData(prev => ({ ...prev, totalFee: formatted }));
                  }}
                  className={`w-full bg-slate-50 border ${errors.totalFee ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-primary/25'} rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:border-brand-primary transition`}
                />
                {errors.totalFee && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.totalFee}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  장기수선충당금 (선택 사항, 원)
                  <span className="text-xs text-slate-400 font-normal ml-1">(제외하고 순수 운영 관리비만 연산)</span>
                </label>
                <input 
                  type="text" 
                  name="repairFund"
                  placeholder="예: 80,000"
                  value={formData.repairFund}
                  onChange={(e) => {
                    const cleanValue = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = cleanValue ? parseInt(cleanValue).toLocaleString("ko-KR") : "";
                    setFormData(prev => ({ ...prev, repairFund: formatted }));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary transition"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-brand-primary hover:bg-brand-secondary active:scale-[0.99] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                우리 건물 관리비 진단하기 <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Result Panel */}
          <div className="lg:col-span-7">
            {!result ? (
              <div className="bg-slate-100 border border-dashed border-slate-350 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                <BarChart3 className="w-16 h-16 text-slate-400 mb-4 stroke-[1.5]" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">대기 중인 관리비 진단</h3>
                <p className="text-slate-500 max-w-sm leading-relaxed">
                  좌측에 건물 정보를 입력하고 진단 버튼을 누르면 인공지능 시세 분석을 통해 즉시 진단 보고서가 발행됩니다.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-none shadow-2xl bg-white overflow-hidden rounded-2xl border border-slate-100">
                  {/* Result Header Badge */}
                  <div className={`p-6 text-white flex items-center justify-between ${
                    result.grade === "good" ? "bg-emerald-600" :
                    result.grade === "warning" ? "bg-amber-500" : "bg-rose-600"
                  }`}>
                    <div className="flex items-center gap-3">
                      {result.grade === "good" && <CheckCircle2 className="w-8 h-8 shrink-0" />}
                      {result.grade === "warning" && <AlertTriangle className="w-8 h-8 shrink-0" />}
                      {result.grade === "danger" && <XCircle className="w-8 h-8 shrink-0" />}
                      <div>
                        <span className="text-xs uppercase tracking-wider font-bold opacity-80">진단 결과 보고서</span>
                        <h3 className="text-2xl font-black m-0 leading-tight">
                          {result.grade === "good" && "우리 건물 관리비는 [양호] 상태"}
                          {result.grade === "warning" && "우리 건물 관리비는 [주의] 상태"}
                          {result.grade === "danger" && "우리 건물 관리비는 [경고] 상태"}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                        {result.diffPercent <= 0 ? "합리적 시세" : `${result.diffPercent}% 과다`}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-8">
                    {/* Key Diagnostics Figures */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-50 p-5 rounded-xl text-center border border-slate-100">
                        <span className="text-xs text-slate-500 font-bold block mb-1">우리 건물 단가</span>
                        <strong className="text-2xl font-black text-slate-800 block">
                          {formatKRW(result.myUnitPrice)}<span className="text-sm font-normal text-slate-400">/㎡</span>
                        </strong>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-xl text-center border border-slate-100">
                        <span className="text-xs text-slate-500 font-bold block mb-1">지역/유형 평균 단가</span>
                        <strong className="text-2xl font-black text-slate-600 block">
                          {formatKRW(result.avgUnitPrice)}<span className="text-sm font-normal text-slate-400">/㎡</span>
                        </strong>
                      </div>
                      <div className="p-5 rounded-xl text-center border flex flex-col justify-center items-center font-bold bg-slate-50 border-slate-100">
                        <span className="text-xs text-slate-500 block mb-1">평균 대비 비율</span>
                        <span className={`text-2xl font-black ${
                          result.grade === "good" ? "text-emerald-600" :
                          result.grade === "warning" ? "text-amber-500" : "text-rose-600"
                        }`}>
                          {result.diffPercent <= 0 ? "합리적 수준" : `${result.diffPercent}% 초과`}
                        </span>
                      </div>
                    </div>

                    {/* Progress Visualizer Chart */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                        <span>우리 건물 ({formatKRW(result.myUnitPrice)}/㎡)</span>
                        <span>평균 ({formatKRW(result.avgUnitPrice)}/㎡)</span>
                      </div>
                      <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden relative flex">
                        {/* Avg line indicator */}
                        <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-slate-400 z-10" title="지역 평균선" />
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            result.grade === "good" ? "bg-emerald-500" :
                            result.grade === "warning" ? "bg-amber-400" : "bg-rose-500"
                          }`}
                          style={{ 
                            width: result.diffPercent <= 0 
                              ? `${Math.max(20, Math.min(50, 50 + (result.diffPercent / 2)))}%`
                              : `${Math.min(100, 50 + (result.diffPercent / 2))}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>저렴한 수준</span>
                        <span className="font-bold text-slate-500">평균선</span>
                        <span>높은 수준</span>
                      </div>
                    </div>

                    {/* Detailed Analysis Opinion */}
                    <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 md:p-6 space-y-4">
                      <h4 className="text-lg font-black text-slate-800 m-0">📊 바로 마스터의 종합 분석 의견</h4>
                      
                      {result.grade === "good" && (
                        <p className="text-slate-600 text-sm leading-relaxed m-0">
                          현재 건물의 공용 관리비가 매우 효율적으로 부과되고 있습니다. 낭비되는 누수 요인이 없는 상태로 쾌적하게 유지되고 있습니다. 바로건물관리의 지속적인 <strong>유지보수 케어</strong>를 통해 건물 감가상각을 원천 차단하면 자산 가치를 더욱 건강하게 높일 수 있습니다.
                        </p>
                      )}
                      
                      {result.grade === "warning" && (
                        <div className="space-y-2">
                          <p className="text-slate-600 text-sm leading-relaxed m-0">
                            지역 평균보다 약간 높은 비용이 청구되고 있습니다. 공용 청소, 소독, 시설 유지 관리 부문에서 불필요한 고비용 외주 하청이나 낭비되는 전력이 있을 가능성이 매우 높습니다.
                          </p>
                          {result.savingPotential > 0 && (
                            <p className="text-sm font-bold text-amber-600 m-0">
                              💡 바로의 맞춤 다이어트를 적용할 경우, 매월 예상 절감액: <span className="underline">{formatKRW(result.savingPotential)}</span>
                            </p>
                          )}
                        </div>
                      )}

                      {result.grade === "danger" && (
                        <div className="space-y-2">
                          <p className="text-slate-600 text-sm leading-relaxed m-0">
                            주변의 유사 규모 건물 대비 관리비 거품이 대단히 심각한 상태입니다. 불필요한 노무비, 불합리한 회계 부과 체계, 혹은 잦은 고가 일회성 보수 수리 등이 주요 원인으로 예측됩니다. 직영 책임제를 도입해 체질을 완전히 개편해야 합니다.
                          </p>
                          {result.savingPotential > 0 && (
                            <p className="text-sm font-bold text-rose-600 m-0">
                              🔥 바로의 맞춤 다이어트를 적용할 경우, 매월 예상 절감액: <span className="underline">{formatKRW(result.savingPotential)}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Conversion Lead Card */}
                <div className="border border-brand-primary/20 bg-brand-light/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <span className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full mb-1">무료 정밀 컨설팅 제공</span>
                    <h3 className="text-xl font-bold text-brand-dark m-0">우리 건물 1:1 현장 무료 정기 진단을 받아보세요</h3>
                    <p className="text-slate-600 text-sm m-0 leading-relaxed">
                      전문 영업 및 시설 기사가 직접 방문하여 공용 전기, 수도 요금 누수 분석 및 수선비 거품을 분석해드립니다.
                    </p>
                  </div>
                  <Link 
                    href="/estimate/write?title=[관리비진단신청]" 
                    className="w-full md:w-auto bg-brand-primary hover:bg-brand-secondary active:scale-[0.97] text-white px-8 py-4 rounded-xl font-bold shadow-md transition-all whitespace-nowrap text-center shrink-0"
                  >
                    무료 1:1 방문진단 신청
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informative Guidance Section */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <HelpCircle className="w-5 h-5 shrink-0" />
            <h4 className="font-bold text-base m-0">진단 계산에 도움을 드립니다</h4>
          </div>
          <ul className="list-decimal list-inside text-sm text-slate-500 space-y-2 leading-relaxed">
            <li>본 간이 진단 결과는 법적인 효력이 없으며, 주변 시세 통계를 기준으로 산정된 참고용 보고서입니다.</li>
            <li>건물의 준공년수(노후도), 세대 수, 엘리베이터 유무 및 개별 중앙 냉난방 유무에 따라 실질 오차가 발생할 수 있습니다.</li>
            <li>정확한 분석은 현장 배관, 공용 낭비 전력 등을 종합 검토해야 하므로 <strong>'무료 방문 정밀 진단'</strong>을 받아보실 것을 권장합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
