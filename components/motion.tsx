"use client";

import { MotionConfig, motion, type HTMLMotionProps } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Honour the OS "reduce motion" setting for every motion component on the page. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades and lifts its children in once, when they scroll into view. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-dim">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line-strong" />
        {kicker}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          {title}{" "}
          {accent && <span className="font-serif font-normal italic text-accent">{accent}</span>}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={0.1} className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
          {children}
        </Reveal>
      )}
    </div>
  );
}

/** Sets --x / --y on the element so the .spotlight gradient follows the cursor. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
}
