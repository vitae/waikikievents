
'use client';
import { useState } from 'react';

export default function MovementPage() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-8">
      <div className="w-full max-w-md bg-black/10 border border-red-500/50 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_30px_rgba(255,0,0,0.4)]">
        <div className="h-1 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
        <div className="px-6 pt-8 pb-4 text-center border-b border-white/10">
          <p className="text-red-500 text-base tracking-[0.3em] uppercase mb-2">VITAEGIS Presents</p>
          <h1 className="text-[2.75rem] sm:text-5xl font-black text-white leading-tight drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
            MOVEMENT
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-red-500/50" />
            <span className="text-red-500 text-base">✦ SUNSET SESSIONS ✦</span>
            <span className="h-px w-12 bg-red-500/50" />
          </div>
        </div>
        <div className="px-6 py-6 text-center space-y-5">
          <div className="inline-block px-6 py-3 border border-red-500/50 rounded-2xl bg-black/10 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
            <p className="text-[1.625rem] sm:text-[2rem] font-bold text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">EVERY WEEK</p>
          </div>
          <div className="space-y-4">
            <p className="text-2xl sm:text-3xl text-white font-semibold drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">🧘 Movement</p>
            <p className="text-white font-bold text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">4:30 PM</p>
            <p className="text-2xl sm:text-3xl text-white font-semibold pt-2 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">🕉️ Yoga</p>
            <p className="text-white font-bold text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">5:30 PM</p>
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
            <button className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-2xl rounded-full shadow-lg shadow-red-500/40 border border-white/20 hover:from-red-500 hover:to-red-400 transition cursor-pointer">
              TICKETS ONLY $9
            </button>
          </div>
        </div>
        <div className="flex items-center px-6">
          <span className="flex-1 h-px bg-red-500" />
          <span className="px-4 text-red-500 text-base uppercase tracking-wider">Support the Movement</span>
          <span className="flex-1 h-px bg-red-500" />
        </div>
        <div className="mx-4 my-6 p-6 rounded-2xl bg-black/10 border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
          <form className="flex flex-col items-center gap-4 w-full">
            <div className="w-full flex flex-col items-center">
              <label className="block text-sm mb-2 text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)] text-center">Number of Tickets</label>
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
            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-2xl rounded-full shadow-lg shadow-red-500/40 border border-white/20 hover:from-red-500 hover:to-red-400 transition disabled:opacity-50 uppercase"
            >
              BUY TICKETS
            </button>
          </form>
        </div>
        <div className="px-6 pb-4 text-center">
          <p className="mt-6 text-white text-sm tracking-wider drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
            Ancient wisdom. Aloha spirit.
          </p>
          <p className="mt-2 text-white text-xs tracking-wider drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
            © 2026 VITAEGIS. All Rights Reserved.
          </p>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      </div>
    </div>
  );
}
