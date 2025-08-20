// components/Hero/Hero.js
import { useEffect, useRef, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Typed from "typed.js";
import gsap from "gsap";

import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";

// Client-only Spline
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

// Your Spline scene
const SCENE_URL =
  "https://prod.spline.design/tnfeAtbETRJkZyh4/scene.splinecode?hideWatermark=true";

const TYPED_OPTIONS = {
  strings: TYPED_STRINGS,
  typeSpeed: 52,
  backSpeed: 48,
  startDelay: 900,
  backDelay: 3200,
  loop: true,
};

const BRAND = "#EB7431";

export default function Hero() {
  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const splineWrapRef = useRef(null);

  // Fade-in + stagger for text
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

      // Spline block: soft pop-in
      if (splineWrapRef.current) {
        gsap.fromTo(
          splineWrapRef.current,
          { opacity: 0, scale: 0.98, filter: "blur(3px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.0,
            delay: 0.2,
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Typed.js
  useEffect(() => {
    const typed = new Typed(typedElementRef.current, TYPED_OPTIONS);
    return () => typed.destroy();
  }, []);

  // Mouse parallax for the Spline wrapper (subtle)
  useEffect(() => {
    const el = splineWrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12; // range ~ -6..6
      const y = (e.clientY / innerHeight - 0.5) * 12;
      gsap.to(el, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const el = splineWrapRef.current;
    if (!el) return;
  
    const onWheel = (e) => {
      // let the page scroll instead of the canvas blocking it
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, behavior: "auto" });
    };
  
    // must be passive:false to be able to preventDefault
    el.addEventListener("wheel", onWheel, { passive: false });
  
    // (optional) mobile touch scroll forwarding
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

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className={`${styles.hero} w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative mb-24`}
      style={{ opacity: 0 }}
    >
      {/* global tweak for typed cursor */}
      <style jsx global>{`
        .typed-cursor {
          font-size: 2rem;
          color: ${BRAND};
        }
      `}</style>

      {/* LEFT — text */}
      <div
        className={`${styles.left} flex flex-col pt-40 md:pt-0 select-none z-10`}
      >
        <h5
          className={`${styles.intro} font-mono font-medium staggered-reveal`}
        >
          Hi, my name is
        </h5>

        <h1 className={`${styles.heroName} text-white font-semibold`}>
          <span className={`relative ${styles.emphasize} staggered-reveal`}>
            Harshith
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

      {/* RIGHT — Spline scene */}
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
