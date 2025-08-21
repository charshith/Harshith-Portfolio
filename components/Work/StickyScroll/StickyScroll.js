import React, { useState, useRef } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import DotPattern from "../DotPattern/DotPattern";
import { cn } from "utils/cn";

/* panel background */
const backgroundColors = ["#000000"];

/* gradients for the right/preview card */
const linearGradients = [
  "linear-gradient(135deg, #ef008f 0%, #6ec3f4 50%, #9be7ff 100%)",
  "linear-gradient(135deg, #6ec3f4 0%, #7038ff 60%, #c9c9c9 100%)",
  "linear-gradient(135deg, #7038ff 0%, #c9c9c9 60%, #9be7ff 100%)",
];

/** Parse description → bullets (robust: prefers "•" markers) */
function Description({ text }) {
  if (!text) return null;

  const hasBullets = /(^|\n)\s*•\s/.test(text);
  const lines = hasBullets
    ? text
        .split(/^•\s*/gm)
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
    : text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

  return (
    <ul className="mt-4 space-y-3">
      {lines.map((line, i) => (
        <li
          key={i}
          className="relative pl-6 text-lg leading-relaxed text-slate-300"
        >
          <span className="absolute left-0 top-2 block h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(235,116,49,0.6)]" />
          <span className="whitespace-pre-line">{line}</span>
        </li>
      ))}
    </ul>
  );
}

/** Transparent, fixed-size, sticky wrapper (no background box) */
function TiltPreview({ children }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [0, 1], [6, -6]);
  const rotateY = useTransform(mx, [0, 1], [-6, 6]);

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
  }

  return (
    <div className="sticky top-10 h-fit">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-[28rem] h-72 md:h-80 rounded-2xl overflow-visible"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

const StickyScroll = ({ contentItems }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const cardLength = contentItems?.length ?? 0;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!cardLength) return;
    const breakpoints = contentItems.map((_, i) => i / cardLength - 0.1);
    const closest = breakpoints.reduce(
      (acc, p, i) =>
        Math.abs(latest - p) < Math.abs(latest - breakpoints[acc]) ? i : acc,
      0
    );
    setActiveCard(closest);
  });

  const gradient =
    linearGradients[activeCard % linearGradients.length] || linearGradients[0];

  return (
    <div className="relative">
      {/* Background pattern */}
      <DotPattern
        width={22}
        height={22}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "opacity-[0.10] fill-white/10",
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]",
          "rounded-2xl z-0"
        )}
      />

      {/* removed top/bottom fade veils since we're not inner-scrolling */}

      <motion.div
        ref={containerRef}
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className={cn(
          "rounded-2xl outline outline-1 outline-gray-dark-1/50",
          "bg-black/40 backdrop-blur-sm z-10",
          // no inner scroll or height clamp
          "p-6 overflow-visible",
          "grid grid-cols-1 lg:grid-cols-[1fr_28rem] gap-10"
        )}
      >
        {/* Left column (text) */}
        <div className="px-2">
          <div className="max-w-2xl">
            {(contentItems ?? []).map((item, index) => (
              <div key={item.title + index} className="my-10">
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.4, y: 0 }}
                  className="text-3xl font-semibold tracking-tight"
                >
                  <motion.span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg,#ff9a4d,#ffffff,#ff9a4d)",
                      backgroundSize: "200% 100%",
                      backgroundPosition:
                        activeCard === index ? "100% 50%" : "0% 50%",
                    }}
                    whileHover={{ backgroundPosition: "100% 50%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    {item.title}
                  </motion.span>
                </motion.h2>

                {/* All lines -> bullets */}
                <Description text={item.description} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column (sticky, fixed-size preview) */}
        <TiltPreview>{contentItems?.[activeCard]?.content ?? null}</TiltPreview>
      </motion.div>
    </div>
  );
};

export default StickyScroll;
