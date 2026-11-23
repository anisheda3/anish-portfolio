import { existsSync } from "node:fs";
import { join } from "node:path";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";

// The résumé link only appears once public/Anish_Eda_Resume.pdf exists, so the site never ships a dead link.
const hasResume = existsSync(join(process.cwd(), "public", "Anish_Eda_Resume.pdf"));

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-night"
      >
        Skip to content
      </a>
      <Nav hasResume={hasResume} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Education />
      </main>
      <Contact />
    </MotionProvider>
  );
}
