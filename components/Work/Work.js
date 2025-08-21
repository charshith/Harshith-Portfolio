// components/Work/Work.js
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Tabs from "./Tabs/Tabs";
import StickyScroll from "./StickyScroll/StickyScroll";
import { MENULINKS, WORK_CONTENTS } from "../../constants";

const BRAND = "#EB7431";

const Work = ({ isDesktop }) => {
  const sectionRef = useRef(null);

  // 🔸 Track the active company name (defaults to the first tab title)
  const [activeCompany, setActiveCompany] = useState("Zyprova");

  const tabItems = useMemo(
    () => [
      {
        title: "Zyprova",
        value: "zyprova",
        content: (
          <StickyScroll
            isDesktop={isDesktop}
            contentItems={WORK_CONTENTS.ZYPROVA}
          />
        ),
      },
      {
        title: "GBSN Infotech",
        value: "gbsn",
        content: (
          <StickyScroll
            isDesktop={isDesktop}
            contentItems={WORK_CONTENTS.GBSN}
          />
        ),
      },
      {
        title: "UNC Charlotte",
        value: "uncc",
        content: (
          <StickyScroll
            isDesktop={isDesktop}
            contentItems={WORK_CONTENTS.UNCC}
          />
        ),
      },
      {
        title: "LTI Mindtree",
        value: "ltimindtree",
        content: (
          <StickyScroll
            isDesktop={isDesktop}
            contentItems={WORK_CONTENTS.LTIMINDTREE}
          />
        ),
      },
      {
        title: "Coforge",
        value: "coforge",
        content: (
          <StickyScroll
            isDesktop={isDesktop}
            contentItems={WORK_CONTENTS.COFORGE}
          />
        ),
      },
    ],
    [isDesktop]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: "none" } })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, y: 18, duration: 0.6, stagger: 0.2 },
          "<"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".work-wrapper"),
        start: "100px bottom",
        end: "center center",
        scrub: 0,
        animation: tl,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[3].ref}
      className="w-full relative select-none xs:mt-40 sm:mt-72 mb-96 overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/left-pattern.svg"
        className="absolute hidden left-0 -top-1/4 w-1/12 max-w-xs md:block"
        loading="lazy"
        height={700}
        width={320}
        alt="left pattern"
      />

      <div className="section-container py-16 flex flex-col justify-center relative z-10">
        <div className="flex flex-col work-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
              WORK
            </p>

            {/* Fixed section title: Experience (with flowing orange gradient on hover) */}
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight staggered-reveal">
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#EB7431,#ffffff,#EB7431)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 50%",
                  transition: "background-position 1.2s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundPosition = "100% 50%")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundPosition = "0% 50%")
                }
              >
                Experience
              </span>
            </h1>

            <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              A quick recap of where I&apos;ve worked.
            </h2>
          </div>

          {/* 🔸 Tell Tabs to notify us when the active tab changes */}
          <Tabs
            tabItems={tabItems}
            onChange={(t) => setActiveCompany(t.title)}
          />
        </div>
      </div>
    </section>
  );
};

export default Work;
