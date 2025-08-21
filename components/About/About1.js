// components/About/About1.js
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About1 = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const line1 = quoteRef.current.querySelector(".about-1");
      const line2 = quoteRef.current.querySelector(".about-2");
      const glow = quoteRef.current.querySelector(".about-glow");

      // Initial states
      gsap.set(line1, { opacity: 1, y: 0 });
      gsap.set(line2, { opacity: 0.45, y: 0 });
      gsap.set(glow, { opacity: 0, scale: 0.96, filter: "blur(10px)" });

      // One-time soft entrance
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(glow, {
          opacity: 0.28,
          scale: 1,
          filter: "blur(12px)",
          duration: 0.45,
        })
        .to(glow, { opacity: 0, duration: 0.4 });

      // Crossfade emphasis while scrolling this section
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center 80%",
            end: "center 20%",
            scrub: 0.4,
          },
        })
        .to(line1, { opacity: 0.45 }, 0)
        .to(line2, { opacity: 1 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    document
      .querySelector("#skills")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="w-full relative select-none">
      <div
        className={`${
          clientHeight > 650 ? "pt-28 pb-16" : "pt-80 pb-72"
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className="font-normal text-[2.2rem] md:text-6xl lg:text-[3.6rem] text-center leading-snug relative"
        >
          {/* LINE 1 */}
          <span className="about-1 leading-tight relative inline-block">
            <span className="about-glow" aria-hidden="true" />
            I&apos;m a{" "}
            <span
              className="role-gradient role-interactive font-semibold"
              aria-label="Full Stack Developer"
              title="Full Stack Developer"
            >
              Full Stack Developer
            </span>{" "}
            crafting scalable microservices and seamless web &amp; apps.
          </span>

          {/* LINE 2 */}
          <span className="about-2 leading-tight block mt-6 text-gray-300">
            Turning data into AI-powered, real-time products that drive
            decisions.
          </span>
        </h1>

        {/* Optional scroll indicator — uncomment to use */}
        {/*
        <button
          className="scroll-indicator"
          onClick={scrollToNext}
          aria-label="Scroll to skills"
        >
          <span className="scroll-dot" />
        </button>
        */}
      </div>

      <style jsx>{`
        /* --- Highlighted role text (clean gradient + shine + underline) --- */
        .role-gradient {
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
          position: relative;
          transition: background-position 520ms ease, transform 260ms ease,
            letter-spacing 260ms ease;
        }


        /* Subtle “shine” sweep using background-position + light lift */
        .role-interactive:hover,
        .role-interactive:focus-visible {
          background-position: 120% 0%;
          transform: translateY(-1px);
          letter-spacing: 0.3px;
        }


        .about-1 {
          position: relative;
        }
        .about-glow {
          position: absolute;
          inset: -16% -6% -18% -6%;
          border-radius: 24px;
          background: radial-gradient(
              40% 70% at 20% 60%,
              rgba(235, 116, 49, 0.2),
              transparent 70%
            ),
            radial-gradient(
              60% 90% at 60% 40%,
              rgba(235, 116, 49, 0.12),
              transparent 75%
            );
          filter: blur(12px);
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }

        /* Optional scroll indicator */
        .scroll-indicator {
          position: absolute;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          width: 36px;
          height: 56px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-radius: 22px;
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          transition: border-color 160ms ease, box-shadow 160ms ease,
            transform 160ms ease;
        }
        .scroll-indicator:hover {
          border-color: rgba(235, 116, 49, 0.8);
          box-shadow: 0 0 24px rgba(235, 116, 49, 0.28);
          transform: translateX(-50%) translateY(-2px);
        }
        .scroll-dot {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 999px;
          margin-top: 10px;
          animation: bounce 1.4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.85;
          }
          50% {
            transform: translateY(18px);
            opacity: 0.35;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default About1;
