import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// 환경변수에서 토스페이먼츠 시크릿 키를 가져옵니다. (없으면 테스트 키 사용)
const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY || "test_sk_Z1aOwX7K8m2KovG5Z020VryL5zN0";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceId, amount, orderName, customerName, bank } = body;

    if (!invoiceId || !amount || !bank) {
      return NextResponse.json({ error: "필수 파라미터가 누락되었습니다." }, { status: 400 });
    }

    // 1. 토스페이먼츠 가상계좌 발급 API 호출
    // Secret Key를 Base64로 인코딩하여 Basic Auth 헤더에 추가
    const authHeader = `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString('base64')}`;

    const response = await fetch("https://api.tosspayments.com/v1/virtual-accounts", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        orderId: invoiceId, // 주문번호로 청구서 ID 사용
        orderName: orderName || "건물 관리비",
        customerName: customerName || "입주민",
        bank: bank,
        // 가상계좌 유효기간: 발급 후 7일
        validHours: 168,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("토스페이먼츠 에러:", errorData);
      return NextResponse.json({ error: "가상계좌 발급에 실패했습니다.", details: errorData }, { status: response.status });
    }

    const data = await response.json();

    // 2. 발급된 가상계좌 정보를 Supabase invoices 테이블에 저장
    const virtualAccount = data.virtualAccount;
    if (virtualAccount) {
      const { error: dbError } = await supabase
        .from('invoices')
        .update({
          status: 'pending', // 입금 대기 상태
          virtual_account_bank: virtualAccount.bankCode, // 은행 코드
          virtual_account_number: virtualAccount.accountNumber, // 발급된 계좌번호
        })
        .eq('id', invoiceId);

      if (dbError) {
        console.error("DB 업데이트 에러:", dbError);
        // DB 업데이트 실패해도 가상계좌는 발급되었으므로 사용자에게 보여줄 수는 있음
      }
    }

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error("서버 에러:", error);
    return NextResponse.json({ error: "서버 내부 오류가 발생했습니다.", message: error.message }, { status: 500 });
  }
}
