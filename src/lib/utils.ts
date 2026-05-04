import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(rawPhone: string): string {
  if (!rawPhone) return "";
  
  // 모든 숫자 이외의 문자 제거
  let clean = rawPhone.replace(/[^0-9]/g, "");
  
  // +82 또는 82로 시작하는 경우 0으로 시작하도록 변경
  if (rawPhone.includes("+82") || rawPhone.startsWith("82")) {
    clean = "0" + clean.slice(2);
  }
  
  // 만약 1012345678 형식(0이 빠진 경우)이면 앞에 0을 추가
  if (clean.length === 10 && clean.startsWith("1")) {
    clean = "0" + clean;
  }
  
  return clean;
}
