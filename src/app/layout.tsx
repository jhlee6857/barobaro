import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/shared/FloatingContact";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "바로건물관리 | 신뢰할 수 있는 B2B 종합건물관리",
  description: "접수는 빠르게, 대응은 정확하게, 관리는 투명하게. 공동주택, 빌라, 소형 건물 종합관리 전문 파트너. 환경미화, 시설유지, 민원처리 전문.",
  keywords: ["바로건물관리", "건물관리", "종합건물관리", "공동주택관리", "빌라관리", "시설관리", "환경미화", "건물관리업체", "B2B건물관리"],
  authors: [{ name: "바로건물관리" }],
  verification: {
    google: "v1KVU_KLSqd6LeIOgdl5-XUFlnMJhb-zfeGpX6mKjzc",
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
    title: "바로건물관리 | 신뢰할 수 있는 B2B 종합건물관리",
    description: "접수는 빠르게, 대응은 정확하게, 관리는 투명하게. 공동주택, 빌라, 소형 건물 종합관리 전문 파트너.",
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
      <body className="flex flex-col min-h-screen">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
