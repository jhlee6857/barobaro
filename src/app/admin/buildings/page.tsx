"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBuildingsPage() {
  const router = useRouter();
  const [buildings, setBuildings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newBuildingName, setNewBuildingName] = useState("");
  const [newBuildingAddress, setNewBuildingAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        fetchBuildings();
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) router.push("/admin/login");
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function fetchBuildings() {
    try {
      // 건물 정보와 해당 건물의 사전등록 입주민 수를 함께 조회
      const { data, error } = await supabase
        .from("buildings")
        .select(`
          *,
          pre_registered_residents (count)
        `)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBuildings(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  }

  const handleCreateBuilding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuildingName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('buildings').insert([{ 
        name: newBuildingName,
        address: newBuildingAddress
      }]);
      
      if (error) throw error;
      
      alert("건물이 등록되었습니다.");
      setNewBuildingName("");
      setNewBuildingAddress("");
      fetchBuildings();
    } catch (error: any) {
      alert("오류 발생: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBuilding = async (id: string, name: string) => {
    if (!confirm(`정말 [${name}] 건물을 삭제하시겠습니까? 관련된 모든 입주민 정보도 함께 삭제됩니다.`)) return;
    
    const { error } = await supabase.from('buildings').delete().eq('id', id);
    if (!error) {
      fetchBuildings();
    } else {
      alert("삭제 실패");
    }
  };

  if (loading) return <div className="p-10 text-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">바로바로 본사 통합 관리 시스템</h1>
            <p className="text-slate-500 mt-2">등록된 모든 건물과 입주민 현황을 총괄 관리합니다.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/cases" className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition text-sm font-bold">사례 관리로 이동</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition text-sm font-bold">로그아웃</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* 새 건물 등록 폼 */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-brand-dark">새 건물 등록</h2>
            <form onSubmit={handleCreateBuilding} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">건물명 *</label>
                <input type="text" placeholder="예: 서울빌라 A동" className="w-full border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                  value={newBuildingName} onChange={e => setNewBuildingName(e.target.value)} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">주소 (선택)</label>
                <input type="text" placeholder="예: 서울시 마포구 신촌로 1" className="w-full border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                  value={newBuildingAddress} onChange={e => setNewBuildingAddress(e.target.value)} />
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-4 w-full bg-brand-primary text-white py-3 rounded font-bold hover:bg-brand-dark transition disabled:opacity-50">
                {isSubmitting ? "등록 중..." : "건물 등록하기"}
              </button>
            </form>
          </div>

          {/* 건물 리스트 현황 */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-brand-dark">관리 단지 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buildings.length === 0 && <p className="text-slate-500 py-4 col-span-2 text-center bg-white rounded-lg border border-slate-100">등록된 건물이 없습니다.</p>}
              
              {buildings.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-lg shadow-sm flex flex-col gap-3 border border-slate-100 transition hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 leading-tight">{b.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{b.address || '주소 미상'}</p>
                    </div>
                    <button onClick={() => handleDeleteBuilding(b.id, b.name)} className="text-xs text-red-500 hover:underline">
                      삭제
                    </button>
                  </div>
                  
                  <div className="mt-4 bg-slate-50 p-3 rounded-md flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-medium">사전 등록 입주민 수</span>
                    <span className="font-bold text-slate-800">{b.pre_registered_residents?.[0]?.count || 0} 명</span>
                  </div>
                  
                  <Link href={`/admin/buildings/${b.id}`} className="mt-2 text-center w-full bg-slate-800 text-white py-2 rounded text-sm font-bold hover:bg-slate-700 transition">
                    명단 관리 (엑셀 등록)
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
