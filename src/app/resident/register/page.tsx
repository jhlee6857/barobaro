"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Building, CheckCircle2, Phone } from "lucide-react";
import { formatPhoneNumber, formatPhoneNumberWithHyphen } from "@/lib/utils";

export default function ResidentRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pinCode, setPinCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [phoneInput, setPhoneInput] = useState(""); // 사용자가 직접 입력하는 전화번호
  const [isRepresentative, setIsRepresentative] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userMetadata, setUserMetadata] = useState<any>(null);
  // 이미 stored_phone이 있는 경우(재방문) 자동으로 채워짐
  const [storedPhone, setStoredPhone] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push("/login");
        return;
      }
      
      const metadata = session.user.user_metadata || {};
      const identities = session.user.identities || [];
      const kakaoIdentity = identities.find((id: any) => id.provider === 'kakao');
      const identityData = kakaoIdentity?.identity_data || {};
      const realName = identityData.name || identityData.kakao_account?.name || metadata.name || metadata.full_name || "이름없음";
      
      setUserMetadata({ ...metadata, realName });

      // URL 파라미터로 넘어온 전화번호가 있으면 자동 입력 (콜백에서 넘겨준 값)
      const phoneFromUrl = searchParams.get("phone");
      if (phoneFromUrl) {
        setPhoneInput(formatPhoneNumber(phoneFromUrl));
      }

      // 이미 이전에 직접 입력한 stored_phone이 있는지 확인
      const alreadyStored = formatPhoneNumber(metadata.stored_phone || "");
      if (alreadyStored) {
        setStoredPhone(alreadyStored);

        // 이미 등록된 번호인지 DB 확인
        const hyphenPhone = alreadyStored.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        const { data: existingResident } = await supabase
          .from("pre_registered_residents")
          .select("is_registered")
          .or(`phone_number.eq.${alreadyStored},phone_number.eq.${hyphenPhone}`)
          .single();
        
        if (existingResident?.is_registered) {
          router.push("/resident");
        }
      }
    });
  }, [router, searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const cleanPhone = formatPhoneNumber(phoneInput);

      // 전화번호 유효성 검사
      if (!cleanPhone || cleanPhone.length < 10) {
        throw new Error("올바른 전화번호를 입력해 주세요. (예: 01012345678)");
      }

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

      // 3. [핵심] 전화번호를 Supabase 사용자 메타데이터에 'stored_phone'으로 영구 저장
      //    다음 로그인 시 카카오에서 전화번호를 못 받아도 이 값을 사용함
      await supabase.auth.updateUser({
        data: { stored_phone: cleanPhone }
      });

      // 4. 신규 입주민으로 등록
      const { error: insertError } = await supabase
        .from("pre_registered_residents")
        .insert([{
          building_id: buildingId,
          unit_number: unitNumber,
          phone_number: formatPhoneNumberWithHyphen(cleanPhone),
          name: userMetadata?.realName || "이름없음",
          is_representative: isRepresentative,
          is_registered: true
        }]);

      if (insertError) {
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
          {/* 전화번호 입력 (항상 표시) */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone size={16} className="text-slate-400" />
              연락처
              {storedPhone && <span className="text-xs text-green-600 font-normal">(이전에 입력한 번호가 있습니다)</span>}
            </label>
            <input 
              type="tel" 
              className="w-full border border-slate-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all bg-slate-50 focus:bg-white"
              value={phoneInput || storedPhone} 
              onChange={(e) => setPhoneInput(e.target.value.replace(/[^0-9]/g, ''))} 
              required 
              placeholder="숫자만 입력 (예: 01012345678)"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              ※ 관리자가 등록한 전화번호와 동일하게 입력해 주세요.
            </p>
          </div>

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
            disabled={isLoading || pinCode.length !== 4 || !unitNumber || (!phoneInput && !storedPhone)}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? "인증 중..." : "인증 완료하고 시작하기"}
          </button>
        </form>

      </div>
    </div>
  );
}
