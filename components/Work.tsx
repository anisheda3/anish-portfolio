"use client";

import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Download, ExternalLink, Plus, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useCallback, useEffect, useRef, useState } from "react";
import { categories, projects, site, type Category, type Project, type ProjectLink } from "@/lib/data";
import { Reveal, SectionHeading, ease, trackSpotlight } from "./motion";

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

function LinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
  if (kind === "code") return <FaGithub size={14} />;
  if (kind === "download") return <Download size={14} />;
  return <ExternalLink size={14} />;
}

function Links({ links, size = "md" }: { links: ProjectLink[]; size?: "sm" | "md" }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-2 rounded-full border transition-colors ${
            l.kind === "code"
              ? "border-line-strong text-ink hover:border-accent/60 hover:text-accent"
              : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
          } ${size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
        >
          <LinkIcon kind={l.kind} />
          {l.label}
        </a>
      ))}
    </div>
  );
}

/** The project's data flow, drawn as nodes joined by animated dashed connectors. */
function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-3 rounded-lg border border-line-strong bg-night/70 px-3 py-2">
            <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm text-ink">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="ml-5 block h-4 w-px overflow-hidden">
              <span className="block h-full w-px animate-[flowY_1.2s_linear_infinite] bg-[linear-gradient(to_bottom,var(--color-accent)_0_4px,transparent_4px_8px)] bg-[length:1px_8px]" />
            </span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

function FeaturedCard({
  project,
  index,
  total,
  progress,
  stacked,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
  onOpen: () => void;
}) {
  // On wide screens each card shrinks a little as later cards slide over it.
  // Cards stay fully opaque so the one underneath never shows through.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.04]);

  return (
    <div className="md:sticky md:top-24" style={{ zIndex: index + 1 }}>
      <motion.article
        style={stacked ? { scale, top: `${index * 22}px` } : undefined}
        className="relative origin-top md:mb-[14vh]"
      >
        <div
          onMouseMove={trackSpotlight}
          className="spotlight grid overflow-hidden rounded-3xl border border-line-strong bg-panel shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.95)] md:grid-cols-[1.5fr_1fr]"
        >
          <div className="p-7 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <span className="text-accent">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              <span className="text-dim">·</span>
              <span className="text-mute">{project.category}</span>
              {project.status && (
                <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  {project.status}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">{project.title}</h3>
            <p className="mt-2 font-serif text-xl italic text-accent md:text-2xl">{project.tagline}</p>
            {project.role && <p className="mt-3 text-sm text-dim">{project.role}</p>}
            <p className="mt-5 max-w-xl leading-relaxed text-mute">{project.summary}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{m.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-dim">{m.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpen}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-night transition-transform hover:scale-[1.03]"
              >
                Case study
                <Plus size={14} className="transition-transform group-hover:rotate-90" />
              </button>
              <Links links={project.links} />
            </div>
          </div>

          <div className="relative border-t border-line bg-raised/40 p-7 md:border-l md:border-t-0 md:p-10">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-dim">How it works</p>
            <Pipeline steps={project.pipeline} />
            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 7).map((t) => (
                <span key={t} className="rounded-md bg-night/70 px-2 py-1 font-mono text-[11px] text-mute">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function Featured({ onOpen }: { onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col gap-6 md:gap-0">
      {featured.map((p, i) => (
        <FeaturedCard
          key={p.slug}
          project={p}
          index={i}
          total={featured.length}
          progress={scrollYProgress}
          stacked={stacked}
          onOpen={() => onOpen(p)}
        />
      ))}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease }}
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseMove={trackSpotlight}
        className="spotlight group flex h-full w-full flex-col rounded-2xl border border-line bg-panel/70 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-dim">{project.category}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-mute transition-all group-hover:rotate-45 group-hover:border-accent/60 group-hover:text-accent">
            <ArrowUpRight size={14} />
          </span>
        </div>
        <h3 className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="mt-1 text-sm text-mute">{project.tagline}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-dim">{project.summary}</p>
        {project.metrics.length > 0 && (
          <div className="mt-auto flex gap-6 pt-6">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <p className="text-lg font-semibold text-ink">{m.value}</p>
                <p className="text-[11px] leading-snug text-dim">{m.label}</p>
              </div>
            ))}
          </div>
        )}
        {project.status && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-accent">{project.status}</p>
        )}
      </button>
    </motion.li>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.slug}-title`}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease }}
        className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line-strong bg-panel md:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-panel/90 px-6 py-4 backdrop-blur md:px-8">
          <span className="font-mono text-[11px] uppercase tracking-wider text-dim">{project.category}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-mute transition-colors hover:text-ink"
            aria-label="Close case study"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 md:p-10">
          <h3 id={`${project.slug}-title`} className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 font-serif text-xl italic text-accent">{project.tagline}</p>
          {project.role && <p className="mt-2 text-sm text-dim">{project.role}</p>}
          <p className="mt-6 leading-relaxed text-mute">{project.summary}</p>

          {project.metrics.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-raised p-4">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-2xl font-semibold text-ink">{m.value}</dd>
                  <dd className="mt-1 text-xs text-dim">{m.label}</dd>
                </div>
              ))}
            </dl>
          )}

          <h4 className="mt-10 font-mono text-[11px] uppercase tracking-wider text-dim">What I built</h4>
          <ul className="mt-4 space-y-4">
            {project.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex gap-3 leading-relaxed text-ink/90"
              >
                <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
                {h}
              </motion.li>
            ))}
          </ul>

          <h4 className="mt-10 font-mono text-[11px] uppercase tracking-wider text-dim">Pipeline</h4>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.pipeline.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-lg border border-line-strong bg-raised px-3 py-1.5 text-sm text-ink">{s}</span>
                {i < project.pipeline.length - 1 && <span className="flow-line animate-flow h-px w-5" aria-hidden />}
              </span>
            ))}
          </div>

          <h4 className="mt-10 font-mono text-[11px] uppercase tracking-wider text-dim">Stack</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-mute">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10">
            {project.links.length ? (
              <Links links={project.links} />
            ) : (
              <p className="text-sm text-dim">Code available on request.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const [filter, setFilter] = useState<"All" | Category>("All");
  const shown = filter === "All" ? rest : rest.filter((p) => p.category === filter);
  const usedCats = categories.filter((c) => c === "All" || rest.some((p) => p.category === c));

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="03" kicker="Selected work" title="Systems I've" accent="shipped.">
        Four projects in depth, then the rest of the archive. Open any card for the full case study.
      </SectionHeading>

      <Featured onOpen={setOpen} />

      <div className="mt-28 md:mt-36">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-dim">More projects</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">The archive</h3>
          </div>
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border border-line bg-panel/60 p-1">
              {usedCats.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs transition-colors md:text-sm ${
                    filter === c ? "text-night" : "text-mute hover:text-ink"
                  }`}
                >
                  {filter === c && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-10 flex justify-center">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-accent"
          >
            <FaGithub size={15} /> Everything else on GitHub
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>{open && <ProjectModal project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
