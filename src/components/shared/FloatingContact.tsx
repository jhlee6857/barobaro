"use client";

import React, { useState } from 'react';
import { MessageCircle, Phone, MessageSquare, X, Plus } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: '카톡 상담',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-[#FEE500] text-[#3c1e1e]',
      // TODO: 사용자 오픈채팅 링크로 교체 필요
      link: 'https://open.kakao.com/o/syour_link_here', 
    },
    {
      name: '전화 상담',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-brand-primary text-white',
      link: 'tel:010-8578-4066',
    },
    {
      name: '문의 게시판',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'bg-slate-800 text-white',
      link: '/estimate/write',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* 서브 버튼들 */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {contacts.map((contact, idx) => (
          <a
            key={idx}
            href={contact.link}
            target={contact.link.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
              {contact.name}
            </span>
            <div className={`w-12 h-12 rounded-full ${contact.color} shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95`}>
              {contact.icon}
            </div>
          </a>
        ))}
      </div>

      {/* 메인 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-100 text-slate-800 rotate-90' : 'bg-brand-primary text-white hover:bg-brand-dark'}`}
      >
        {isOpen ? <X size={28} /> : <Plus size={32} className="transition-transform duration-300" />}
      </button>
    </div>
  );
}
