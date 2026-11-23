"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useRef, useState } from "react";
import { site } from "@/lib/data";
import { Reveal } from "./motion";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden border-t border-line pt-28 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent-deep/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          <span className="text-accent">06</span>
          <span className="h-px w-10 bg-line-strong" />
          Contact
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-8xl">
            Let&apos;s build something{" "}
            <span className="font-serif font-normal italic text-gradient">that ships.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 max-w-xl text-lg text-mute">
          Open to AI / ML engineering and data science roles, research collaborations, and hard problems with real users.
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent py-2 pl-6 pr-2 text-night transition-transform hover:scale-[1.02]"
          >
            <span className="font-medium">{site.email}</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-night text-accent transition-transform group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-sm text-ink transition-colors hover:border-accent/60"
          >
            {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
          <div className="flex gap-3">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-12 w-12 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent/60 hover:text-accent">
              <FaGithub size={18} />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-12 w-12 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent/60 hover:text-accent">
              <FaLinkedin size={18} />
            </a>
          </div>
        </Reveal>
      </div>

      <motion.p
        aria-hidden
        style={{ x }}
        className="mt-24 select-none whitespace-nowrap text-[18vw] font-semibold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)]"
      >
        Anish Eda · AI Engineer ·
      </motion.p>

      <footer className="relative mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t border-line px-5 py-8 text-xs text-dim md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} {site.name} · {site.location}</p>
        <p>Built with Next.js, Tailwind CSS and Motion</p>
      </footer>
    </section>
  );
}
