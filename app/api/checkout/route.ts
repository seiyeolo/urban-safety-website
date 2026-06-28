import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any, // 런타임 호환을 위해 지정
});

export async function POST(req: Request) {
  try {
    // 1. 요청 바디에서 과정 이름이나 가격 정보 수신 (현재는 하드코딩된 Mock 데이터)
    // const body = await req.json();
    
    // 2. Stripe Checkout Session 생성 (Mock URL 반환)
    // 실제로는 stripe.checkout.sessions.create()를 호출하여 세션을 만듭니다.
    const mockSessionUrl = "/dashboard?payment=success&mock=true"; 
    
    // 나중에 실제 키가 들어오면 아래 주석을 해제하여 사용합니다.
    /*
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: { currency: 'krw', product_data: { name: '보이스피싱 예방지도사 과정' }, unit_amount: 50000 },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=cancelled`,
    });
    return NextResponse.json({ url: session.url });
    */

    console.log("[Mock Stripe] 결제 세션 생성 성공 (Mock)");
    return NextResponse.redirect(new URL(mockSessionUrl, req.url));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
