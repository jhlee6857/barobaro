"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";

export default function AdminBuildingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [building, setBuilding] = useState<any>(null);
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [unitNumber, setUnitNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [residentName, setResidentName] = useState("");
  const [isRepresentative, setIsRepresentative] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        fetchData();
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) router.push("/admin/login");
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, id]);

  async function fetchData() {
    try {
      // 건물 정보
      const { data: bData, error: bError } = await supabase
        .from("buildings")
        .select("*")
        .eq("id", id)
        .single();
        
      if (bError) throw bError;
      setBuilding(bData);

      // 입주민 리스트
      const { data: rData, error: rError } = await supabase
        .from("pre_registered_residents")
        .select("*")
        .eq("building_id", id)
        .order("created_at", { ascending: false });

      if (rError) throw rError;
      setResidents(rData || []);
      
    } catch (e) {
      console.error(e);
      alert("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const handleAddResident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNumber || !phoneNumber) return;
    
    // 전화번호에서 숫자만 추출하여 저장 (추후 카카오 로그인 시 전화번호와 매칭하기 위함)
    const cleanedPhone = phoneNumber.replace(/[^0-9]/g, "");

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('pre_registered_residents').insert([{ 
        building_id: id,
        unit_number: unitNumber,
        phone_number: cleanedPhone, // 숫자만 저장 (예: 01012345678)
        name: residentName,
        is_representative: isRepresentative
      }]);
      
      if (error) throw error;
      
      setUnitNumber("");
      setPhoneNumber("");
      setResidentName("");
      setIsRepresentative(false);
      fetchData(); // 갱신
    } catch (error: any) {
      alert("등록 실패: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteResident = async (residentId: string) => {
    if (!confirm("정말 이 입주민 명단을 삭제하시겠습니까?")) return;
    
    const { error } = await supabase.from('pre_registered_residents').delete().eq('id', residentId);
    if (!error) {
      fetchData();
    } else {
      alert("삭제 실패");
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    if (phone.length === 11) {
      return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
    }
    return phone;
  };

  if (loading) return <div className="p-10 text-center min-h-screen">Loading...</div>;
  if (!building) return <div className="p-10 text-center min-h-screen">건물 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/buildings" className="text-slate-500 hover:text-slate-800 transition">
            ← 목록으로 돌아가기
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">{building.name} <span className="text-lg font-normal text-slate-500 ml-2">입주민 사전등록 관리</span></h1>
          <p className="text-slate-500 mt-1">{building.address}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 새 입주민 등록 폼 */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit border border-slate-100">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 text-brand-dark">새 입주민 추가</h2>
            <form onSubmit={handleAddResident} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">동/호수 *</label>
                <input type="text" placeholder="예: 101동 101호" className="w-full border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                  value={unitNumber} onChange={e => setUnitNumber(e.target.value)} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">연락처 *</label>
                <input type="text" placeholder="숫자만 입력 (예: 01012345678)" className="w-full border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                  value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} required />
                <p className="text-xs text-slate-500 mt-1">※ 하이픈(-) 없이 숫자만 입력해 주세요.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">이름 (선택)</label>
                <input type="text" placeholder="예: 홍길동" className="w-full border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                  value={residentName} onChange={e => setResidentName(e.target.value)} />
              </div>

              <div className="flex items-center gap-2 mt-2 p-3 bg-slate-50 rounded border border-slate-200">
                <input type="checkbox" id="isRep" className="w-4 h-4 text-brand-primary rounded" 
                  checked={isRepresentative} onChange={e => setIsRepresentative(e.target.checked)} />
                <label htmlFor="isRep" className="text-sm font-bold text-slate-800 cursor-pointer">이 입주민을 동대표로 지정합니다.</label>
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-4 w-full bg-slate-800 text-white py-3 rounded font-bold hover:bg-slate-700 transition disabled:opacity-50">
                {isSubmitting ? "등록 중..." : "명단 확정 추가"}
              </button>
            </form>
          </div>

          {/* 명단 리스트 */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-brand-dark">등록 명단 리스트</h2>
              <span className="text-sm font-bold text-brand-primary bg-brand-light px-2 py-1 rounded">총 {residents.length}명 등록됨</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-sm border-b">
                    <th className="p-3 font-semibold">동/호수</th>
                    <th className="p-3 font-semibold">이름</th>
                    <th className="p-3 font-semibold">연락처</th>
                    <th className="p-3 font-semibold">가입상태</th>
                    <th className="p-3 font-semibold w-16 text-center">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500 border-b">사전 등록된 입주민이 없습니다.</td>
                    </tr>
                  )}
                  {residents.map((r) => (
                    <tr key={r.id} className="border-b transition hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-800">{r.unit_number}</td>
                      <td className="p-3 text-slate-600">
                        {r.name || '-'}
                        {r.is_representative && <span className="ml-2 text-xs bg-brand-primary text-white px-2 py-0.5 rounded-full font-bold">동대표</span>}
                      </td>
                      <td className="p-3 text-slate-600">{formatPhoneNumber(r.phone_number)}</td>
                      <td className="p-3 text-sm">
                        {r.is_registered ? (
                          <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded border border-green-200">앱가입완료</span>
                        ) : (
                          <span className="text-slate-500 font-medium">미가입</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button onClick={() => handleDeleteResident(r.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
