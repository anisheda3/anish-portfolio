"use client";

import { animate, motion, useInView, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";
import { Reveal } from "./motion";

const statement =
  "I care about the unglamorous half of AI: grounding answers in real sources, measuring on held-out data, closing security holes, and shipping latency people can live with. Lately that has meant working in the AI team of a university tutor, from retrieval to fine-tuning our own 14B model.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

function CountUp({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const value = useMotionValue(0);
  const [text, setText] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-dim">
        <span className="text-accent">01</span>
        <span className="h-px w-10 bg-line-strong" />
        About
      </Reveal>

      <p ref={ref} className="max-w-5xl text-3xl font-medium leading-[1.25] tracking-tight text-ink md:text-5xl">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-panel p-6 md:p-8">
            <p className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
