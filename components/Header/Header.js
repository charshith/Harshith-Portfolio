// components/Header/Header.js
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SoundBar from "./SoundBar/SoundBar";
import { MENULINKS } from "../../constants";

const BRAND = "#EB7431";
const TOP_STICKY_CUTOFF = 140; // show full nav until you scroll past this

const Header = ({ children }) => {
  const [active, setActive] = useState("home");
  const [hovering, setHovering] = useState(false);
  const [nearTop, setNearTop] = useState(true);

  // Collapse only when not near top, not on home, and not hovering
  const isMini = !nearTop && active !== "home" && !hovering;

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

  // Scroll spy (closest section to viewport center) + nearTop toggle
  useEffect(() => {
    let ticking = false;

    const computeActive = () => {
      setNearTop(window.scrollY < TOP_STICKY_CUTOFF);

      const viewportCenter = window.innerHeight / 2;
      let bestId = "home";
      let bestDist = Infinity;

      for (const { ref } of MENULINKS) {
        const el = document.getElementById(ref);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (visible && dist < bestDist) {
          bestDist = dist;
          bestId = ref;
        }
      }

      setActive(bestId);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    // initial run
    computeActive();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <nav className="w-full fixed top-0 z-50 select-none transition-all duration-300">
      {/* non-interactive gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="section-container relative z-10 flex items-center justify-between gap-3 py-6">
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
              <a
                key={active}
                href={`#${active}`}
                onClick={(e) => onNavClick(e, active)}
                className="pill is-active cursor-pointer inline-flex items-center justify-center text-center rounded-full px-3 py-[0.38rem] leading-none text-sm"
              >
                {activeItem?.name || "—"}
              </a>
            ) : (
              MENULINKS.map((item) => (
                <a
                  key={item.ref}
                  href={`#${item.ref}`}
                  onClick={(e) => onNavClick(e, item.ref)}
                  className={`pill cursor-pointer inline-flex items-center justify-center text-center rounded-full px-3 py-[0.38rem] leading-none text-sm transition-all ${
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

      {/* Brand color + single-pill behavior + SoundBar container */}
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

        /* --- SoundBar container --- */
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
