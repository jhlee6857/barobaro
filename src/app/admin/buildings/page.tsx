"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Users, Plus, FileSpreadsheet, Search, MoreVertical, AlertCircle, CheckCircle } from "lucide-react";

export default function AdminBuildingsPage() {
  const router = useRouter();
  const [buildings, setBuildings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newBuildingName, setNewBuildingName] = useState("");
  const [newBuildingAddress, setNewBuildingAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        fetchBuildings();
      }
    });
  }, [router]);

  async function fetchBuildings() {
    try {
      const { data, error } = await supabase
        .from("buildings")
        .select(`*, pre_registered_residents (count)`)
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
      setShowAddForm(false);
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

  const totalResidents = buildings.reduce((acc, curr) => acc + (curr.pre_registered_residents?.[0]?.count || 0), 0);

  if (loading) return <div className="p-10 flex items-center justify-center h-full text-slate-500">데이터를 불러오는 중입니다...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Buildings Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage building information and resident capacities.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            <FileSpreadsheet size={16} />
            Export CSV
          </button>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Building
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Total Buildings</p>
            <p className="text-2xl font-bold text-slate-800">{buildings.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Total Residents</p>
            <p className="text-2xl font-bold text-slate-800">{totalResidents}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Pending Issues</p>
            <p className="text-2xl font-bold text-slate-800">5</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Active Status</p>
            <p className="text-2xl font-bold text-slate-800">Normal</p>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4 text-slate-800">새 건물 등록</h2>
          <form onSubmit={handleCreateBuilding} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold mb-1.5 text-slate-700">건물명 *</label>
              <input type="text" placeholder="예: 서울빌라 A동" className="w-full border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary text-sm" 
                value={newBuildingName} onChange={e => setNewBuildingName(e.target.value)} required />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold mb-1.5 text-slate-700">주소 (선택)</label>
              <input type="text" placeholder="예: 서울시 마포구 신촌로 1" className="w-full border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary text-sm" 
                value={newBuildingAddress} onChange={e => setNewBuildingAddress(e.target.value)} />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-brand-dark text-white px-6 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-colors text-sm h-[42px]">
              {isSubmitting ? "등록 중..." : "등록하기"}
            </button>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
              <Search size={14} /> Filter
            </button>
          </div>
          <span className="text-sm text-slate-500">Showing {buildings.length} buildings</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Building Name</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Address</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Residents</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">등록된 건물이 없습니다.</td>
                </tr>
              ) : (
                buildings.map((b) => (
                  <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{b.name}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{b.address || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-slate-400" />
                        <span className="font-medium">{b.pre_registered_residents?.[0]?.count || 0}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/buildings/${b.id}`} className="px-3 py-1.5 text-sm font-semibold text-brand-primary border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                          View Details
                        </Link>
                        <button onClick={() => handleDeleteBuilding(b.id, b.name)} className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
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
