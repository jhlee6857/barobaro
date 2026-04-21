import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // 채널톡 웹훅 이벤트 타입 확인
    // 참고: 실제 채널톡 웹훅 스펙에 따라 필드명이 다를 수 있습니다.
    if (payload.type !== 'chat.message' && payload.type !== 'user_chat.message') {
      return NextResponse.json({ message: 'Ignored event' });
    }

    const message = payload.entity || payload.message;
    const userChatId = payload.userChatId || message?.userChatId;

    // 관리자(manager)가 보낸 메시지만 답변으로 등록
    if (message?.personType !== 'manager') {
      return NextResponse.json({ message: 'Not a manager message' });
    }

    const replyContent = message?.body;

    if (!userChatId || !replyContent) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // 1. 해당 userChatId를 가진 원본 문의글 찾기
    const { data: parentInquiry, error: searchError } = await supabase
      .from('inquiries')
      .where('channel_talk_chat_id', 'eq', userChatId)
      .single();

    // supabase v2 style:
    // .from('inquiries').select('*').eq('channel_talk_chat_id', userChatId).single();
    
    const { data: inquiry, error: fetchError } = await supabase
      .from('inquiries')
      .select('id, title')
      .eq('channel_talk_chat_id', userChatId)
      .eq('is_reply', false)
      .single();

    if (fetchError || !inquiry) {
      console.error('Inquiry not found for chat:', userChatId);
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    // 2. 답변 등록 (is_reply: true)
    const { error: insertError } = await supabase
      .from('inquiries')
      .insert({
        title: `RE: ${inquiry.title}`,
        author: '관리자',
        password: 'admin', // 시스템 자동 등록용 임시 비밀번호
        is_reply: true,
        parent_id: inquiry.id,
        details: {
          content: replyContent,
          source: 'channel_talk'
        }
      });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
