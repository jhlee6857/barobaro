import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { provider_token } = await req.json();

    if (!provider_token) {
      return NextResponse.json({ error: 'provider_token is required' }, { status: 400 });
    }

    const kakaoRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: 'property_keys=["kakao_account.phone_number","kakao_account.name"]'
    });

    const data = await kakaoRes.json();
    
    if (!kakaoRes.ok) {
      console.error('Kakao API error:', data);
      return NextResponse.json({ error: 'Failed to fetch from Kakao API' }, { status: kakaoRes.status });
    }

    const phone = data.kakao_account?.phone_number;
    const name = data.kakao_account?.name;

    return NextResponse.json({ phone, name });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
