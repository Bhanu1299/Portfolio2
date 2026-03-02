import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function LightBulbToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isLight = theme === "light";
  const bulbRef = useRef<HTMLDivElement>(null);
  const stringControls = useAnimation();
  const [isPulling, setIsPulling] = useState(false);

  const pullY = useMotionValue(0);
  const stringLength = useTransform(pullY, [0, 40], [40, 80]);

  // Update CSS custom properties for the radial reveal
  useEffect(() => {
    if (bulbRef.current && isTransitioning) {
      const rect = bulbRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y)
      );

      document.documentElement.style.setProperty("--reveal-x", `${x}px`);
      document.documentElement.style.setProperty("--reveal-y", `${y}px`);

      // Animate the reveal size
      const startTime = performance.now();
      const duration = 800;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const size = eased * (maxDist + 100);
        document.documentElement.style.setProperty("--reveal-size", `${size}px`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      document.documentElement.style.setProperty("--reveal-size", "0px");
      requestAnimationFrame(animate);
    }
  }, [isTransitioning]);

  const handlePull = useCallback(() => {
    if (isTransitioning) return;
    setIsPulling(true);

    // Springy pull animation
    stringControls.start({
      y: [0, 35, -8, 4, 0],
      transition: {
        duration: 0.45,
        times: [0, 0.35, 0.6, 0.8, 1],
        ease: "easeOut",
      },
    });

    // Toggle at the peak of the pull
    setTimeout(() => {
      toggleTheme();
      setIsPulling(false);
    }, 150);
  }, [toggleTheme, stringControls, isTransitioning]);

  return (
    <>
      {/* Accessible hidden toggle */}
      <button
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
        aria-label="Toggle theme"
        onClick={handlePull}
      >
        Toggle theme
      </button>

      {/* Hanging light bulb */}
      <div className="fixed top-0 right-8 z-[70] flex flex-col items-center select-none sm:right-12">
        {/* Cord from ceiling */}
        <div
          className={`w-[2px] h-6 transition-colors duration-500 ${
            isLight ? "bg-slate-400" : "bg-slate-600"
          }`}
        />

        {/* Fixture / mount */}
        <div
          className={`w-5 h-3 rounded-b-md transition-colors duration-500 ${
            isLight ? "bg-slate-500" : "bg-slate-600"
          }`}
        />

        {/* Bulb */}
        <motion.div
          ref={bulbRef}
          className="relative cursor-pointer"
          onClick={handlePull}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-4 rounded-full pointer-events-none"
            animate={{
              opacity: isLight ? 0.6 : 0,
              scale: isLight ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.1) 50%, transparent 70%)",
            }}
          />

          {/* Outer glow halo */}
          <motion.div
            className="absolute -inset-8 rounded-full pointer-events-none"
            animate={{
              opacity: isLight ? 0.3 : 0,
              scale: isLight ? [1, 1.1, 1] : 0.8,
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 60%)",
            }}
          />

          {/* Bulb SVG */}
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none" className="relative z-10">
            {/* Bulb body */}
            <motion.path
              d="M14 2C8.477 2 4 6.477 4 12c0 3.5 1.8 6.5 4.5 8.3.8.5 1.5 1.5 1.5 2.7v1h8v-1c0-1.2.7-2.2 1.5-2.7C22.2 18.5 24 15.5 24 12c0-5.523-4.477-10-10-10z"
              animate={{
                fill: isLight ? "#FCD34D" : "#374151",
                stroke: isLight ? "#F59E0B" : "#4B5563",
              }}
              transition={{ duration: 0.4 }}
              strokeWidth="1.5"
            />
            {/* Filament */}
            <motion.path
              d="M11 10c0 0 1.5 2 3 0s1.5 2 3 0"
              animate={{
                stroke: isLight ? "#F59E0B" : "#6B7280",
                opacity: isLight ? 1 : 0.3,
              }}
              transition={{ duration: 0.4 }}
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Base rings */}
            <motion.rect
              x="8" y="25" width="12" height="2" rx="0.5"
              animate={{ fill: isLight ? "#9CA3AF" : "#6B7280" }}
              transition={{ duration: 0.4 }}
            />
            <motion.rect
              x="9" y="28" width="10" height="2" rx="0.5"
              animate={{ fill: isLight ? "#9CA3AF" : "#6B7280" }}
              transition={{ duration: 0.4 }}
            />
            {/* Bottom tip */}
            <motion.path
              d="M10 30 L14 34 L18 30"
              animate={{ fill: isLight ? "#9CA3AF" : "#6B7280" }}
              transition={{ duration: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Pull string */}
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={handlePull}
          animate={stringControls}
        >
          {/* String */}
          <motion.div
            className={`w-[1.5px] transition-colors duration-500 ${
              isLight ? "bg-slate-400" : "bg-slate-600"
            }`}
            style={{ height: stringLength }}
          />
          {/* Pull bead */}
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
              isLight
                ? "bg-amber-200 border-amber-400 shadow-sm shadow-amber-300/50"
                : "bg-slate-700 border-slate-500"
            }`}
            whileHover={{ scale: 1.3 }}
            animate={isPulling ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </>
  );
}