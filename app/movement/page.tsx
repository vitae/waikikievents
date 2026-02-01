'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import OgreOceanBackground to avoid SSR issues
const OgreOceanBackground = dynamic(() => import('../../components/OgreOcean/OgreOceanBackground'), { ssr: false });
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Show success if redirected with ?payment=success
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('payment') === 'success') {
        setMessage('Payment Success! Thank you 🙏');
        setTimeout(() => {
          document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Network/API error:', text);
        setMessage('Server error: ' + text);
        setLoading(false);
        return;
      }

      const { clientSecret, error } = await res.json();

      if (error) {
        console.error('Stripe API error:', error);
        setMessage('Stripe error: ' + error);
        setLoading(false);
        return;
      }

      // Submit PaymentElement data before confirming payment
      try {
        await elements.submit();
      } catch (submitError: any) {
        setMessage('Error submitting payment details: ' + (submitError.message || submitError.toString()));
        setLoading(false);
        return;
      }

      // Always set return_url for compatibility with Cash App Pay and other redirect-based methods
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + "/movement?payment=success",
        },
        redirect: 'if_required',
      });

      // Log the full result for debugging
      console.log('Stripe confirmPayment result:', result);

      if (result.error) {
        console.error('PaymentElement error:', result.error);
        setMessage('Payment failed: ' + (result.error.message || 'Unknown error'));
      } else if (result.paymentIntent?.status === 'succeeded') {
        setMessage('Payment successful! Thank you 🙏');
      } else if (result.paymentIntent) {
        setMessage('Payment status: ' + result.paymentIntent.status + '\n' + JSON.stringify(result.paymentIntent, null, 2));
      } else {
        setMessage('No error, but no PaymentIntent returned. Full result: ' + JSON.stringify(result, null, 2));
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setMessage('Unexpected error: ' + (err.message || err.toString()));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
      <div className="w-full flex flex-col items-center">
        <label className="block text-sm mb-2 text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.6)] text-center">Number of Tickets</label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="max-w-xs rounded-2xl bg-black/10 border border-red-500/50 p-4 text-white focus:border-red-400 focus:outline-none transition shadow-[0_0_15px_rgba(255,0,0,0.3)] appearance-none"
          style={{ textAlignLast: 'center' }}
        >
          {[1, 2, 3, 4, 5].map((q) => (
            <option key={q} value={q}>
              {q} × $9
            </option>
          ))}
        </select>
      </div>


      <div className="w-full">
        <div className="p-5 rounded-2xl border border-red-500/50 bg-black/10 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
          <PaymentElement options={{
            wallets: {
              applePay: 'auto',
              googlePay: 'auto',
            }
          }} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-2xl rounded-full shadow-lg shadow-red-500/40 border border-white/20 hover:from-red-500 hover:to-red-400 transition disabled:opacity-50 uppercase"
      >
        {loading ? 'PROCESSING…' : 'BUY TICKETS'}
      </button>

      {message && (
        <p className="text-red-500 text-sm mt-2 text-center bg-black/10 px-4 py-2 rounded-xl border border-red-500/50">{message}</p>
      )}
    </form>
  );
}


export default function MovementPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      {/* Animated Ocean Background */}
      <OgreOceanBackground />

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'night',
              variables: { 
                colorPrimary: '#ef4444',
                fontFamily: 'Jost, sans-serif',
              },
            },
          }}
        >
          {/* EDM FLYER STYLE */}
          <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8 font-['Jost'] select-none">
            {/* Glassmorphic Flyer Container */}
            <div className="w-full max-w-md bg-black/10 border border-red-500/50 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_30px_rgba(255,0,0,0.4)]">
              
              {/* Top Accent Bar */}
              <div className="h-1 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
              
              {/* Header */}
              <div className="px-6 pt-8 pb-4 text-center border-b border-white/10">
                <p className="text-red-500 text-base tracking-[0.3em] uppercase mb-2">Waikiki Events Presents</p>
                <h1 className="text-[2.75rem] sm:text-5xl font-black text-white leading-tight drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                  MOVEMENT MONDAYS
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="h-px w-12 bg-red-500/50" />
                  <span className="text-red-500 text-base">✦ SUNSET SESSIONS ✦</span>
                  <span className="h-px w-12 bg-red-500/50" />
                </div>
              </div>

              {/* Event Details */}
              <div className="px-6 py-6 text-center space-y-5">
                <div className="inline-block px-6 py-3 border border-red-500/50 rounded-2xl bg-black/10 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                  <p className="text-[1.625rem] sm:text-[2rem] font-bold text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">EVERY WEEK</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-4xl sm:text-6xl text-white font-semibold pt-2 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">🕉️ Yoga</p>
                  <p className="text-white font-bold text-3xl sm:text-5xl drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">5:30 PM</p>
                </div>

                <div className="pt-2">
                  <p className="text-white font-bold text-2xl drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">📍 Le'ahi Beach Park</p>
                  <p className="text-white text-lg drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">Waikiki, Honolulu</p>
                </div>

                <div className="space-y-1 text-lg text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
                  <p>🧘‍♀️ Bring a mat</p>
                  <p>💧 Bring water</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-2xl rounded-full shadow-lg shadow-red-500/40 border border-white/20 hover:from-red-500 hover:to-red-400 transition cursor-pointer"
                  >
                      TICKETS ONLY $9
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center px-6">
                <span className="flex-1 h-px bg-red-500" />
                <span className="px-4 text-red-500 text-base uppercase tracking-wider">Support the Movement</span>
                <span className="flex-1 h-px bg-red-500" />
              </div>

              {/* Payment Section */}
              <div id="payment-section" className="mx-4 my-6 p-6 rounded-2xl bg-black/10 border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                <CheckoutForm />
              </div>

              {/* Tagline and Copyright inside flyer border */}
              <div className="px-6 pb-4 text-center">
                <p className="mt-6 text-white text-sm tracking-wider drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
                  Ancient wisdom. Aloha spirit.
                </p>
                <p className="mt-2 text-white text-xs tracking-wider drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
                  © 2026 Waikiki Events. All Rights Reserved.
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            </div>
          </main>
        </Elements>
      )}
    </>
  );
}
