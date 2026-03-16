import { useState, useEffect, Suspense } from 'react';
import GenerativeMountainScene from '@/components/ui/mountain-scene';

interface SplashScreenProps {
  children: React.ReactNode;
  /** Duration in ms before the "Enter" button appears */
  buttonDelay?: number;
}

export default function SplashScreen({ children, buttonDelay = 2000 }: SplashScreenProps) {
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Show the "Enter" button after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), buttonDelay);
    return () => clearTimeout(timer);
  }, [buttonDelay]);

  const handleEnter = () => {
    setExiting(true);
    // Wait for fade-out transition to complete before showing main content
    setTimeout(() => setShowContent(true), 800);
  };

  if (showContent) {
    return <>{children}</>;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0f172a] transition-opacity duration-700 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Mountain Animation Background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0f172a]" />}>
          <GenerativeMountainScene />
        </Suspense>
      </div>

      {/* Enter Button */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-[1500ms] ease-out ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={handleEnter}
          className="px-8 py-3 rounded-full border border-sky-300 text-sky-300 text-xl tracking-[0.2em] uppercase font-light transition-all duration-700 hover:tracking-[0.3em] hover:bg-sky-300/10 hover:shadow-[0_0_15px_rgba(125,211,252,0.5)] animate-pulse"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
