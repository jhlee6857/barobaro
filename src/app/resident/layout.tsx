import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "입주민센터 | 바로건물관리 - 민원접수·FAQ·관리비문의",
  description: "바로건물관리 입주민센터에서 민원접수, 자주묻는 질문(FAQ), 관리비 문의를 비공개로 안전하게 처리합니다. 24시간 상황실 연결.",
  keywords: ["민원접수", "건물관리 민원", "입주민센터", "관리비문의", "공동주택 민원"],
  alternates: { canonical: "https://barobm.co.kr/resident" },
  openGraph: {
    title: "입주민센터 | 바로건물관리",
    description: "민원접수, FAQ, 관리비 문의를 비공개로 안전하게",
    url: "https://barobm.co.kr/resident",
  },
};

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
