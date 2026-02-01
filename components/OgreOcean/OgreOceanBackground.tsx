import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Three.js to avoid SSR issues
const Ocean = dynamic(() => import('./Ocean'), { ssr: false }) as any;

export default function OgreOceanBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ocean: any;
    let OceanClass: any;
    let cleanup = false;
    (async () => {
      // @ts-ignore
      const mod = await import('./Ocean');
      OceanClass = mod.default;
      if (containerRef.current && !cleanup) {
        ocean = new OceanClass(containerRef.current);
      }
    })();
    return () => {
      cleanup = true;
      if (ocean && ocean.dispose) ocean.dispose();
    };
  }, []);
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
}
