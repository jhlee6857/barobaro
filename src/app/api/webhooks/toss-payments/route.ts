import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Toss Payments 웹훅 Payload (가상계좌 입금 완료 시)
    const { status, orderId, paymentKey, amount } = body;

    // 결제 상태가 'DONE' (완료)인 경우에만 처리
    if (status === "DONE") {
      
      // 1. 해당 청구서(Invoice) 정보 조회
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', orderId)
        .single();

      if (invoiceError || !invoice) {
        console.error("해당 청구서를 찾을 수 없습니다:", orderId);
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
      }

      // 이미 결제 완료된 건이면 중복 처리 방지
      if (invoice.status === 'paid') {
        return NextResponse.json({ success: true, message: "Already paid" });
      }

      // 2. 결제 내역(Payments) 테이블에 기록 삽입
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          invoice_id: invoice.id,
          amount_paid: amount || invoice.amount,
          payment_method: 'virtual_account',
          pg_receipt_id: paymentKey,
        }]);

      if (paymentError) {
        console.error("결제 내역 기록 실패:", paymentError);
        return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
      }

      // 3. 청구서(Invoices) 상태를 'paid'(완납)으로 변경
      const { error: updateError } = await supabase
        .from('invoices')
        .update({ status: 'paid' })
        .eq('id', orderId);

      if (updateError) {
        console.error("청구서 상태 업데이트 실패:", updateError);
        return NextResponse.json({ error: "Failed to update invoice status" }, { status: 500 });
      }

      // (선택) 여기서 카카오 알림톡 API를 호출하여 "입금 확인되었습니다" 메시지 발송 가능

      return NextResponse.json({ success: true });
    }

    // 다른 상태(CANCELED, WAITING_FOR_DEPOSIT 등)는 무시하거나 로깅
    return NextResponse.json({ success: true, message: "Ignored status" });

  } catch (error: any) {
    console.error("웹훅 처리 에러:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
