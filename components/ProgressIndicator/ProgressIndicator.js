import { useEffect, useRef } from "react";

const ProgressIndicator = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const total = Math.max(1, el.scrollHeight - window.innerHeight);
      const y =
        window.scrollY ??
        window.pageYOffset ??
        el.scrollTop ??
        0;

      const scrolled = Math.min(1, Math.max(0, y / total));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${scrolled})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // render once

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[9999] pointer-events-none"
      style={{ top: "max(env(safe-area-inset-top), 0px)" }}
    >
      {/* track */}
      <div className="mx-auto h-[4px] w-full bg-white/10 rounded-full">
        {/* bar */}
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 rounded-full"
          style={{
            transformOrigin: "left",
            transition: "transform 80ms linear",
            background:
              "linear-gradient(90deg, #ec4899, #8b5cf6, #22d3ee)",
            boxShadow: "0 0 12px rgba(139,92,246,0.45)",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;