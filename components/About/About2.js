// components/About/About2.js
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// ——— rotating words ———
const WORDS = ["pragmatic", "creative", "scalable", "reliable"];

// glyphs used while scrambling
const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%*";

export default function About2({ clientHeight }) {
  const sectionRef = useRef(null);
  const sentenceRef = useRef(null);
  const wordWrapRef = useRef(null);
  const cycleTimerRef = useRef(null);
  const idxRef = useRef(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // seed the word
      buildSpans(WORDS[0]);

      // 1) scroll-reveal for the whole sentence (fade + rise)
      gsap.fromTo(
        sentenceRef.current,
        { opacity: 0, y: 22, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // 2) subtle glow on the ORANGE word, eased with scroll
      gsap.fromTo(
        wordWrapRef.current,
        { filter: "drop-shadow(0 0 0 rgba(235,116,49,0))", scale: 0.99 },
        {
          filter: "drop-shadow(0 0 14px rgba(235,116,49,0.22))",
          scale: 1.01,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: true,
          },
        }
      );

      // start/stop cycling based on scroll visibility
      const startCycling = () => {
        stopCycling();
        cycleTimerRef.current = gsap.delayedCall(2.0, nextWord);
      };
      const stopCycling = () => {
        cycleTimerRef.current?.kill?.();
        cycleTimerRef.current = null;
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: startCycling,
        onEnterBack: startCycling,
        onLeave: stopCycling,
        onLeaveBack: stopCycling,
      });

      function nextWord() {
        idxRef.current = (idxRef.current + 1) % WORDS.length;
        morphTo(WORDS[idxRef.current], () => {
          cycleTimerRef.current = gsap.delayedCall(2.0, nextWord);
        });
      }

      // build per-letter spans for the word
      function buildSpans(word) {
        const wrap = wordWrapRef.current;
        wrap.innerHTML = "";
        for (let i = 0; i < word.length; i++) {
          const ch = word[i] === " " ? "\u00A0" : word[i];
          const span = document.createElement("span");
          span.className = "glitch-char";
          span.textContent = ch;
          span.setAttribute("data-char", ch); // for ghost layers
          wrap.appendChild(span);
        }
      }

      // glitch-morph current letters into target word
      function morphTo(targetWord, onDone) {
        const wrap = wordWrapRef.current;
        const existing = wrap.querySelectorAll(".glitch-char");

        if (existing.length !== targetWord.length) {
          buildSpans(targetWord.replace(/ /g, " "));
        }

        const spans = wrap.querySelectorAll(".glitch-char");
        wrap.classList.add("is-glitching"); // intensify glow + chroma ghosts

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onComplete: () => {
            wrap.classList.remove("is-glitching");
            // tiny snap when it locks
            gsap
              .timeline()
              .to(wrap, { scale: 1.035, duration: 0.12, ease: "power2.out" })
              .to(wrap, { scale: 1, duration: 0.18, ease: "power2.inOut" });
            onDone?.();
          },
        });

        for (let i = 0; i < spans.length; i++) {
          const span = spans[i];
          const finalChar = targetWord[i] === " " ? "\u00A0" : targetWord[i];
          const dur = 0.5 + Math.random() * 0.25;
          const state = { p: 0 };

          tl.to(
            state,
            {
              p: 1,
              duration: dur,
              onUpdate: () => {
                if (state.p < 0.7) {
                  const rnd =
                    GLITCH_CHARS[(Math.random() * GLITCH_CHARS.length) | 0];
                  span.textContent = rnd;
                  span.setAttribute("data-char", rnd);
                } else {
                  span.textContent = finalChar;
                  span.setAttribute("data-char", finalChar);
                }
              },
            },
            i * 0.02 // letter stagger
          );
        }

        // tiny settle jitter
        tl.to(
          wrap,
          { x: 0.4, y: -0.4, duration: 0.04, yoyo: true, repeat: 1 },
          "-=0.25"
        );
      }
    }, sectionRef);

    return () => {
      cycleTimerRef.current?.kill?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative select-none">
      <div
        className={`${
          clientHeight > 650 ? "py-80" : "py-72"
        } section-container`}
      >
        <h1
          ref={sentenceRef}
          className="font-medium text-[2.7rem] md:text-6xl lg:text-[4rem] text-center leading-tight"
        >
          I have a{" "}
          <span ref={wordWrapRef} className="glitch-word align-baseline" />{" "}
          focus on impact and attention to detail.
        </h1>
      </div>

      <style jsx>{`
        /* The rotating word (always orange) */
        .glitch-word {
          display: inline-block;
          position: relative;
          white-space: pre-wrap;
          padding: 0 2px;
          line-height: inherit;
          will-change: transform, filter, background-position;

          /* orange gradient — visible even when idle */
          background: linear-gradient(
            90deg,
            #eb7431 0%,
            #ffa368 50%,
            #ffd5b3 100%
          );
          background-size: 200% 100%;
          background-position: 0% 0%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          /* subtle idle glow */
          text-shadow: 0 0 6px rgba(235, 116, 49, 0.18);
        }

        .glitch-char {
          position: relative;
          display: inline-block;
          line-height: inherit;
          will-change: transform, filter, opacity;
        }

        /* extra chroma ghosts + stronger glow while glitching */
        .glitch-word.is-glitching {
          text-shadow: 0 0 10px rgba(235, 116, 49, 0.34);
        }
        .glitch-word.is-glitching .glitch-char::before,
        .glitch-word.is-glitching .glitch-char::after {
          content: attr(data-char);
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.55;
          line-height: inherit;
        }
        .glitch-word.is-glitching .glitch-char::before {
          transform: translate(-0.6px, 0);
          color: #48a8ff;
          text-shadow: -0.6px 0 0 #48a8ff;
        }
        .glitch-word.is-glitching .glitch-char::after {
          transform: translate(0.6px, 0);
          color: #ff58a6;
          text-shadow: 0.6px 0 0 #ff58a6;
        }

        @media (prefers-reduced-motion: reduce) {
          .glitch-word.is-glitching .glitch-char::before,
          .glitch-word.is-glitching .glitch-char::after {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
