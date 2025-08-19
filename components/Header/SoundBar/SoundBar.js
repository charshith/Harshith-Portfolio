import { useRef, useState, useEffect, useCallback } from "react";

// Put your MP3 at: public/sounds/song.mp3
const AUDIO_SRC = "/sounds/song.mp3";

const SoundBar = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [locked, setLocked] = useState(false); // 🔒 keep playing after hover-out
  const [hovering, setHovering] = useState(false);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      // Browser blocked autoplay (no user gesture yet)
      setPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause(); // don't reset currentTime, so it resumes seamlessly
    setPlaying(false);
  }, []);

  // Hover handlers (desktop)
  const onEnter = useCallback(() => {
    setHovering(true);
    if (!locked) play();
  }, [locked, play]);

  const onLeave = useCallback(() => {
    setHovering(false);
    if (!locked) pause();
  }, [locked, pause]);

  // Click: toggle "locked" mode
  const onClick = useCallback(async () => {
    setLocked((prev) => {
      const next = !prev;
      if (next) {
        // becoming locked -> ensure it's playing
        play();
      } else {
        // unlocking -> if not hovering, pause
        if (!hovering) pause();
      }
      return next;
    });
  }, [hovering, pause, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const el = audioRef.current;
      if (el) el.pause();
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={
        locked
          ? playing
            ? "Pause (locked)"
            : "Play (locked)"
          : playing
          ? "Pause"
          : "Play"
      }
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick} // mobile / permission fallback + lock toggle
      className={`soundBars inline-flex items-end gap-[3px] cursor-pointer
        ${playing ? "play" : ""} ${locked ? "locked" : ""}`}
      style={{ minWidth: 28, minHeight: 20, pointerEvents: "auto" }}
    >
      <span className="sbbar" />
      <span className="sbbar" />
      <span className="sbbar" />
      <span className="sbbar" />

      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />

      <style jsx>{`
        .soundBars .sbbar {
          display: block;
          width: 3px;
          height: 10px;
          background: #e5e7eb;
          border-radius: 1px;
          transition: height 120ms ease;
        }

        /* Animate bars only while playing */
        .soundBars.play .sbbar:nth-child(1) {
          animation: sb1 0.6s infinite ease-in-out;
        }
        .soundBars.play .sbbar:nth-child(2) {
          animation: sb2 0.6s infinite ease-in-out;
        }
        .soundBars.play .sbbar:nth-child(3) {
          animation: sb3 0.6s infinite ease-in-out;
        }
        .soundBars.play .sbbar:nth-child(4) {
          animation: sb2 0.6s infinite ease-in-out;
        }

        /* Optional: small visual hint when locked */
        .soundBars.locked .sbbar {
          box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3) inset;
        }

        @keyframes sb1 {
          0%,
          100% {
            height: 6px;
          }
          50% {
            height: 16px;
          }
        }
        @keyframes sb2 {
          0%,
          100% {
            height: 12px;
          }
          50% {
            height: 7px;
          }
        }
        @keyframes sb3 {
          0%,
          100% {
            height: 9px;
          }
          50% {
            height: 18px;
          }
        }
      `}</style>
    </button>
  );
};

export default SoundBar;
