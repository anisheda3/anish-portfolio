"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { roles, site } from "@/lib/data";
import { NeuralField } from "./NeuralField";
import { ease } from "./motion";

function Letters({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${className}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="whitespace-nowrap text-accent"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div style={{ y: fieldY }} className="absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <NeuralField className="absolute inset-0 opacity-80" />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent-deep/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[520px] rounded-full bg-glow/10 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />

      <motion.div style={{ y, opacity, scale }} className="relative mx-auto w-full max-w-6xl px-5 pt-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-panel/70 px-4 py-1.5 text-xs text-mute backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to AI / ML Engineer and Data Scientist roles · 2027
        </motion.div>

        <h1 className="text-[clamp(3.4rem,13vw,10rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink">
          <span className="sr-only">{site.name}</span>
          <Letters text="Anish" delay={0.2} />
          <br />
          <Letters text="Eda" delay={0.45} className="font-serif font-normal italic tracking-[-0.02em] text-gradient pr-[0.08em]" />
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease }}
            className="inline-block text-accent"
          >
            .
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
          className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end"
        >
          <div>
            <p className="text-xl text-ink md:text-2xl">
              <RotatingRole />
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mute md:text-lg">
              I build AI systems that hold up outside the notebook: retrieval-grounded LLM tutors, a fine-tuned 14B
              model, agentic workflows and calibrated decision engines. Final-year B.Tech AI &amp; DS at{" "}
              <span className="text-ink">IIIT Sri City</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              See my work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-panel/60 px-5 py-3 text-sm text-ink backdrop-blur transition-colors hover:border-accent/60"
            >
              <Mail size={15} /> Email
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-panel/60 text-ink backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
            >
              <FaGithub size={17} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-panel/60 text-ink backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
            >
              <FaLinkedin size={17} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim md:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
