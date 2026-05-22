import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-100 rounded-2xl">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 border-b pb-4">개인정보 처리방침</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="mb-6">
            <strong>'바로' 건물관리 시스템</strong>(이하 '회사')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">제1조 (개인정보의 처리목적)</h2>
            <p className="mb-2">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>홈페이지 회원가입 및 관리</strong><br />
                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
              </li>
              <li>
                <strong>민원사무 처리</strong><br />
                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.
              </li>
              <li>
                <strong>재화 또는 서비스 제공</strong><br />
                서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공을 목적으로 개인정보를 처리합니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">제2조 (처리하는 개인정보 항목)</h2>
            <p className="mb-2">회사는 서비스 제공을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.</p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>필수항목:</strong> 이름, 카카오계정(전화번호), 카카오계정(닉네임)</li>
                <li><strong>수집 근거:</strong> 이용자 식별 및 입주민 인증, 서비스 안내 문자 발송</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">제3조 (개인정보의 처리 및 보유 기간)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
              <li><strong>보유 기간:</strong> 회원 탈퇴 시까지 (단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간까지 보관)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">제4조 (개인정보의 파기절차 및 방법)</h2>
            <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하며, 종이 문서에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">제5조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h2>
            <p>정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 회사에 대해 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">제6조 (개인정보의 안전성 확보 조치)</h2>
            <p>회사는 개인정보의 안전성 확보를 위해 해킹 등에 대비한 기술적 대책, 개인정보 취급 직원의 최소화 및 교육 등 관리적 대책을 시행하고 있습니다.</p>
          </section>

          <p className="mt-12 text-sm text-slate-400">
            공고일자: 2026년 5월 1일<br />
            시행일자: 2026년 5월 1일
          </p>
        </div>
      </div>
    </div>
  );
}
