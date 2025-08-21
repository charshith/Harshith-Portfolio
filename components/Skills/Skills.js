/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, SKILLS } from "../../constants";
import SkillIcon from "./SkillIcon";

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: "none" } })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, y: 6, duration: 0.5, stagger: 0.35 },
          "<"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".skills-wrapper"),
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
      id={MENULINKS[1].ref}
      className="w-full relative select-none mt-44"
    >
      {/* subtle backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 30%, rgba(235,116,49,0.08), transparent 70%), radial-gradient(70% 60% at 80% 70%, rgba(0,0,0,0.45), transparent 70%)",
        }}
      />

      <div className="section-container py-16 flex flex-col justify-center relative">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block opacity-60"
          loading="lazy"
          height={700}
          width={320}
        />

        <div className="flex flex-col skills-wrapper">
          <div className="flex flex-col">
            <h1 className="text-6xl mt-2 font-medium text-[#eb7431] w-fit staggered-reveal">
              My Skills
            </h1>
            <h2 className="text-[1.55rem] md:text-[1.65rem] font-medium md:max-w-2xl w-full mt-2 text-white/90 staggered-reveal">
              Expertise in building scalable platforms, crafting intuitive user
              experiences, and delivering actionable analytics to drive growth
              and efficiency.
            </h2>
          </div>

          {/* LANGUAGES & TOOLS */}
          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal">
              LANGUAGES & TOOLS
            </h3>
            <div className="flex items-center flex-wrap gap-6 staggered-reveal">
              {SKILLS.languagesAndTools.map((skill) => (
                <SkillIcon key={skill} name={skill} />
              ))}
            </div>
          </div>

          {/* LIBRARIES & FRAMEWORKS */}
          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal">
              LIBRARIES & FRAMEWORKS
            </h3>
            <div className="flex flex-wrap gap-6 transform-gpu staggered-reveal">
              {SKILLS.librariesAndFrameworks.map((skill) => (
                <SkillIcon key={skill} name={skill} />
              ))}
            </div>
          </div>

          {/* DATABASES + DEVOPS */}
          <div className="flex flex-wrap mt-10">
            <div className="mr-16 xs:mr-20 mb-6 staggered-reveal">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4">
                DATABASES
              </h3>
              <div className="flex flex-wrap gap-6 transform-gpu">
                {SKILLS.databases.map((skill) => (
                  <SkillIcon key={skill} name={skill} />
                ))}
              </div>
            </div>

            <div className="staggered-reveal">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4">
                DEVOPS & TOOLS
              </h3>
              <div className="flex flex-wrap gap-6 transform-gpu">
                {SKILLS.other.map((skill) => (
                  <SkillIcon key={skill} name={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
