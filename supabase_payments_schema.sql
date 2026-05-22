-- 관리비 가상계좌 및 결제 시스템을 위한 Supabase 테이블 생성 스크립트
-- 이 스크립트를 Supabase Dashboard -> SQL Editor 에 복사하여 실행하세요.

-- 1. 청구서(Invoices) 테이블
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resident_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    building_id UUID REFERENCES public.buildings(id) ON DELETE CASCADE,
    billing_month VARCHAR(10) NOT NULL, -- 예: '2026-05'
    amount INTEGER NOT NULL, -- 청구 금액
    status VARCHAR(20) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'pending', 'paid', 'overdue')),
    virtual_account_bank VARCHAR(50),
    virtual_account_number VARCHAR(100),
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 결제 내역(Payments) 테이블
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    amount_paid INTEGER NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 예: 'virtual_account'
    pg_receipt_id VARCHAR(255), -- PG사 거래 번호 (Toss Payments paymentKey)
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS 정책 설정 (Row Level Security)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 관리자는 모든 데이터 접근 가능
CREATE POLICY "Admins can view all invoices" ON public.invoices FOR SELECT USING (
  (auth.jwt() ->> 'email') LIKE '%@baro-manage.com' OR 
  (auth.jwt() ->> 'email') LIKE '%@barobm.co.kr'
);

CREATE POLICY "Admins can modify all invoices" ON public.invoices FOR ALL USING (
  (auth.jwt() ->> 'email') LIKE '%@baro-manage.com' OR 
  (auth.jwt() ->> 'email') LIKE '%@barobm.co.kr'
);

CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT USING (
  (auth.jwt() ->> 'email') LIKE '%@baro-manage.com' OR 
  (auth.jwt() ->> 'email') LIKE '%@barobm.co.kr'
);

-- 입주민은 본인의 청구서만 접근 가능
CREATE POLICY "Residents can view own invoices" ON public.invoices FOR SELECT USING (
  auth.uid() = resident_id
);

CREATE POLICY "Residents can view own payments" ON public.payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.invoices WHERE invoices.id = payments.invoice_id AND invoices.resident_id = auth.uid()
  )
);

-- 4. 업데이트 트리거 (updated_at 자동 갱신)
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_invoices_modtime
BEFORE UPDATE ON public.invoices
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 초기 테스트용 샘플 데이터 추가 (필요시 주석 해제)
-- INSERT INTO public.invoices (resident_id, building_id, billing_month, amount, due_date)
-- VALUES ('<테스트_입주민_UUID>', '<테스트_건물_UUID>', '2026-05', 55000, '2026-05-25');
