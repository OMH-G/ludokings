import { Stripe } from 'stripe';
// import { buffer } from 'micro';
import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2020-08-27',
// });
import { NextRequest, NextResponse } from 'next';

export default async (req) => {
  const { body } = new NextRequest(req);

  if (req.method === 'POST') {
    const { cart } = body;

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [cart],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // Redirect the user to the session URL
      return NextResponse.redirect(session.url, { status: 303 });
    } catch (err) {
      return new NextResponse(err.message, {
        status: err.statusCode || 500,
      });
    }
  } else {
    return new NextResponse('Method Not Allowed', {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    });
  }
};
