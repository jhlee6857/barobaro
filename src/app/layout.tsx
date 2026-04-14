import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "바로바로건물관리 | 신뢰할 수 있는 B2B 종합건물관리",
  description: "접수는 빠르게, 대응은 정확하게, 관리는 투명하게. 공동주택, 빌라, 소형 건물 종합관리 전문 파트너.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
