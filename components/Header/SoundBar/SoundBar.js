import { useEffect, useRef, useState, useCallback } from "react";
import { Howl } from "howler";
/** Order: Global Groove -> Focus Mode -> Ritmo Caliente */
const TRACKS = [
  {
    id: "focus",
    name: "Global Groove",
    label: "Global Groove 🌍",
    src: "/sounds/song2.mp3",
    color: "#60a5fa",
  },
  {
    id: "lofi",
    name: "Focus Mode",
    label: "Focus Mode ✨",
    src: "/sounds/song1.mp3",
    color: "#a78bfa",
  },
  {
    id: "chill",
    name: "Ritmo Caliente",
    label: "Ritmo Caliente 🔥",
    src: "/sounds/song3.mp3",
    color: "#f87171",
  },
];

export default function SoundBar() {
  const audioRef = useRef(null);
  const wrapRef = useRef(null);

  const [track, setTrack] = useState(TRACKS[0]);
  const [playing, setPlaying] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  /* ---------- unlock after first user gesture ---------- */
  useEffect(() => {
    const unlock = () => setUnlocked(true);
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  /* ---------- first-visit visual hint ---------- */
  useEffect(() => {
    const seen = sessionStorage.getItem("sb_hint_seen") === "1";
    if (!seen) {
      const t1 = setTimeout(() => setHint(true), 120);
      const t2 = setTimeout(() => setHint(false), 2100);
      sessionStorage.setItem("sb_hint_seen", "1");
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  /* ---------- audio setup ---------- */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.src = track.src;
    el.loop = true;
    el.preload = "auto";
    el.load();
  }, [track]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      /* needs unlock */
    }
  }, []);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  }, []);

  /* ---------- hover preview ---------- */
  const onEnter = () => {
    setHovering(true);
    if (unlocked && !locked) play();
  };
  const onLeave = () => {
    setHovering(false);
    if (unlocked && !locked) pause();
  };

  /* ---------- click to lock/unlock ---------- */
  const onToggleLock = async () => {
    if (!unlocked) setUnlocked(true);
    if (locked) {
      setLocked(false);
      pause();
    } else {
      setLocked(true);
      await play();
    }
  };

  /* ---------- open/close the menu from the label pill ---------- */
  const toggleMenu = () => setMenuOpen((v) => !v);

  /* close on outside click / Esc */
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  /* ---------- switch track (auto-play + lock) ---------- */
  const onPickTrack = async (id) => {
    const next = TRACKS.find((t) => t.id === id) || TRACKS[0];
    pause(); // stop previous
    setTrack(next); // set new
    setLocked(true); // keep it playing after menu closes
    setMenuOpen(false);
    if (!unlocked) setUnlocked(true);
    // wait a tick so the <audio> has the new src, then play
    requestAnimationFrame(() => {
      play();
    });
  };

  const tooltip = !unlocked
    ? "Click once to enable audio 🎵"
    : locked
    ? "Vibes locked — click to stop 🔒"
    : playing
    ? "Vibes on — click to lock 🎵"
    : "Turn on vibes 🎵";

  return (
    <div
      ref={wrapRef}
      className="sb-wrap"
      role="group"
      aria-label="Sound controls"
    >
      {/* icon button */}
      <button
        className={`sb-btn ${playing ? "is-playing" : ""} ${
          hint ? "hint" : ""
        }`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onToggleLock}
        aria-pressed={locked}
        aria-label="Toggle vibes"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="bars"
        >
          <rect x="4" y="7" width="3" height="10" rx="1"></rect>
          <rect x="10" y="4" width="3" height="16" rx="1"></rect>
          <rect x="16" y="9" width="3" height="8" rx="1"></rect>
        </svg>
        <div className="tooltip" role="status" aria-live="polite">
          {tooltip}
        </div>
      </button>

      {/* label pill — click toggles dropdown */}
      <button
        type="button"
        className="label-pill"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        title="Choose track"
      >
        {track.label}
      </button>

      {/* dropdown with animated left icons */}
      {menuOpen && (
        <ul className="menu" role="menu">
          {TRACKS.map((t) => (
            <li key={t.id} role="menuitem">
              <button
                className={`menu-item ${t.id === track.id ? "is-active" : ""}`}
                onClick={() => onPickTrack(t.id)}
              >
                <span
                  className={`iconBox ${t.id === track.id ? "on" : ""}`}
                  style={{ "--c": t.color }}
                />
                {t.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <audio ref={audioRef} />

      <style jsx>{`
        .sb-wrap {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          isolation: isolate;
        }

        /* icon button */
        .sb-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e8eaed;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease,
            background 180ms ease;
          box-shadow: 0 0 18px rgba(99, 102, 241, 0.55),
            0 0 36px rgba(99, 102, 241, 0.35), 0 0 64px rgba(99, 102, 241, 0.22);
        }
        .sb-btn::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(99, 102, 241, 0.22),
            rgba(99, 102, 241, 0) 70%
          );
          filter: blur(10px);
          z-index: -1;
          animation: glowPulse 2.2s ease-in-out infinite;
          pointer-events: none;
        }
        .sb-btn.hint {
          animation: hintBounce 0.9s ease-in-out 0.2s 2;
        }
        .sb-btn:hover {
          transform: translateY(-1px) scale(1.03);
          background: rgba(0, 0, 0, 0.45);
          box-shadow: 0 0 22px rgba(99, 102, 241, 0.7),
            0 0 50px rgba(99, 102, 241, 0.45), 0 0 86px rgba(99, 102, 241, 0.3);
        }
        .bars rect {
          fill: currentColor;
          opacity: 0.9;
        }
        .sb-btn.is-playing .bars rect {
          animation: upDown 0.9s ease-in-out infinite;
        }
        .sb-btn.is-playing .bars rect:nth-child(2) {
          animation-delay: 0.1s;
        }
        .sb-btn.is-playing .bars rect:nth-child(3) {
          animation-delay: 0.2s;
        }

        /* label pill */
        .label-pill {
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e8eaed;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease,
            border-color 160ms ease;
        }
        .label-pill:hover {
          background: rgba(0, 0, 0, 0.45);
          transform: translateY(-1px);
          border-color: rgba(255, 255, 255, 0.26);
        }

        /* tooltip */
        .tooltip {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 10px;
          background: rgba(12, 12, 12, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          font-size: 12px;
          line-height: 1;
          color: #e8eaed;
          white-space: nowrap;
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          translate: 0 4px;
          transition: opacity 160ms ease, translate 160ms ease;
        }
        .sb-btn:hover .tooltip,
        .sb-btn:focus-visible .tooltip {
          opacity: 1;
          translate: 0 0;
        }

        /* dropdown */
        .menu {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          padding: 10px;
          background: rgba(10, 10, 10, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          min-width: 220px;
          backdrop-filter: blur(8px);
          z-index: 20;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
        }
        .menu-item {
          width: 100%;
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 10px;
          align-items: center;
          text-align: left;
          color: #e8eaed;
          font-size: 14px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          cursor: pointer;
          transition: background 140ms ease, color 140ms ease,
            border-color 140ms ease;
        }
        .menu-item:hover {
          background: rgba(99, 102, 241, 0.12);
          color: #c7d2fe;
        }
        .menu-item.is-active {
          background: rgba(99, 102, 241, 0.16);
          color: #a5b4fc;
          border-color: rgba(99, 102, 241, 0.25);
        }

        /* animated left icon (mini equalizer) */
        .iconBox {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .iconBox::before,
        .iconBox::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: radial-gradient(
            circle at 50% 50%,
            var(--c, #a78bfa) 20%,
            transparent 60%
          );
          opacity: 0.18;
          filter: blur(10px);
        }
        .iconBox span {
          display: none;
        } /* (no spans necessary; using pseudo + bars) */
        .iconBox::after {
          opacity: 0.1;
        }

        /* three bars */
        .iconBox::marker {
          content: none;
        }
        .iconBox::before {
          mix-blend-mode: screen;
        }
        .iconBox.on::before {
          animation: none;
        }

        .iconBox::part(bar) {
          display: none;
        } /* for clarity */

        .iconBox::after,
        .iconBox.on::after {
          content: "";
        }

        /* Draw bars with shadows via background */
        .iconBox {
          background: linear-gradient(var(--c, #a78bfa), var(--c, #a78bfa)) 6px
              6px / 3px 10px no-repeat,
            linear-gradient(var(--c, #a78bfa), var(--c, #a78bfa)) 10px 3px / 3px
              16px no-repeat,
            linear-gradient(var(--c, #a78bfa), var(--c, #a78bfa)) 14px 8px / 3px
              8px no-repeat,
            rgba(255, 255, 255, 0.04);
        }
        .iconBox.on {
          animation: barsPulse 1s ease-in-out infinite;
        }
        .menu-item:hover .iconBox {
          animation: barsPulse 1s ease-in-out infinite;
        }

        @keyframes barsPulse {
          0%,
          100% {
            background: linear-gradient(var(--c), var(--c)) 6px 8px / 3px 8px
                no-repeat,
              linear-gradient(var(--c), var(--c)) 10px 5px / 3px 14px no-repeat,
              linear-gradient(var(--c), var(--c)) 14px 10px / 3px 6px no-repeat,
              rgba(255, 255, 255, 0.04);
          }
          50% {
            background: linear-gradient(var(--c), var(--c)) 6px 5px / 3px 14px
                no-repeat,
              linear-gradient(var(--c), var(--c)) 10px 8px / 3px 8px no-repeat,
              linear-gradient(var(--c), var(--c)) 14px 6px / 3px 12px no-repeat,
              rgba(255, 255, 255, 0.04);
          }
        }

        /* base animations */
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.02);
          }
        }
        @keyframes hintBounce {
          0% {
            transform: translateY(0) scale(1);
          }
          35% {
            transform: translateY(-8px) scale(1.04);
          }
          70% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-4px) scale(1.02);
          }
        }
        @keyframes upDown {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
