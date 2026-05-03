import * as React from "react";
import { PageHero } from "@/components/shared/PageHero";

export default function EstimateLoading() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="온라인 견적 문의" 
        description="관리비 절감과 건물 가치 상승, 지금 바로 전문가의 무료 1:1 방문 컨설팅을 게시판을 통해 문의해보세요." 
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {/* Skeleton Header */}
          <div className="grid grid-cols-12 gap-4 border-b border-brand-dark/10 bg-slate-50 p-4 text-center">
            <div className="col-span-2 md:col-span-1 h-4 bg-slate-200 animate-pulse rounded"></div>
            <div className="col-span-7 md:col-span-7 h-4 bg-slate-200 animate-pulse rounded"></div>
            <div className="col-span-3 md:col-span-2 h-4 bg-slate-200 animate-pulse rounded"></div>
            <div className="hidden md:block col-span-2 h-4 bg-slate-200 animate-pulse rounded"></div>
          </div>

          {/* Skeleton Rows */}
          <div className="divide-y divide-slate-100 min-h-[400px]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-5 text-center items-center">
                <div className="col-span-2 md:col-span-1 h-3 bg-slate-100 animate-pulse rounded mx-auto w-1/2"></div>
                <div className="col-span-7 md:col-span-7 h-4 bg-slate-100 animate-pulse rounded w-3/4"></div>
                <div className="col-span-3 md:col-span-2 h-3 bg-slate-100 animate-pulse rounded w-1/2 mx-auto"></div>
                <div className="hidden md:block col-span-2 h-3 bg-slate-100 animate-pulse rounded w-1/3 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
