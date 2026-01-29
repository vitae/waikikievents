'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import GlassNav from '@/components/GlassNav';
import BottomNav from '@/components/BottomNav';

/* ═══════════════════════════════════════════════════════════════════════════════
   VITAEGIS - Main Page
   Native iOS App Experience with Preloading & Optimistic UI
   ═══════════════════════════════════════════════════════════════════════════════ */

// Simple skeleton component inline to avoid import issues
function SkeletonHero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-40 h-8 rounded-full mb-6 bg-white/5 animate-pulse" />
      <div className="w-64 sm:w-80 h-12 sm:h-16 rounded-lg mb-4 bg-white/5 animate-pulse" />
      <div className="w-32 h-px mb-8 bg-white/5" />
      <div className="w-full max-w-md h-48 rounded-2xl bg-white/5 animate-pulse" />
    </div>
  );
}

function SkeletonSection({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="w-36 h-5 bg-white/5 animate-pulse rounded" />
        <div className="w-20 h-4 bg-white/5 animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-40 bg-white/5 animate-pulse rounded-xl" />
        <div className="h-40 bg-white/5 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}

// Dynamic imports with skeleton loading states
const MatrixBackground = dynamic(() => import('@/components/MatrixBackgroundPro'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <SkeletonHero />,
});

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <SkeletonSection className="min-h-screen p-8" />,
});

const PracticesSection = dynamic(() => import('@/components/sections/PracticesSection'), {
  loading: () => <SkeletonSection className="min-h-screen p-8" />,
});

const TokenSection = dynamic(() => import('@/components/sections/TokenSection'), {
  loading: () => <SkeletonSection className="min-h-screen p-8" />,
});

const CommunitySection = dynamic(() => import('@/components/sections/CommunitySection'), {
  loading: () => <SkeletonSection className="min-h-screen p-8" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32" />,
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Waikiki Events</h1>
      <p className="text-lg">Welcome! This is a minimal test page. If you see this, your deployment is working.</p>
    </div>
  );
}
