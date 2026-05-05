import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(rawPhone: string): string {
  if (!rawPhone) return "";
  
  // 1. 문자열로 변환하고 모든 공백/하이픈 제거
  let clean = String(rawPhone).replace(/[^0-9]/g, "");
  
  // 2. 국제번호 형식 처리 (+82 10... -> 010...)
  // 8210... 으로 시작하는 경우 앞의 82를 0으로 바꿈
  if (clean.startsWith("82")) {
    clean = "0" + clean.slice(2);
  }
  
  // 3. 10... 으로 시작하는 경우 (0이 빠진 경우) 앞에 0 추가
  if (clean.length === 10 && clean.startsWith("1")) {
    clean = "0" + clean;
  }
  
  // 4. 최종적으로 010으로 시작하지 않는 10자리 이상의 번호 예외 처리 (필요시)
  
  return clean;
}

export function formatPhoneNumberWithHyphen(rawPhone: string): string {
  const clean = formatPhoneNumber(rawPhone);
  if (!clean) return "";
  
  if (clean.length === 11) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 7)}-${clean.slice(7)}`;
  } else if (clean.length === 10) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6)}`;
  }
  
  // 기타 길이일 경우 그대로 반환하거나 적절히 처리
  return clean;
}
