"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { Reveal, SectionHeading, trackSpotlight } from "./motion";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="02" kicker="Experience" title="Where I've" accent="built things." />

      <ol ref={ref} className="relative space-y-6 pl-8 md:pl-14">
        <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[11px]" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-glow md:left-[11px]"
        />
        {experience.map((e, i) => (
          <li key={e.role + e.org} className="relative">
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`absolute -left-8 top-8 grid h-[15px] w-[15px] place-items-center rounded-full border md:-left-14 md:h-[23px] md:w-[23px] ${
                i === 0 ? "border-accent bg-accent/15" : "border-line-strong bg-night"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-dim"}`} />
            </motion.span>
            <Reveal delay={0.05}>
              <article
                onMouseMove={trackSpotlight}
                className="spotlight rounded-2xl border border-line bg-panel/60 p-6 transition-colors hover:border-line-strong md:p-8"
              >
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                  <h3 className="text-xl font-semibold text-ink md:text-2xl">{e.role}</h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-dim">{e.period}</span>
                </div>
                <p className="mt-1 text-accent">{e.org}</p>
                <p className="mt-4 max-w-3xl leading-relaxed text-mute">{e.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {e.points.map((p) => (
                    <li key={p} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
