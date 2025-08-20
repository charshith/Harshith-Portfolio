// components/Hero/Particles/Particles.js
import { useEffect, useRef } from "react";

const BRAND = "#EB7431";

export default function Particles({
  densityDesktop = 22, // lower density = fewer dots
  densityMobile = 10,
  maxSpeed = 0.28, // slower drift
}) {
  const ref = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const DPR = Math.min(devicePixelRatio || 1, 2);
    let cw = canvas.offsetWidth;
    let ch = canvas.offsetHeight;
    canvas.width = cw * DPR;
    canvas.height = ch * DPR;
    ctx.scale(DPR, DPR);

    const isMobile = window.innerWidth < 768;
    const density = isMobile ? densityMobile : densityDesktop;

    // ~one particle per N px^2; tuned by density
    const base = Math.max(1, Math.round((cw * ch) / (32000 / density)));

    const rand = (a, b) => a + Math.random() * (b - a);

    const particles = new Array(base).fill(0).map(() => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      vx: rand(-maxSpeed, maxSpeed),
      vy: rand(-maxSpeed, maxSpeed),
      r: rand(0.6, 1.4),
      a: rand(0.12, 0.35), // much softer than before
    }));

    // mouse attractor
    let mx = cw * 0.28;
    let my = ch * 0.34;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    ctx.globalCompositeOperation = "lighter"; // nice glow blends

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);

      for (const p of particles) {
        // gentle attraction toward mouse
        p.vx += (mx - p.x) * 0.00003;
        p.vy += (my - p.y) * 0.00003;

        p.x += p.vx;
        p.y += p.vy;

        // wrap around
        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;
        if (p.y < -10) p.y = ch + 10;
        if (p.y > ch + 10) p.y = -10;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = BRAND;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      const _cw = canvas.offsetWidth;
      const _ch = canvas.offsetHeight;
      cw = _cw;
      ch = _ch;
      canvas.width = cw * DPR;
      canvas.height = ch * DPR;
      ctx.scale(DPR, DPR);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [densityDesktop, densityMobile, maxSpeed]);

  return <canvas ref={ref} className="hero-particles" />;
}
