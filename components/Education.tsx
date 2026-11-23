"use client";

import { education } from "@/lib/data";
import { Reveal, SectionHeading, trackSpotlight } from "./motion";

export function Education() {
  const [primary, ...others] = education;
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="05" kicker="Education" title="Where it" accent="started." />

      <Reveal>
        <article
          onMouseMove={trackSpotlight}
          className="spotlight relative overflow-hidden rounded-3xl border border-line-strong bg-panel p-8 md:p-12"
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-deep/15 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-dim">{primary.period}</p>
              <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink md:text-4xl">{primary.school}</h3>
              <p className="mt-2 text-accent">{primary.degree}</p>
            </div>
            <div className="md:text-right">
              <p className="text-6xl font-semibold tracking-tight text-ink md:text-7xl">{primary.score}</p>
              <p className="mt-1 text-sm text-dim">{primary.scoreLabel}</p>
            </div>
          </div>
        </article>
      </Reveal>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {others.map((e, i) => (
          <Reveal key={e.school} delay={0.08 * (i + 1)}>
            <article
              onMouseMove={trackSpotlight}
              className="spotlight flex items-end justify-between gap-6 rounded-2xl border border-line bg-panel/60 p-6"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-dim">{e.period}</p>
                <h3 className="mt-2 font-medium text-ink">{e.school}</h3>
                <p className="mt-1 text-sm text-mute">{e.degree}</p>
              </div>
              <p className="text-3xl font-semibold text-ink">
                {e.score} <span className="text-xs font-normal text-dim">{e.scoreLabel}</span>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
