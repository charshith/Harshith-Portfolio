/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, SKILLS } from "../../constants";
import SkillIcon from "./SkillIcon"; // ✅ use CDN+fallback-aware icon

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: "none" } })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".skills-wrapper"),
        start: "100px bottom",
        end: "center center",
        scrub: 0,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className="w-full relative select-none mt-44"
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block"
          loading="lazy"
          height={700}
          width={320}
        />
        <div className="flex flex-col skills-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
              SKILLS
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
              My Skills
            </h1>
            <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              Full-Stack & Data Engineer—building AI-driven SaaS, GraphQL
              microservices, and real-time analytics with React, Python, and AWS.
            </h2>
          </div>

          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal">
              LANGUAGES AND TOOLS
            </h3>
            <div className="flex items-center flex-wrap gap-6 staggered-reveal">
              {SKILLS.languagesAndTools.map((skill) => (
                <SkillIcon key={skill} name={skill} />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal">
              LIBRARIES AND FRAMEWORKS
            </h3>
            <div className="flex flex-wrap gap-6 transform-gpu staggered-reveal">
              {SKILLS.librariesAndFrameworks.map((skill) => (
                <SkillIcon key={skill} name={skill} />
              ))}
            </div>
          </div>

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
                DevOps & Tools
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