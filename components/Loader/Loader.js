import { useEffect, useMemo, useState } from "react";
import styles from "./Loader.module.scss";

const GREETINGS = [
  "Hello",
  "Hola",
  "مرحبا",
  "こんにちは",
  "Bonjour",
  "வணக்கம்",
  "Ciao",
  "హలో",
  "नमस्कार",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "નમસ્તે",
  "ನಮಸ್ಕಾರ",
  "നമസ്കാരം",
  "ନମସ୍କାର",
  "নমস্কার",
  "สวัสดี",
  "안녕하세요",
  "你好",
  "Здравствуйте",
];

const ANIMS = [
  "flipX",
  "flipY",
  "pop",
  "slideUp",
  "slideDown",
  "skew",
  "blurIn",
];

export default function Loader() {
  const [idx, setIdx] = useState(0);
  const letters = useMemo(() => Array.from(GREETINGS[idx] || ""), [idx]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % GREETINGS.length), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={styles.screen}
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-busy="true"
      aria-live="polite"
    >
      {/* hard-centering: width doesn't matter, stays pinned to middle */}
      <div className="center">
        <div className="row" key={idx}>
          {letters.map((ch, i) => {
            const k = ANIMS[(Math.random() * ANIMS.length) | 0];
            return (
              <span
                key={`${idx}-${i}-${ch}`}
                className={`letter ${k}`}
                style={{ ["--d"]: `${i * 45}ms` }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .center {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: max-content; /* keep content width, but always centered */
          text-align: center;
          line-height: 1;
        }

        .row {
          white-space: nowrap;
        }

        .letter {
          display: inline-block;
          font-size: clamp(2.2rem, 6vw, 3.6rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #e7ebde; /* soft, neutral */
          text-shadow: 0 0 8px rgba(167, 139, 250, 0.15);
          animation-duration: 460ms;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
          animation-delay: var(--d, 0ms);
          will-change: transform, opacity, filter;
        }

        /* variants (no horizontal translate to avoid drift) */
        @keyframes kFlipX {
          0% {
            opacity: 0;
            transform: rotateX(70deg) translateY(6px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes kFlipY {
          0% {
            opacity: 0;
            transform: rotateY(70deg) translateY(6px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes kPop {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(6px);
          }
          80% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes kUp {
          0% {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: blur(0);
          }
        }
        @keyframes kDn {
          0% {
            opacity: 0;
            transform: translateY(-14px);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: blur(0);
          }
        }
        @keyframes kSkew {
          0% {
            opacity: 0;
            transform: skewY(-10deg) translateY(6px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes kBlur {
          0% {
            opacity: 0;
            filter: blur(5px) brightness(1.1);
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: none;
          }
        }

        .flipX {
          animation-name: kFlipX;
        }
        .flipY {
          animation-name: kFlipY;
        }
        .pop {
          animation-name: kPop;
        }
        .slideUp {
          animation-name: kUp;
        }
        .slideDown {
          animation-name: kDn;
        }
        .skew {
          animation-name: kSkew;
        }
        .blurIn {
          animation-name: kBlur;
        }

        @media (prefers-reduced-motion: reduce) {
          .letter {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
