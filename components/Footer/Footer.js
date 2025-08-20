// components/Footer/Footer.js
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./FooterBg/FooterBg.module.scss";
import Meteors from "./Meteors/Meteors";

// Lazy-load Spline client only
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SPLINE_SCENE =
  "https://prod.spline.design/vRgmRBJiVfAG-496/scene.splinecode";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Render the Spline canvas only when footer is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative mt-28">
      {/* Background area with Spline */}
      <div className={`relative overflow-hidden ${styles.bgWrap}`}>
        {/* Optional soft gradient overlay for contrast */}
        <div className={styles.vignette} aria-hidden="true" />

        {/* Only mount Spline when in view */}
        {visible ? (
          <Spline className={styles.splineCanvas} scene={SPLINE_SCENE} />
        ) : (
          <div className={styles.placeholder} />
        )}

        {/* Optional meteors on top of the scene */}
        <div className="pointer-events-none absolute inset-0">
          <Meteors count={16} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-300 text-sm">
            © {year} Harshith Charugulla. All rights reserved.
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="#home" className="link">
              Home
            </Link>
            <Link href="#projects" className="link">
              Projects
            </Link>
            <Link href="#contact" className="link">
              Contact
            </Link>
            <a
              href="mailto:you@example.com"
              className="px-3 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition"
            >
              Let’s Talk
            </a>
          </nav>
        </div>
      </div>

      {/* back-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group fixed bottom-6 right-6 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur hover:border-white/30 transition"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}