import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "건물관리 전문업체 - 바로건물관리 | 원룸·빌라 종합건물관리",
  description: "건물관리 전문업체 바로건물관리입니다. 원룸, 빌라, 상가, 오피스텔 등 수익형 부동산의 유지보수, 청소(환경미화), 민원처리를 책임지는 B2B 종합건물관리 서비스를 제공합니다. 스트레스 없는 건물관리를 지금 시작하세요.",
  keywords: ["건물관리", "건물관리업체", "건물관리 전문업체", "종합건물관리", "빌라관리", "원룸관리", "상가관리", "바로건물관리", "수익형부동산관리", "시설관리", "건물청소", "환경미화"],
  authors: [{ name: "바로건물관리" }],
  verification: {
    google: "v1KVU_KLSqd6LeIOgdl5-XUFlnMJhb-zfeGpX6mKjzc",
    other: {
      "naver-site-verification": "bbd5d7f4361a4248981a11fedfbc59f240ffbfe9",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://barobm.co.kr",
    siteName: "바로건물관리",
    title: "건물관리 전문업체 - 바로건물관리 | 원룸·빌라 종합건물관리",
    description: "건물관리 전문업체 바로건물관리. 원룸, 빌라, 상가 등 수익형 부동산의 책임지는 종합건물관리 서비스.",
  },
  alternates: {
    canonical: "https://barobm.co.kr",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <LocalBusinessJsonLd />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
