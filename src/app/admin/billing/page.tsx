"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, FileSpreadsheet, Search, MoreVertical, CreditCard } from "lucide-react";

export default function AdminBillingPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        fetchInvoices();
      }
    });
  }, [router]);

  async function fetchInvoices() {
    try {
      // JOIN with pre_registered_residents to get resident name/info
      // Since resident_id is UUID linking to auth.users, and we might not have names in auth.users easily accessible,
      // usually we join with a profile table. Assuming we just show UUID or simple info for now.
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          resident:resident_id ( email )
        `)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setInvoices(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const totalAmountPaid = paidInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid' || inv.status === 'pending');
  const totalAmountUnpaid = unpaidInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) return <div className="p-10 flex items-center justify-center h-full text-slate-500">데이터를 불러오는 중입니다...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">수납/청구 관리</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">세대별 관리비 청구 및 수납(가상계좌) 현황을 확인합니다.</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs md:text-sm font-semibold hover:bg-slate-50 transition-colors">
            <FileSpreadsheet size={14} className="md:w-4 md:h-4" />
            엑셀 다운로드
          </button>
          <button 
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-[#1b64da] text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <CreditCard size={14} className="md:w-4 md:h-4" />
            청구서 발행 (수동)
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 text-[#1b64da] flex items-center justify-center shrink-0">
            <CreditCard size={20} className="md:w-6 md:h-6" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider uppercase">총 청구 건수</p>
            <p className="text-lg md:text-2xl font-bold text-slate-800">{invoices.length}건</p>
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <CheckCircle size={20} className="md:w-6 md:h-6" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider uppercase">수납 완료 금액</p>
            <p className="text-lg md:text-2xl font-bold text-slate-800">{totalAmountPaid.toLocaleString()}원</p>
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertCircle size={20} className="md:w-6 md:h-6" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider uppercase">미납/대기 금액</p>
            <p className="text-lg md:text-2xl font-bold text-red-600">{totalAmountUnpaid.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
              <Search size={14} /> 필터
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">청구월</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">대상 세대</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">금액</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">가상계좌 정보</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">상태</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">기능</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">조회된 내역이 없습니다. (DB에 청구서를 생성해주세요)</td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 font-bold text-slate-800">{inv.billing_month}</td>
                    <td className="p-4 text-sm text-slate-600">
                      {inv.resident?.email || inv.resident_id.substring(0,8) + '...'}
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-800">{inv.amount.toLocaleString()}원</td>
                    <td className="p-4 text-sm text-slate-600">
                      {inv.virtual_account_bank ? `${inv.virtual_account_bank}은행 ${inv.virtual_account_number}` : '-'}
                    </td>
                    <td className="p-4">
                      {inv.status === 'paid' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">수납완료</span>}
                      {inv.status === 'unpaid' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">미납</span>}
                      {inv.status === 'pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">입금 대기</span>}
                      {inv.status === 'overdue' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">연체</span>}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-[#1b64da] rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
