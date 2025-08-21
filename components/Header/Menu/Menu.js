import React, { useEffect } from "react";
import { MENULINKS } from "../../../constants";

const BRAND = "#EB7431";

const Menu = () => {
  useEffect(() => {
    const anchorNodes = document.querySelectorAll('a[href^="#"]');

    anchorNodes.forEach((el) => {
      el.addEventListener("click", () => {
        const checkbox = document.querySelector(".checkbox-toggle");
        if (checkbox) checkbox.checked = false;
      });
    });

    return () => {
      anchorNodes.forEach((el) => {
        el.replaceWith(el.cloneNode(true)); // quick cleanup of listeners
      });
    };
  }, []);

  return (
    <div className="menu fixed top-0 left-0 w-full h-full overflow-hidden invisible pointer-events-none flex items-center justify-center">
      <div className="flex-none overflow-hidden flex items-center justify-center">
        <div className="text-center opacity-0 overflow-y-auto overflow-x-hidden flex flex-none justify-center items-center max-h-screen">
          <ul className="list-none py-4 px-0 m-0 block max-h-screen">
            {MENULINKS.map((el) => (
              <li key={el.name} className="p-0 m-6 text-2xl block">
                <a
                  className="overlay-link relative inline font-mono font-bold text-5xl duration-300 hover:no-underline focus:no-underline"
                  href={`#${el.ref}`}
                >
                  {el.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Brand color styling */}
      <style jsx global>{`
        /* default text */
        .menu .overlay-link {
          color: #e5e7eb; /* neutral */
          text-decoration: none;
          outline: none;
          transition: color 160ms ease, text-shadow 160ms ease;
        }
        /* hover/focus -> brand orange + subtle glow */
        .menu .overlay-link:hover,
        .menu .overlay-link:focus-visible {
          color: ${BRAND};
          text-shadow: 0 0 18px rgba(235, 116, 49, 0.35);
        }
        /* keyboard focus ring */
        .menu .overlay-link:focus-visible {
          box-shadow: 0 0 0 3px rgba(235, 116, 49, 0.35);
          border-radius: 8px;
        }
        /* active press */
        .menu .overlay-link:active {
          color: ${BRAND};
          text-shadow: 0 0 24px rgba(235, 116, 49, 0.45);
        }
      `}</style>
    </div>
  );
};

export default Menu;
