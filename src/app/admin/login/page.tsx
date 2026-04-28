"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/admin/buildings");
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/buildings");
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-800 tracking-tight">Admin Login</h1>
        {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded-lg font-medium">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">이메일</label>
            <input 
              type="email" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all"
              value={email} onChange={(e) => setEmail(e.target.value)} required 
              placeholder="admin@barobm.co.kr"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">비밀번호</label>
            <input 
              type="password" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
