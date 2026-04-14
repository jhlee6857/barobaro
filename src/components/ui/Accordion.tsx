"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  items: {
    id: string;
    question: string;
    answer: React.ReactNode;
  }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className="border border-slate-200 rounded-lg bg-white overflow-hidden"
        >
          <button
            onClick={() => toggle(item.id)}
            className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <span className="pr-4">{item.question}</span>
            <span className="text-slate-400 flex-shrink-0">
              {openId === item.id ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              )}
            </span>
          </button>
          
          <div 
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              openId === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="p-5 pt-0 text-slate-600 bg-white border-t border-slate-100">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
