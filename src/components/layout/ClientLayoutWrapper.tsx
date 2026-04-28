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
    return <main className="flex-grow bg-slate-50">{children}</main>;
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
