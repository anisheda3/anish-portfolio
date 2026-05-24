"use client";

import {
  Mail,
  ExternalLink,
  ChevronRight,
  BrainCircuit,
  Code2,
  Briefcase,
  GraduationCap,
  Map,
  Satellite,
  Eye,
  Dumbbell,
  ShoppingCart,
  Shield,
  Activity,
  Zap,
  Database,
  Cpu,
  Globe,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const stats = [
    { label: "Projects Shipped", value: "6+", icon: <Layers size={15} /> },
    { label: "ML Frameworks", value: "10+", icon: <BrainCircuit size={15} /> },
    { label: "Inference Latency", value: "<2s", icon: <Zap size={15} /> },
    { label: "CGPA", value: "8.5", icon: <Activity size={15} /> },
  ];

  const experiences = [
    {
      role: "AI Engineer Intern",
      company: "Ediglobe",
      duration: "Completed",
      tag: "Production ML",
      description:
        "Implemented foundational ML algorithms and built complete AI workflows through structured project-based learning, gaining exposure to production-oriented system design patterns.",
      highlights: ["End-to-end ML pipelines", "Production system design", "Structured project delivery"],
    },
    {
      role: "Data Science Intern",
      company: "Finlatics",
      duration: "Completed",
      tag: "Analytics",
      description:
        "Conducted exploratory data analysis, feature engineering, and insight-driven modelling on complex structured and unstructured datasets.",
      highlights: ["EDA & feature engineering", "Structured + unstructured data", "Insight-driven modelling"],
    },
    {
      role: "AI Job Bridge Program",
      company: "Unlox Academy",
      duration: "Completed",
      tag: "Full-Stack AI",
      description:
        "Focused on end-to-end AI system development, integration, and deployment of real-world ML solutions, including full-stack application components.",
      highlights: ["End-to-end deployment", "Real-world ML solutions", "Full-stack integration"],
    },
  ];

  const projects = [
    {
      title: "OpthaMiss AI",
      subtitle: "Clinical ML Pipeline & Full-Stack Deployment",
      icon: <Eye size={20} />,
      badge: "Medical AI",
      description:
        "Dual-model clinical screening system for anterior eye (13 conditions) and retinal fundus (8 conditions) classification using custom ViT architectures.",
      bullets: [
        "MISS-EyeScreen v4 (13-class anterior) + Tele-Ophthalmology ViT-S/16 v3 (8-class fundus)",
        "OpenCV preprocessing: glare removal for anterior, CLAHE enhancement for fundus",
        "3-view TTA (anterior) + 5-view TTA (fundus) for clinical edge-case stability",
        "FastAPI server with /predict/anterior, /predict/fundus, /predict/both + risk stratification",
        "Multi-stage Dockerfile; frontend live on Vercel",
      ],
      tech: ["PyTorch", "ViT", "FastAPI", "OpenCV", "CLAHE", "TTA", "Docker", "Next.js"],
      link: "#",
    },
    {
      title: "Vijayawada Flood Routing",
      subtitle: "Geospatial Data Engineering & Remote Sensing",
      icon: <Satellite size={20} />,
      badge: "Geospatial",
      description:
        "Automated acquisition and processing of GPM IMERG satellite rainfall data and mapped historical flood extents using Sentinel-1 SAR imagery via Google Earth Engine.",
      bullets: [
        "Automated GPM IMERG rainfall data acquisition via earthaccess API",
        "Sentinel-1 SAR data processed through Google Earth Engine for inundation mapping",
        "Historical flood extent analysis to identify regional inundation patterns",
        "End-to-end geospatial Python pipeline from data ingestion to visualization",
      ],
      tech: ["Python", "Google Earth Engine", "earthaccess", "Sentinel-1 SAR", "GPM IMERG", "Remote Sensing"],
      link: "#",
    },
    {
      title: "PriceGuard AI",
      subtitle: "E-Commerce Price Intelligence System",
      icon: <ShoppingCart size={20} />,
      badge: "MLOps",
      description:
        "End-to-end price intelligence pipeline tracking e-commerce products to forecast trends and detect artificial price inflation with sub-2-second inference latency.",
      bullets: [
        "Prophet (time-series) + LightGBM (3-class rec.) + IsolationForest (anomaly detection)",
        "30+ engineered features: sale-event context, rolling stats, momentum, MRP-relative discount depth",
        "APScheduler + BeautifulSoup + Selenium with CAPTCHA mitigation & proxy rotation",
        "FastAPI backend with model preloading reducing latency from minutes to <2s",
      ],
      tech: ["Prophet", "LightGBM", "IsolationForest", "FastAPI", "SQLite", "APScheduler", "Selenium"],
      link: "#",
    },
    {
      title: "Fitness Analysis System",
      subtitle: "Computer Vision & Retrieval-Augmented AI",
      icon: <Dumbbell size={20} />,
      badge: "Computer Vision",
      description:
        "End-to-end AI system integrating computer vision, NLP, and classical ML for real-time workout analysis and evidence-based personalised feedback.",
      bullets: [
        "Stable form analysis + rep counting at 25+ FPS with hysteresis logic (35% fewer false detections)",
        "RAG pipeline: LangChain + Flan-T5 + Sentence Transformers + FAISS over fitness Q&A KB",
        "Random Forest & Gradient Boosting for behaviour prediction (R² up to 0.7+)",
        "v2.0: RESTful API + AI Dietician + habit tracker + LLM-based Virtual Gym Buddy",
      ],
      tech: ["MediaPipe", "LangChain", "FAISS", "Flan-T5", "Random Forest", "Streamlit", "Gradio"],
      link: "#",
    },
    {
      title: "Multimodal Abuse Classifier",
      subtitle: "CLIP + RoBERTa with Gated Fusion & PEFT",
      icon: <Shield size={20} />,
      badge: "Multimodal NLP",
      description:
        "Multimodal classifier for abusive content in memes using gated cross-modal fusion of CLIP visual features and transformer text embeddings with LoRA fine-tuning.",
      bullets: [
        "Gated cross-modal fusion of CLIP ViT visual + RoBERTa text embeddings",
        "LoRA PEFT: ≈98.5% reduction in trainable params, ≈2× faster training & lower memory",
        "Learned modality-gating: text dominant (≈73%), visual meaningful on ambiguous memes",
        "Evaluated on Memotion-7K, Jigsaw Toxic + 3 more datasets with per-class failure analysis",
      ],
      tech: ["CLIP ViT", "RoBERTa", "LoRA / PEFT", "EasyOCR", "Gated Fusion", "PyTorch"],
      link: "#",
    },
    {
      title: "Secure VR Framework",
      subtitle: "Multi-User Encrypted Media Playback — BTP (Ongoing)",
      icon: <Globe size={20} />,
      badge: "Ongoing Research",
      description:
        "Synchronised multi-headset VR control system with encrypted media playback to prevent screen capture, targeting low-latency deployment for educational use cases.",
      bullets: [
        "Synchronised multi-headset VR control architecture",
        "Encrypted media playback preventing screen capture exploits",
        "Low-latency deployment pipeline for educational environments",
      ],
      tech: ["VR Systems", "Encryption", "Low-Latency Networking", "AR/VR"],
      link: "#",
    },
  ];

  const skillGroups = [
    {
      category: "ML / DL Frameworks",
      icon: <BrainCircuit size={18} />,
      items: ["PyTorch & TensorFlow", "Transformers (HuggingFace)", "PEFT / LoRA", "Scikit-learn & Keras"],
    },
    {
      category: "Computer Vision & NLP",
      icon: <Eye size={18} />,
      items: ["MediaPipe & OpenCV", "CLIP ViT & timm", "LangChain & FAISS", "Sentence Transformers"],
    },
    {
      category: "ML Specialties",
      icon: <Activity size={18} />,
      items: ["Time-Series (Prophet)", "LightGBM & XGBoost", "IsolationForest", "Feature Engineering"],
    },
    {
      category: "Full-Stack & APIs",
      icon: <Code2 size={18} />,
      items: ["React 18 & Next.js 14", "FastAPI & Python", "TypeScript & Tailwind", "REST API Design"],
    },
    {
      category: "MLOps & Infrastructure",
      icon: <Cpu size={18} />,
      items: ["Docker (Multi-stage)", "Streamlit & Gradio", "APScheduler & Uvicorn", "Vercel & Git"],
    },
    {
      category: "Geospatial & Data",
      icon: <Map size={18} />,
      items: ["Google Earth Engine", "earthaccess & SAR", "Pandas & NumPy", "Plotly & Seaborn"],
    },
  ];

  const researchAreas = [
    "AI System Engineering",
    "Real-time Inference Pipelines",
    "Multimodal Learning",
    "Parameter-Efficient Fine-Tuning",
    "Applied NLP",
    "Medical AI",
    "Time-Series Forecasting",
    "AR/VR Systems",
    "Geospatial Data Engineering",
    "Remote Sensing",
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFA] text-slate-800 font-sans selection:bg-teal-200 relative overflow-x-hidden">

      {/* ── Subtle top teal glow (very soft) ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-teal-400/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <header className="mb-28 mt-10">

          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-8 border border-teal-200">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            Open to AI · ML Engineer · Data Scientist roles
          </div>

          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-2 leading-none">
            Anish
          </h1>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              Eda.
            </span>
          </h1>

          {/* Tagline */}
          <p className="max-w-2xl text-lg md:text-xl text-slate-500 leading-relaxed font-light mb-3">
            Fourth-year B.Tech AI & DS student at{" "}
            <span className="text-slate-800 font-medium">IIIT Sri City</span> building
            production-ready AI systems across computer vision, NLP,
            geospatial engineering, and clinical ML.
          </p>
          <p className="max-w-xl text-slate-400 text-sm mb-10">
            From ViT-based ophthalmic screeners to satellite flood mapping — I ship systems, not just notebooks.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="mailto:anish.e23@iiits.in"
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all hover:scale-105 shadow-md shadow-teal-200"
            >
              <Mail size={17} />
              Get in touch
            </Link>
            <Link
              href="https://github.com/anisheda3"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-all hover:scale-105 shadow-sm"
            >
              <FaGithub size={17} />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/anish-eda-241b77260"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 bg-white text-slate-700 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all hover:scale-105 shadow-sm"
            >
              <FaLinkedin size={17} />
              LinkedIn
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-teal-100 transition-all"
              >
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  {s.icon}
                  {s.label}
                </div>
                <p className="text-3xl font-black text-slate-900">{s.value}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ════════════════════════════════════════
            EXPERIENCE
        ════════════════════════════════════════ */}
        <section className="mb-28">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
              <Briefcase className="text-teal-600" size={20} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Experience</h2>
          </div>

          <div className="space-y-5">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="group relative bg-white border border-slate-100 rounded-2xl p-8 hover:border-teal-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Left teal accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      <span className="px-2.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-medium">
                        {exp.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-teal-600 font-semibold">{exp.company}</span>
                      <span className="text-slate-300 text-sm">·</span>
                      <span className="text-slate-400 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed mb-5 max-w-3xl text-sm">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full"
                        >
                          <ChevronRight size={10} className="text-teal-500" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROJECTS
        ════════════════════════════════════════ */}
        <section className="mb-28">
          <div className="flex justify-between items-end mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                <Database className="text-teal-600" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Built & Shipped</h2>
            </div>
            <Link
              href="https://github.com/anisheda3"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
            >
              Full archive <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative bg-white border rounded-2xl p-8 transition-all duration-300 cursor-pointer shadow-sm
                  ${activeProject === index
                    ? "border-teal-300 shadow-md shadow-teal-50"
                    : "border-slate-100 hover:border-teal-200 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                onClick={() =>
                  setActiveProject(activeProject === index ? null : index)
                }
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-teal-600">
                    {project.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 rounded-full">
                      {project.badge}
                    </span>
                    <Link
                      href={project.link}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-300 hover:text-teal-600 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-teal-600 mb-3 opacity-80">
                  {project.subtitle}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Expandable bullets */}
                {activeProject === index && (
                  <ul className="space-y-2.5 mb-5 border-t border-slate-100 pt-5">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <ChevronRight size={12} className="text-teal-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {activeProject !== index && (
                  <p className="text-xs text-slate-300 mb-4">Click to expand ↓</p>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200 rounded-full hover:border-teal-200 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            SKILLS
        ════════════════════════════════════════ */}
        <section className="mb-28">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
              <Cpu className="text-teal-600" size={20} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Technical Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((skill, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-teal-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-teal-50 border border-teal-100 text-teal-600">
                    {skill.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800">{skill.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Languages row */}
          <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-medium">
              Languages
            </p>
            <div className="flex flex-wrap gap-3">
              {["Python", "C", "Java", "R", "SQL"].map((lang, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-medium border border-slate-200 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-colors cursor-default"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            RESEARCH INTERESTS
        ════════════════════════════════════════ */}
        <section className="mb-28">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
              <Zap className="text-teal-600" size={20} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Research Interests</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {researchAreas.map((area, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all cursor-default shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            EDUCATION
        ════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
              <GraduationCap className="text-teal-600" size={20} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Education</h2>
          </div>

          <div className="space-y-4">
            {/* Primary */}
            <div className="relative bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:border-teal-200 hover:shadow-md transition-all overflow-hidden">
              {/* Decorative teal corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[80px] pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 relative">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Indian Institute of Information Technology, Sri City
                  </h3>
                  <p className="text-teal-600 font-medium mb-1">
                    B.Tech — Artificial Intelligence and Data Science
                  </p>
                  <p className="text-slate-400 text-sm">2023 – 2027</p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <p className="text-4xl font-black text-slate-900">8.5</p>
                  <p className="text-slate-400 text-xs">CGPA · 5th Semester</p>
                </div>
              </div>
            </div>

            {/* Secondary row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-teal-200 hover:shadow-md transition-all">
                <h3 className="text-base font-bold text-slate-900 mb-1">Narayana Junior College</h3>
                <p className="text-slate-500 text-sm mb-1">Intermediate — MPC</p>
                <p className="text-slate-400 text-xs mb-4">2021 – 2023</p>
                <p className="text-3xl font-black text-slate-900">
                  9.79{" "}
                  <span className="text-sm text-slate-400 font-normal">CGPA</span>
                </p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-teal-200 hover:shadow-md transition-all">
                <h3 className="text-base font-bold text-slate-900 mb-1">Nirmala High School</h3>
                <p className="text-slate-500 text-sm mb-1">Secondary Education</p>
                <p className="text-slate-400 text-xs mb-4">2009 – 2021</p>
                <p className="text-3xl font-black text-slate-900">
                  9.5{" "}
                  <span className="text-sm text-slate-400 font-normal">CGPA</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FOOTER CTA
        ════════════════════════════════════════ */}
        <footer className="border-t border-slate-200 pt-16 pb-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Let's build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                remarkable.
              </span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
              Open to AI / ML engineering roles, research collaborations, and interesting problems.
            </p>
            <div className="flex justify-center items-center gap-5">
              <Link
                href="mailto:anish.e23@iiits.in"
                className="flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all hover:scale-105 shadow-md shadow-teal-100"
              >
                <Mail size={17} />
                anish.e23@iiits.in
              </Link>
              <Link
                href="https://github.com/anisheda3"
                target="_blank"
                className="text-slate-400 hover:text-slate-900 transition-colors hover:scale-110"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                href="https://linkedin.com/in/anish-eda-241b77260"
                target="_blank"
                className="text-slate-400 hover:text-[#0A66C2] transition-colors hover:scale-110"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
          <p className="text-center text-slate-300 text-xs">
            © 2025 Anish Eda · Built with Next.js & Tailwind CSS
          </p>
        </footer>

      </div>
    </main>
  );
}