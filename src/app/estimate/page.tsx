import type { Metadata } from "next";
import * as React from "react";
import { PageHero } from "@/components/shared/PageHero";
import EstimateListClient from "./EstimateListClient";

export const metadata: Metadata = {
  title: "무료 견적 문의 | 바로건물관리 - 건물관리 1:1 상담",
  description: "건물관리가 필요하신가요? 바로건물관리에 무료 1:1 방문 컨설팅을 신청하세요. 공동주택, 빌라, 소형빌딩 건물관리 무료 견적 문의.",
  keywords: ["건물관리 견적", "건물관리 상담", "건물관리 업체 문의", "공동주택관리 견적", "무료견적"],
  alternates: { canonical: "https://barobm.co.kr/estimate" },
  openGraph: {
    title: "무료 견적문의 | 바로건물관리",
    description: "건물관리 전문가와 1:1 무료 방문 컨설팅을 신청하세요",
    url: "https://barobm.co.kr/estimate",
  },
};

export default function EstimateListPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="온라인 견적 문의" 
        description="관리비 절감과 건물 가치 상승, 지금 바로 전문가의 무료 1:1 방문 컨설팅을 게시판을 통해 문의해보세요." 
      />
      <EstimateListClient />
    </div>
  )
}
