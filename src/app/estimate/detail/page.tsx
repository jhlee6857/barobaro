"use client";

import * as React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Lock, User, Calendar, Phone, Mail, Building, FileText, Pencil, Trash2 } from "lucide-react";
import AdminDeleteButton from "@/components/shared/AdminDeleteButton";
import EstimateEditForm from "@/components/shared/EstimateEditForm";

function EstimateDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') as string;

  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [post, setPost] = React.useState<any>(null);
  
  // Password check state
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  // Edit state
  const [isEditing, setIsEditing] = React.useState(false);

  // Reply state
  const [replyContent, setReplyContent] = React.useState("");
  const [isReplying, setIsReplying] = React.useState(false);

  React.useEffect(() => {
    // Check if user is admin
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAdmin(true);
        setIsUnlocked(true); // admins don't need password
        fetchPost(true);
      } else {
        setLoading(false);
        // We do not fetch post yet, waiting for password.
        // Wait, we can fetch just the title and author to show on the lock screen.
        fetchBasicInfo();
      }
    });
  }, [id]);

  const [basicInfo, setBasicInfo] = React.useState<any>(null);
  
  async function fetchBasicInfo() {
    const { data } = await supabase.from('inquiries').select('title, author').eq('id', id).single();
    if (data) setBasicInfo(data);
  }

  async function fetchPost(bypassPassword = false, pwd = "") {
    try {
      let query = supabase.from('inquiries').select('*').eq('id', id);
      if (!bypassPassword) {
        query = query.eq('password', pwd);
      }
      
      const { data, error } = await query.single();
      
      if (error || !data) {
        if (!bypassPassword) setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPost(data);
        setIsUnlocked(true);
      }
    } catch (e) {
      console.error(e);
      if (!bypassPassword) setPasswordError("정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    fetchPost(false, passwordInput);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsReplying(true);
    const { error } = await supabase.from('inquiries').insert([{
      title: `RE: ${post.title}`,
      author: "관리자",
      password: post.password, // inherit password so original user can see it
      details: { replyContent: replyContent }, // Store reply content here
      is_reply: true,
      parent_id: post.id
    }]);
    
    setIsReplying(false);
    
    if (error) {
      alert("답변 등록에 실패했습니다.");
    } else {
      alert("답변이 등록되었습니다.");
      router.push('/estimate'); // Go back to list
    }
  };

  const handleUserDelete = async () => {
    if (!confirm("정말 이 게시물을 삭제하시겠습니까? (삭제 시 복구할 수 없습니다)")) return;
    
    // Delete specifically with password verification
    const { error } = await supabase.from('inquiries').delete().eq('id', post.id).eq('password', passwordInput);
    if (error) {
      alert("삭제에 실패했습니다: " + error.message);
    } else {
      alert("게시물이 성공적으로 삭제되었습니다.");
      router.push('/estimate');
    }
  };

  if (loading) return <div className="min-h-screen pt-40 text-center">Loading...</div>;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-slate-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">비밀번호 확인</h2>
          {basicInfo && <p className="text-sm text-slate-500 mb-6 truncate">[{basicInfo.author}] {basicInfo.title}</p>}
          <p className="text-sm text-slate-500 mb-6 border border-slate-100 bg-slate-50 p-3 rounded-lg text-left">
            작성자 및 관리자만 읽을 수 있는 비밀글입니다. 작성 시 입력한 비밀번호를 입력해주세요.
          </p>
          {passwordError && <p className="text-red-500 text-sm mb-4 font-bold">{passwordError}</p>}
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <input 
              type="password" 
              placeholder="비밀번호 입력" 
              value={passwordInput} onChange={e=>setPasswordInput(e.target.value)}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-primary/50 text-center tracking-widest"
              autoFocus
            />
            <Button type="submit" className="w-full py-4 text-base font-bold shadow-md">확인</Button>
            <Button type="button" variant="outline" onClick={()=>router.push('/estimate')} className="w-full mt-2">목록으로</Button>
          </form>
        </div>
      </div>
    );
  }

  if (!post) return <div className="min-h-screen pt-40 text-center">데이터를 찾을 수 없습니다.</div>;

  const details = post.details || {};

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero title="온라인 견적 문의" description="게시글 열람" />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {isEditing ? (
            <EstimateEditForm 
              post={{...post, password: passwordInput}} 
              onCancel={() => setIsEditing(false)} 
              onSuccess={() => { setIsEditing(false); fetchPost(false, passwordInput); }} 
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-brand-light text-brand-primary text-xs font-bold rounded-full">견적문의</span>
              {post.is_reply && <span className="px-3 py-1 bg-brand-secondary text-white text-xs font-bold rounded-full">관리자 답변</span>}
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2"><User size={16}/> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(post.created_at).toLocaleString('ko-KR')}</span>
            </div>
          </div>

          {/* If it's a simple reply post, show reply content */}
          {post.is_reply ? (
            <div className="p-6 md:p-8 text-slate-700 leading-relaxed min-h-[300px] whitespace-pre-line">
              {details.replyContent}
            </div>
          ) : (
            /* Otherwise, it's a user's original inquiry -> Show structured details */
            <div className="p-6 md:p-8 space-y-8">
              {/* 고객 정보 */}
              <section>
                <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2 border-b pb-2"><Phone size={18}/> 1. 고객 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-lg">
                   <div><span className="font-bold text-slate-600 block mb-1">연락처</span> {details.phone || '-'}</div>
                   <div><span className="font-bold text-slate-600 block mb-1">이메일</span> {details.email || '-'}</div>
                </div>
              </section>

              {/* 건물 정보 */}
              <section>
                <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2 border-b pb-2"><Building size={18}/> 2. 건물 정보</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div className="col-span-2 md:col-span-3">
                     <span className="font-bold text-slate-600 block mb-1">상세 주소</span> 
                     <span className="text-lg">{details.buildingName} ({details.address})</span>
                  </div>
                  <div><span className="font-bold text-slate-600 block mb-1">건물 유형</span> {details.buildingType || '-'}</div>
                  <div><span className="font-bold text-slate-600 block mb-1">관리 방식</span> {details.managementType || '-'}</div>
                  <div><span className="font-bold text-slate-600 block mb-1">건물 규모</span> {details.scale || '-'}</div>
                  <div><span className="font-bold text-slate-600 block mb-1">세대수/호실</span> {details.units || '-'} 호</div>
                  <div><span className="font-bold text-slate-600 block mb-1">엘리베이터</span> {details.elevator || '-'}</div>
                </div>
              </section>

              {/* 요청 내용 */}
              <section>
                <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2 border-b pb-2"><FileText size={18}/> 3. 서비스 요청 내용</h3>
                <div className="space-y-6">
                  <div>
                    <span className="font-bold text-slate-600 block mb-2">필요한 관리 서비스</span>
                    <div className="flex gap-2 flex-wrap">
                      {(details.services || []).map((srv:string) => (
                        <span key={srv} className="border border-slate-200 bg-white px-3 py-1 rounded-full text-sm">{srv}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                    <span className="font-bold text-red-900 block mb-3">현재 주요 문제점 및 니즈</span>
                    <p className="whitespace-pre-line text-slate-800">{details.mainProblem || '-'}</p>
                  </div>
                  {details.extraInfo && (
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <span className="font-bold text-slate-700 block mb-3">특이사항/추가요청</span>
                      <p className="whitespace-pre-line text-slate-600">{details.extraInfo}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* Admin Reply Form */}
          {isAdmin && !post.is_reply && (
            <div className="mt-8 border-t border-slate-200 bg-slate-50 p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-brand-dark">관리자 답변 달기</h3>
              <form onSubmit={handleReplySubmit} className="flex flex-col gap-4">
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-4 h-32 focus:ring-2 focus:ring-brand-primary/50 outline-none"
                  placeholder="답변 내용을 작성해주세요. (답변 등록 후 견적문의 목록에 [RE:] 답글로 반영됩니다)"
                  value={replyContent}
                  onChange={e=>setReplyContent(e.target.value)}
                  required
                />
                <Button type="submit" disabled={isReplying} className="self-end w-32 py-3 shadow-md">{isReplying ? '등록 중...' : '등록하기'}</Button>
              </form>
            </div>
          )}

          <div className="border-t border-slate-200 p-6 flex justify-between items-center bg-slate-50">
            <Button variant="outline" onClick={()=>router.push('/estimate')}>목록으로</Button>
            
            <div className="flex gap-2">
              {isAdmin && <AdminDeleteButton table="inquiries" id={post.id} redirectUrl="/estimate" />}
              
              {/* User edit/delete features */}
              {!post.is_reply && isUnlocked && (
                <>
                  <Button variant="outline" className="border-slate-300 text-slate-700 bg-white" onClick={() => setIsEditing(true)}>
                    <Pencil size={16} className="mr-1.5" /> 수정
                  </Button>
                  {!isAdmin && (
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-white" onClick={handleUserDelete}>
                      <Trash2 size={16} className="mr-1.5" /> 삭제
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default function EstimateDetailPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen pt-40 text-center">Loading...</div>}>
      <EstimateDetailContent />
    </React.Suspense>
  )
}
