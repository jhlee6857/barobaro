import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정 (Service Role Key 사용 권장)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CHANNEL_TALK_API_URL = 'https://api.channel.io/open/v5';

export async function POST(req: Request) {
  try {
    const { inquiryId, data } = await req.json();

    if (!inquiryId || !data) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    const channelId = process.env.CHANNEL_TALK_CHANNEL_ID;
    const apiKey = process.env.CHANNEL_TALK_API_KEY;
    const apiSecret = process.env.CHANNEL_TALK_API_SECRET;

    if (!channelId || !apiKey || !apiSecret) {
      console.warn('Channel Talk API credentials are missing');
      return NextResponse.json({ error: 'API credentials missing' }, { status: 500 });
    }

    // 1. 채널톡 유저 생성 및 업데이트 (또는 조회)
    // 이름과 연락처를 기반으로 유저를 식별합니다.
    const userResponse = await fetch(`${CHANNEL_TALK_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-key': apiKey,
        'x-access-secret': apiSecret,
      },
      body: JSON.stringify({
        profile: {
          name: data.author,
          mobileNumber: data.details?.phone,
          email: data.details?.email,
        },
      }),
    });

    const userData = await userResponse.json();
    const userChatId = userData?.user?.id; // 실제로는 userChat을 생성해야 함

    // 2. 유저 챗(User Chat) 생성
    const chatResponse = await fetch(`${CHANNEL_TALK_API_URL}/users/${userChatId}/user-chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-key': apiKey,
        'x-access-secret': apiSecret,
      },
    });

    const chatData = await chatResponse.json();
    const chatId = chatData?.userChat?.id;

    if (!chatId) {
      throw new Error('Failed to create Channel Talk user chat');
    }

    // 3. 문의 내용을 첫 메시지로 전송
    const messageContent = `
[새로운 견적 문의가 접수되었습니다]
- 제목: ${data.title}
- 작성자: ${data.author}
- 연락처: ${data.details?.phone}
- 이메일: ${data.details?.email}
- 건물명: ${data.details?.buildingName}
- 유형: ${data.details?.buildingType}
- 문제점: ${data.details?.mainProblem}
----------------------------------
관리자 페이지에서 확인하거나 이 채팅에 답변해주세요.
    `.trim();

    await fetch(`${CHANNEL_TALK_API_URL}/user-chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-key': apiKey,
        'x-access-secret': apiSecret,
      },
      body: JSON.stringify({
        body: messageContent,
        type: 'text',
      }),
    });

    // 4. Supabase DB에 channel_chat_id 채우기
    await supabase
      .from('inquiries')
      .update({ channel_talk_chat_id: chatId })
      .eq('id', inquiryId);

    return NextResponse.json({ success: true, chatId });
  } catch (error: any) {
    console.error('Channel Talk Sync Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
