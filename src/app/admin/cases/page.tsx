"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminCasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    region: "",
    buildingType: "",
    scale: "",
    mainProblem: "",
    process: "",
    result: ""
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        fetchCases();
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) router.push("/admin/login");
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function fetchCases() {
    try {
      const { data, error } = await supabase.from("cases").select("*").order("created_at", { ascending: false });
      if (!error && data) setCases(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = null;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('case_images').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage.from('case_images').getPublicUrl(filePath);
        imageUrl = publicData.publicUrl;
      }

      const { error } = await supabase.from('cases').insert([{ ...formData, imageUrl }]);
      if (error) throw error;
      
      alert("관리 사례가 등록되었습니다.");
      setFormData({ region: "", buildingType: "", scale: "", mainProblem: "", process: "", result: "" });
      setFile(null);
      fetchCases();
    } catch (error: any) {
      alert("오류 발생: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    // Delete image if exists
    if (imageUrl) {
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      await supabase.storage.from('case_images').remove([fileName]);
    }

    const { error } = await supabase.from('cases').delete().eq('id', id);
    if (!error) fetchCases();
    else alert("삭제 실패");
  };

  if (loading) return <div className="p-10 text-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">관리 사례 어드민</h1>
          <div className="flex gap-4">
            <Link href="/admin/buildings" className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition text-sm font-bold">본사 대시보드로 이동</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition text-sm font-bold">로그아웃</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 업로드 폼 */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-brand-dark">새 사례 등록</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="지역 구분 (ex: 마포구)" className="border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} required />
              
              <input type="text" placeholder="건물 형태 (ex: 중소형 오피스 빌딩)" className="border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                value={formData.buildingType} onChange={e => setFormData({...formData, buildingType: e.target.value})} required />
              
              <input type="text" placeholder="건물 규모 (ex: 지하 1층 / 지상 7층)" className="border p-2 rounded outline-none focus:ring focus:ring-brand-light" 
                value={formData.scale} onChange={e => setFormData({...formData, scale: e.target.value})} required />
              
              <textarea placeholder="AS-IS (도입 전 주요 문제)" className="border p-2 rounded h-24 outline-none focus:ring focus:ring-brand-light" 
                value={formData.mainProblem} onChange={e => setFormData({...formData, mainProblem: e.target.value})} required />
                
              <textarea placeholder="진행 과정" className="border p-2 rounded h-24 outline-none focus:ring focus:ring-brand-light" 
                value={formData.process} onChange={e => setFormData({...formData, process: e.target.value})} required />
                
              <textarea placeholder="TO-BE (개선 결과)" className="border p-2 rounded h-24 outline-none focus:ring focus:ring-brand-light" 
                value={formData.result} onChange={e => setFormData({...formData, result: e.target.value})} required />
              
              <div>
                <label className="block text-sm font-medium mb-1 mt-2 text-slate-700">현장 사진 첨부</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand-primary" />
              </div>

              <button type="submit" disabled={uploading} className="mt-6 w-full bg-brand-primary text-white py-3 rounded font-bold hover:bg-brand-dark transition disabled:opacity-50">
                {uploading ? "업로드 중..." : "사례 등록하기"}
              </button>
            </form>
          </div>

          {/* 리스트 */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-brand-dark">등록된 사례 목록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cases.length === 0 && <p className="text-slate-500 py-4 col-span-2 text-center bg-white rounded-lg">등록된 사례가 없습니다.</p>}
              {cases.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-3 border border-slate-100 overflow-hidden">
                  {c.imageUrl && <img src={c.imageUrl} alt="현장사진" className="w-full h-48 object-cover rounded -mt-4 -mx-4 mb-2 max-w-[calc(100%+2rem)]" />}
                  <div>
                    <span className="text-xs bg-brand-light text-brand-primary px-2 py-1 rounded inline-block mb-2 font-bold">{c.region}</span>
                    <h3 className="font-bold text-lg text-slate-800 leading-tight">{c.buildingType}</h3>
                    <p className="text-sm text-slate-500 mt-1">{c.scale}</p>
                  </div>
                  <button onClick={() => handleDelete(c.id, c.imageUrl)} className="mt-auto px-3 py-1.5 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition self-start font-bold">
                    삭제하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
