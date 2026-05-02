import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">개인정보 처리방침</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">
          '바로' 건물관리 시스템(이하 '회사')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4">제1조(개인정보의 처리목적)</h2>
        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>입주민 본인 확인 및 식별</li>
          <li>건물 내 긴급 공지사항(단수, 정전 등) 안내 문자 발송</li>
          <li>견적 문의 및 상담 처리</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">제2조(처리하는 개인정보 항목)</h2>
        <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>필수항목: 이름, 연락처(전화번호)</li>
          <li>선택항목: 이메일</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">제3조(개인정보의 처리 및 보유 기간)</h2>
        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>

        <h2 className="text-xl font-bold mt-8 mb-4">제4조(정보주체의 권리·의무 및 그 행사방법)</h2>
        <p>이용자는 개인정보주체로서 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
      </div>
    </div>
  );
}
