// components/Hero/Hero.js
import { useEffect, useRef, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Typed from "typed.js";
import gsap from "gsap";
import { Howl } from "howler";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import Particles from "./Particles/Particles";

// Client-only Spline
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE_URL =
  "https://prod.spline.design/tnfeAtbETRJkZyh4/scene.splinecode?hideWatermark=true";
const BRAND = "#EB7431";

const TYPED_OPTIONS = {
  strings: TYPED_STRINGS,
  typeSpeed: 52,
  backSpeed: 48,
  startDelay: 900,
  backDelay: 3200,
  loop: true,
};

export default function Hero() {
  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const splineWrapRef = useRef(null);
  const glitchRef = useRef(null);

  // Fade-in + stagger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power1.out" } })
        .to(sectionRef.current, { opacity: 1, duration: 0.9 })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, y: 6, duration: 0.5, stagger: 0.18 },
          "<0.1"
        );

      if (splineWrapRef.current) {
        gsap.fromTo(
          splineWrapRef.current,
          { opacity: 0, scale: 0.985, filter: "blur(3px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.0,
            delay: 0.15,
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // typed.js
  useEffect(() => {
    const typed = new Typed(typedElementRef.current, TYPED_OPTIONS);
    return () => typed.destroy();
  }, []);

  // Subtle parallax (rAF-smooth)
  useEffect(() => {
    const el = splineWrapRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0,
      targetY = 0;

    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 12;
      targetY = (e.clientY / window.innerHeight - 0.5) * 12;
      if (!raf) tick();
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      gsap.to(el, {
        x: targetX,
        y: targetY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Wheel/touch forwarding (Spline never traps page scroll)
  useEffect(() => {
    const el = splineWrapRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // do not hijack zoom/gesture
      if (e.ctrlKey) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, behavior: "auto" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    let startY = 0;
    const onTouchStart = (e) => (startY = e.touches[0].clientY);
    const onTouchMove = (e) => {
      const dy = startY - e.touches[0].clientY;
      if (Math.abs(dy) > 2) {
        e.preventDefault();
        window.scrollBy({ top: dy, behavior: "auto" });
      }
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Glitch bursts (CSS Modules-friendly: toggle styles.glitchOn)
  useEffect(() => {
    const node = glitchRef.current;
    if (!node) return;

    let timer = 0;
    const burst = () => {
      node.classList.add(styles.glitchOn);
      setTimeout(() => node.classList.remove(styles.glitchOn), 520);
      timer = setTimeout(burst, 2600 + Math.random() * 2200);
    };
    timer = setTimeout(burst, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className={`${styles.hero} w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative mb-24`}
      style={{ opacity: 0 }}
    >
      {/* typed cursor styling */}
      <style jsx global>{`
        .typed-cursor {
          font-size: 2rem;
          color: ${BRAND};
        }
      `}</style>

      {/* PARTICLES — keep before text so it stays behind */}
      <Particles />

      {/* LEFT — text */}
      <div
        className={`${styles.left} flex flex-col pt-40 md:pt-0 select-none z-10`}
      >
        <h5
          className={`${styles.intro} font-mono font-medium staggered-reveal mb-4`}
        >
          Hi, my name is
        </h5>

        <h1 className={`${styles.heroName} text-white font-semibold`}>
          <span ref={glitchRef} className={`${styles.glitch} staggered-reveal`}>
            <span
              className={`${styles.glitchText} ${styles.emphasize}`}
              data-text="Harshith"
            >
              Harshith
            </span>
          </span>
          <span className="staggered-reveal"> Charugulla </span>
        </h1>

        <p>
          <span
            ref={typedElementRef}
            className="staggered-reveal text-2xl md:text-3xl text-gray-light-3 font-mono leading-relaxed"
          />
        </p>

        <div className="staggered-reveal">
          <Profiles />
        </div>

        <div className="staggered-reveal pt-4">
          <Button href={`#${MENULINKS[4].ref}`} classes="link" type="primary">
            Let&apos;s Talk
          </Button>
        </div>
      </div>

      {/* RIGHT — Spline */}
      <div
        ref={splineWrapRef}
        className={`${styles.splineWrap} hidden lg:block`}
        aria-hidden="true"
      >
        <Spline scene={SCENE_URL} />
      </div>
    </section>
  );
}
