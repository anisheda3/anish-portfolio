"use client";

import { motion } from "motion/react";
import { interests, marquee, skillGroups } from "@/lib/data";
import { Reveal, SectionHeading, ease, trackSpotlight } from "./motion";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <ul
        className={`flex shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-line bg-panel/70 px-5 py-2.5 font-mono text-sm text-mute"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const half = Math.ceil(marquee.length / 2);
  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="04" kicker="Toolkit" title="The stack behind" accent="the systems." />
      </div>

      <div className="space-y-3">
        <Row items={marquee.slice(0, half)} />
        <Row items={marquee.slice(half)} reverse />
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-5 md:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.li
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
              onMouseMove={trackSpotlight}
              className="spotlight rounded-2xl border border-line bg-panel/60 p-6 transition-colors hover:border-line-strong"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-medium text-ink">{g.title}</h3>
                <span className="font-mono text-[11px] text-dim">{String(g.items.length).padStart(2, "0")}</span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="rounded-md bg-raised px-2.5 py-1 text-[13px] text-mute">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        <Reveal className="mt-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-dim">Research interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((t) => (
              <span
                key={t}
                className="cursor-default rounded-full border border-line px-4 py-2 text-sm text-mute transition-colors hover:border-accent/50 hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
