"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { KeyRound, Building, CheckCircle2 } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";

export default function ResidentRegisterPage() {
  const router = useRouter();
  const [pinCode, setPinCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [isRepresentative, setIsRepresentative] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMetadata, setUserMetadata] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push("/login");
        return;
      }
      
      setUserMetadata(session.user.user_metadata);
      
      const rawPhone = session.user.user_metadata?.phone_number || "";
      const cleanPhone = formatPhoneNumber(rawPhone);
      setUserPhone(cleanPhone);

      // [추가] 이미 등록된 전화번호인지 확인하여, 등록되어 있다면 대시보드로 바로 보냄
      if (cleanPhone) {
        const { data: existingResident } = await supabase
          .from("pre_registered_residents")
          .select("is_registered")
          .eq("phone_number", cleanPhone)
          .single();
        
        if (existingResident?.is_registered) {
          router.push("/resident");
        }
      }
    });
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. PIN 번호로 건물 조회
      const { data: buildingData, error: buildingError } = await supabase
        .from("buildings")
        .select("id, name")
        .eq("pin_code", pinCode)
        .single();

      if (buildingError || !buildingData) {
        throw new Error("유효하지 않은 PIN 번호입니다. 건물 게시판을 다시 확인해 주세요.");
      }

      const buildingId = buildingData.id;

      // 2. 해당 호수에 이미 등록된 사람이 몇 명인지 확인 (최대 2명 제한)
      const { data: existingResidents, error: countError } = await supabase
        .from("pre_registered_residents")
        .select("id")
        .eq("building_id", buildingId)
        .eq("unit_number", unitNumber);

      if (countError) throw new Error("정보 조회 중 오류가 발생했습니다.");

      if (existingResidents && existingResidents.length >= 2) {
        throw new Error(`[${unitNumber}] 호는 이미 2명이 등록되어 있어 추가 등록이 불가합니다. 관리자에게 문의해 주세요.`);
      }

      // 3. 신규 입주민으로 등록
      const { error: insertError } = await supabase
        .from("pre_registered_residents")
        .insert([{
          building_id: buildingId,
          unit_number: unitNumber,
          phone_number: userPhone || "번호없음(심사대기)", // 카카오 심사 전일 경우 대비
          name: userMetadata?.name || userMetadata?.nickname || "이름없음",
          is_representative: isRepresentative,
          is_registered: true
        }]);

      if (insertError) {
        // 이미 등록된 전화번호인 경우 등의 에러 처리
        if (insertError.code === '23505') {
           throw new Error("이미 등록된 전화번호입니다.");
        }
        throw new Error("등록 처리 중 오류가 발생했습니다: " + insertError.message);
      }

      alert(`${buildingData.name} ${unitNumber} 입주민으로 등록되었습니다!`);
      router.push("/resident");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary">
            <KeyRound size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">입주민 거주 인증</h1>
          <p className="text-slate-500 text-sm">
            건물 게시판에 안내된 4자리 PIN 번호와<br/>거주하시는 동/호수를 입력해 주세요.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 border border-red-100 leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building size={16} className="text-slate-400" />
              건물 PIN 번호 (4자리 숫자)
            </label>
            <input 
              type="text" 
              maxLength={4}
              className="w-full border border-slate-200 rounded-xl p-3.5 text-lg font-black tracking-widest text-center focus:ring-2 focus:ring-brand-primary outline-none transition-all bg-slate-50 focus:bg-white"
              value={pinCode} 
              onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))} 
              required 
              placeholder="예: 8492"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              거주 동/호수
            </label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all bg-slate-50 focus:bg-white"
              value={unitNumber} 
              onChange={(e) => setUnitNumber(e.target.value)} 
              required 
              placeholder="예: 101동 202호 (또는 202호)"
            />
          </div>

          <div className="flex items-center gap-2 mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer" onClick={() => setIsRepresentative(!isRepresentative)}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${isRepresentative ? 'bg-brand-primary border-brand-primary' : 'bg-white border-slate-300'}`}>
              {isRepresentative && <CheckCircle2 size={14} className="text-white" />}
            </div>
            <span className="text-sm font-bold text-slate-700">이 건물의 동대표(담당자) 권한을 신청합니다.</span>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || pinCode.length !== 4 || !unitNumber}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? "인증 중..." : "인증 완료하고 시작하기"}
          </button>
        </form>

      </div>
    </div>
  );
}
