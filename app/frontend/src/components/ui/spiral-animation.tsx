import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Full-screen spiral animation component used as a splash screen backdrop.
 * Draws an animated spiral pattern on a canvas using GSAP for smooth animation.
 */
export function SpiralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width: number;
    let height: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Animation state
    const state = { rotation: 0, scale: 1, opacity: 0 };

    // Fade in
    gsap.to(state, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Continuous rotation
    gsap.to(state, {
      rotation: Math.PI * 200,
      duration: 200,
      ease: "none",
      repeat: -1,
    });

    // Gentle breathing scale
    gsap.to(state, {
      scale: 1.15,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const drawSpiral = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.42;
      const arms = 5;
      const totalPoints = 300;

      for (let arm = 0; arm < arms; arm++) {
        const armOffset = (arm / arms) * Math.PI * 2;

        ctx.beginPath();
        for (let i = 0; i < totalPoints; i++) {
          const t = i / totalPoints;
          const angle = t * Math.PI * 8 + state.rotation * 0.005 + armOffset;
          const radius = t * maxRadius * state.scale;

          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const gradient = ctx.createLinearGradient(
          cx - maxRadius,
          cy - maxRadius,
          cx + maxRadius,
          cy + maxRadius
        );
        gradient.addColorStop(0, `rgba(99, 102, 241, ${0.6 * state.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 * state.opacity})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, ${0.2 * state.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Central glow
      const glowGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      glowGradient.addColorStop(0, `rgba(99, 102, 241, ${0.3 * state.opacity})`);
      glowGradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.1 * state.opacity})`);
      glowGradient.addColorStop(1, "transparent");

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      // Floating particles
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 + state.rotation * 0.002;
        const dist = 60 + Math.sin(state.rotation * 0.01 + i * 0.5) * 200;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        const size = 1 + Math.sin(state.rotation * 0.02 + i) * 0.8;
        const alpha = (0.3 + Math.sin(state.rotation * 0.015 + i * 0.8) * 0.2) * state.opacity;

        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawSpiral);
    };

    drawSpiral();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      gsap.killTweensOf(state);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
