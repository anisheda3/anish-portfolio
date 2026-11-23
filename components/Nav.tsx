"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav({ hasResume }: { hasResume: boolean }) {
  const mobileLinks = hasResume ? [...links, { id: "resume", label: "Résumé" }] : links;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the section whose middle band is on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent-deep via-accent to-glow"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-line/80 bg-night/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8" aria-label="Main">
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${site.name}, back to top`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line-strong bg-panel font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent/60">
              AE
            </span>
            <span className="hidden text-sm font-medium text-ink sm:block">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === l.id ? "text-ink" : "text-mute hover:text-ink"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-raised"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {hasResume && (
              <a
                href="/Anish_Eda_Resume.pdf"
                target="_blank"
                rel="noopener"
                className="hidden rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-accent/60 hover:text-accent sm:block"
              >
                Résumé
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-line bg-night/95 px-5 backdrop-blur-xl md:hidden"
            >
              {mobileLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={l.id === "resume" ? "/Anish_Eda_Resume.pdf" : `#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-lg text-ink last:border-0"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
