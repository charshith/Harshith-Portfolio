// components/Header/Header.js
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SoundBar from "./SoundBar/SoundBar";
import { MENULINKS } from "../../constants";

const BRAND = "#EB7431";

const Header = ({ children }) => {
  const [active, setActive] = useState("home");
  const [hovering, setHovering] = useState(false);

  // mini (single-pill) only when NOT home and NOT hovering
  const isMini = active !== "home" && !hovering;

  const activeItem = useMemo(
    () => MENULINKS.find((m) => m.ref === active),
    [active]
  );

  // Smooth click scroll + set active
  const onNavClick = useCallback((e, ref) => {
    e.preventDefault();
    const linkEl = e.currentTarget;
    linkEl?.blur?.();
    setTimeout(() => linkEl?.blur?.(), 0);

    const el = document.getElementById(ref);
    if (el) {
      setActive(ref);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${ref}`);
    }
  }, []);

  // Keep active synced with scroll
  useEffect(() => {
    const sections = MENULINKS.map((l) =>
      document.getElementById(l.ref)
    ).filter(Boolean);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.2 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="w-full fixed top-0 py-8 z-50 select-none bg-gradient-to-b from-black shadow-black transition-all duration-300">
      <div className="section-container relative flex items-center justify-between gap-3">
        {/* LEFT — badge: show only on Home */}
        <a
          href="#home"
          aria-label="Go to Home"
          className={`inline-flex items-center ${
            active !== "home" ? "invisible md:invisible" : ""
          }`}
        >
          <div className="hidden md:inline-flex items-center rounded-full border border-neutral-800/70 bg-black/40 backdrop-blur px-3 py-1">
            <span className="font-medium text-neutral-100 tracking-tight">
              charshith
            </span>
          </div>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={25}
            height={25}
            priority
            className="md:hidden"
          />
        </a>

        {/* CENTER — perfectly centered; single pill in mini mode */}
        <div
          className="hidden md:flex flex-1 items-center justify-center"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <nav
            className={`primary-nav flex items-center gap-1 rounded-full border border-neutral-800/70 bg-black/40 backdrop-blur px-2 py-1 transition-all ${
              isMini ? "is-mini" : ""
            }`}
            aria-label="Primary"
          >
            {isMini ? (
              // Render ONLY the active pill in mini mode → no shuffle/jitter
              <a
                key={active}
                href={`#${active}`}
                onClick={(e) => onNavClick(e, active)}
                className="pill is-active inline-flex items-center justify-center text-center rounded-full px-3 py-[0.38rem] leading-none text-sm"
              >
                {activeItem?.name || "—"}
              </a>
            ) : (
              MENULINKS.map((item) => (
                <a
                  key={item.ref}
                  href={`#${item.ref}`}
                  onClick={(e) => onNavClick(e, item.ref)}
                  className={`pill inline-flex items-center justify-center text-center rounded-full px-3 py-[0.38rem] leading-none text-sm transition-all ${
                    active === item.ref ? "is-active" : ""
                  }`}
                >
                  {item.name}
                </a>
              ))
            )}
          </nav>
        </div>

        {/* RIGHT — SoundBar */}
        <div className="flex items-center gap-4 z-10">
          <div className="soundbar-wrap">
            <SoundBar />
          </div>
          {children}
        </div>
      </div>

      {/* Brand color + single-pill behavior + SoundBar visibility fixes */}
      <style jsx global>{`
        /* --- nav pills --- */
        .primary-nav .pill {
          color: #e5e7eb;
          text-decoration: none;
          outline: none;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: color 160ms ease, transform 220ms ease, opacity 220ms ease,
            text-shadow 160ms ease;
        }
        .primary-nav .pill:hover,
        .primary-nav .pill:focus {
          color: ${BRAND} !important;
          text-shadow: 0 0 14px rgba(235, 116, 49, 0.35);
        }
        .primary-nav .pill.is-active {
          color: ${BRAND} !important;
          text-shadow: 0 0 14px rgba(235, 116, 49, 0.35);
        }
        .primary-nav .pill:visited {
          color: #e5e7eb;
        }
        .primary-nav .pill.is-active:visited {
          color: ${BRAND} !important;
        }

        /* --- single-pill (centered) --- */
        .primary-nav.is-mini {
          gap: 0;
          padding: 0.25rem 0.5rem;
          justify-content: center;
          min-height: 40px;
        }
        .primary-nav.is-mini .pill.is-active {
          transform: scale(1.02);
          padding-left: 0.9rem;
          padding-right: 0.9rem;
        }

        /* --- SoundBar container (no change to component) --- */
        .soundbar-wrap {
          position: relative;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          min-height: 20px;
        }
      `}</style>
    </nav>
  );
};

export default Header;
