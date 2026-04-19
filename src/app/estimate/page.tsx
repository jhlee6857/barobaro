"use client";

import React, { useEffect, useState } from "react";
import { PageHero } from "@/components/shared/PageHero";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Lock, CornerDownRight, Pencil } from "lucide-react";

export default function EstimateListPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchInquiries() {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('id, created_at, title, author, is_reply, parent_id')
          .order('created_at', { ascending: false });

        if (data) {
          const parents = data.filter(item => !item.is_reply);
          const replies = data.filter(item => item.is_reply);

          const sorted = [];
          for (const p of parents) {
            sorted.push(p);
            const childReplies = replies.filter(r => r.parent_id === p.id).sort((a,b)=> new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            sorted.push(...childReplies);
          }
          
          const orphaned = replies.filter(r => !parents.some(p => p.id === r.parent_id));
          sorted.push(...orphaned);

          setInquiries(sorted);
        }
      } catch (e) {
        console.error("Failed to fetch inquiries:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchInquiries();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero 
        title="온라인 견적 문의" 
        description="관리비 절감과 건물 가치 상승, 지금 바로 전문가의 무료 1:1 방문 컨설팅을 게시판을 통해 문의해보세요." 
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 border-b border-brand-dark/10 bg-slate-50 p-4 text-center font-bold text-slate-700">
            <div className="col-span-2 md:col-span-1 border-none">번호</div>
            <div className="col-span-7 md:col-span-7 text-left">제목</div>
            <div className="col-span-3 md:col-span-2 border-none">작성자</div>
            <div className="hidden md:block col-span-2 border-none">작성일자</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100 min-h-[400px]">
             {loading ? (
                <div className="p-12 text-center text-slate-500">
                  데이터를 불러오는 중입니다...
                </div>
             ) : inquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  작성된 문의가 없습니다.
                </div>
             ) : (
                inquiries.map((post, index) => (
                  <div key={post.id} className="grid grid-cols-12 gap-4 p-4 text-center items-center hover:bg-slate-50 transition">
                    <div className="col-span-2 md:col-span-1 text-slate-500 text-sm">
                      {inquiries.length - index}
                    </div>
                    <div className="col-span-7 md:col-span-7 text-left flex items-center gap-2 overflow-hidden">
                       {post.is_reply && (
                         <CornerDownRight size={16} className="text-slate-400 ml-4 line-through flex-shrink-0" />
                       )}
                       <Lock size={14} className="text-slate-400 flex-shrink-0" />
                       {post.is_reply && <span className="font-bold text-brand-secondary text-sm flex-shrink-0">RE:</span>}
                       <Link href={`/estimate/detail?id=${post.id}`} className="text-slate-800 hover:text-brand-primary font-medium truncate block">
                         {post.title}
                       </Link>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-slate-700 text-sm truncate">
                      {post.author}
                    </div>
                    <div className="hidden md:block col-span-2 text-slate-500 text-sm">
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto flex justify-end mt-6">
          <Link href="/estimate/write">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition shadow-md">
              <Pencil size={18} /> 글쓰기
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
