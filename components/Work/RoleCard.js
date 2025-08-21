import { useRef, useState, useMemo } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "utils/cn";

/**
 * Clean RoleCard (glass, no heavy background)
 *
 * Props:
 *  - title: string
 *  - meta: string  (e.g., "Jan 2025 – Present • San Jose, CA")
 *  - chips: string[]
 *  - icon: string   (emoji)
 *  - gradient: [from, via, to]  // only used to derive an accent color
 *  - className?: string
 */
export default function RoleCard({
  title = "Software Engineer",
  meta = "",
  chips = [],
  icon = "🧭",
  gradient = ["#EB7431", "#F79E63", "#FFCF9F"],
  className,
}) {
  const wrapRef = useRef(null);

  // Accent comes from the first gradient color (per experience)
  const accent = gradient?.[0] ?? "#EB7431";

  // subtle tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const handleMouseMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const tilt = 6;
    rotateX.set((0.5 - py) * tilt);
    rotateY.set((px - 0.5) * tilt);
  };
  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // split meta "date • location"
  const { dateText, locationText } = useMemo(() => {
    if (!meta) return { dateText: "", locationText: "" };
    const parts = meta.split(" • ");
    return { dateText: parts[0] ?? meta, locationText: parts[1] ?? "" };
  }, [meta]);

  // chip click pulse / toggle
  const [activeChip, setActiveChip] = useState(null);
  const [activeMeta, setActiveMeta] = useState({ date: false, loc: false });
  const toggleMeta = (key) => setActiveMeta((s) => ({ ...s, [key]: !s[key] }));
  const onChipClick = (i) => {
    setActiveChip((prev) => (prev === i ? null : i)); // toggle
    // optional auto reset – uncomment if you want it to always reset after a moment
    // setTimeout(() => setActiveChip(null), 700);
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className={cn("relative h-64 w-[28rem] mx-auto", className)}
    >
      {/* Glass card — no heavy fill */}
      <div
        className={cn(
          "relative h-full w-full rounded-[1rem] overflow-hidden",
          "bg-white/5 backdrop-blur-md",
          "border border-white/10 shadow-[0_8px_36px_rgba(0,0,0,0.35)]"
        )}
        style={{ transform: "translateZ(24px)" }}
      >
        <div className="relative z-10 h-full w-full grid place-items-center p-6">
          <div className="text-center">
            {/* Title + playful icon */}
            {/* Title + playful icon with flowing gradient text */}
            <motion.div
              className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center justify-center gap-2"
              whileHover="hover"
            >
              <motion.span
                variants={{ hover: { y: [-2, 2, -2], rotate: [0, 2, -2, 0] } }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              >
                {icon}
              </motion.span>

              {/* flowing gradient text */}
              <motion.span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#ffb37a,#ffffff,#ffb37a)", // warm orange ↔ white
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 50%",
                }}
                whileHover={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              >
                {title}
              </motion.span>
            </motion.div>

            {/* Meta row: DISTINCT styles */}
            {(dateText || locationText) && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {/* Date = filled translucent + ring on hover */}
                {/* Date = filled translucent; orange pulse on hover/click (same vibe as chips) */}
                {dateText && (
                  <motion.span
                    onClick={() => toggleMeta("date")}
                    whileHover={{
                      y: -1,
                      boxShadow: `0 8px 24px rgba(0,0,0,0.18), 0 0 0 2px ${accent}66`,
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-[6px] rounded-full text-[0.93rem] font-medium cursor-pointer select-none"
                    style={{
                      color: "#fff",
                      backgroundColor: activeMeta.date
                        ? `${accent}E6` // strong fill when active
                        : "rgba(255,255,255,0.12)", // subtle glass when idle
                      border: `1px solid ${
                        activeMeta.date ? "transparent" : `${accent}66`
                      }`,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {dateText}
                  </motion.span>
                )}

                {/* Location = outlined; fills slightly on hover; orange when active */}
                {locationText && (
                  <motion.span
                    onClick={() => toggleMeta("loc")}
                    whileHover={{
                      y: -1,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      boxShadow: `0 0 0 2px ${accent}66`,
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-[6px] rounded-full text-[0.93rem] cursor-pointer select-none"
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      backgroundColor: activeMeta.loc
                        ? `${accent}26`
                        : "transparent",
                      border: `1px solid ${
                        activeMeta.loc
                          ? `${accent}99`
                          : "rgba(255,255,255,0.35)"
                      }`,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {locationText}
                  </motion.span>
                )}
              </div>
            )}

            {/* Chips: outlined, lift on hover; click = accent fill (toggle) */}
            {!!chips?.length && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {chips.map((label, idx) => {
                  const isActive = activeChip === idx;
                  return (
                    <motion.button
                      key={label}
                      onClick={() => onChipClick(idx)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-[0.86rem] leading-none",
                        "flex items-center justify-center transition-colors duration-200",
                        isActive
                          ? "text-white border-transparent"
                          : "text-white/95 border-white/26 hover:bg-white/8",
                        "border bg-black/20"
                      )}
                      style={
                        isActive
                          ? {
                              backgroundColor: `${accent}E6`,
                              filter: "saturate(1.1)",
                              boxShadow: `0 8px 18px ${accent}33`,
                            }
                          : undefined
                      }
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
