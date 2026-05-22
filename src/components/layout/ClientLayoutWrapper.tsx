"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/shared/FloatingContact";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // 관리자 페이지에서도 상단 Header를 유지하고, Header 높이만큼 pt를 주어 아래에 표시되도록 함. Footer는 숨김.
    return (
      <>
        <Header />
        <main className="flex-grow bg-slate-50 pt-[100px] md:pt-[135px]" style={{ height: '100vh' }}>
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
