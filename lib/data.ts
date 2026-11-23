// All portfolio content lives here, so updating the site never means touching layout code.

export const site = {
  name: "Anish Eda",
  role: "AI Engineer",
  url: "https://anish-portfolio-ecru.vercel.app",
  email: "anish.e23@iiits.in",
  github: "https://github.com/anisheda3",
  linkedin: "https://www.linkedin.com/in/anish-eda-241b772b0/",
  location: "Vijayawada, India",
  description:
    "Anish Eda builds production AI systems: retrieval-grounded LLM tutors, fine-tuned models, agentic workflows, computer vision and calibrated ML decision engines.",
};

export const roles = [
  "AI Engineer",
  "ML Engineer",
  "LLM & RAG Systems",
  "Data Scientist",
];

export type Category =
  | "LLMs & NLP"
  | "Agentic AI"
  | "Computer Vision"
  | "ML & Data"
  | "Research";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "code" | "live" | "download";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  role?: string;
  status?: string;
  summary: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  pipeline: string[];
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "saarthi",
    title: "Signals Saarthi",
    tagline: "Course-grounded AI tutor",
    category: "LLMs & NLP",
    role: "Worked in the AI team · IIIT Sri City",
    status: "Ongoing",
    featured: true,
    summary:
      "An AI tutor that answers only from a student's own course material, with page and lecture-timestamp citations, hints before solutions, and a refusal when the material doesn't cover the question.",
    metrics: [
      { value: "99.9%", label: "answers citing their source after fine-tuning (from 69%)" },
      { value: "0.92", label: "retrieval hit@3 on the gold set" },
      { value: "3.4 s", label: "p95 latency for 5 students (from 12 s)" },
    ],
    highlights: [
      "Worked in the AI core: hybrid dense + BM25 retrieval fused with RRF and an fp16 cross-encoder reranker, a coverage gate that refuses uncovered questions without calling a model, and citation checks with a critic after every answer.",
      "Built a 10-stage GPU pipeline (faster-whisper transcription, vision-model OCR, RAFT training-data generation) that turned 146 lecture videos and 122 note PDFs into a 7,291-chunk knowledge base, and ran it myself over three days on the college GPU.",
      "QLoRA fine-tuned Qwen3-14B on 6,429 examples and exported it to Ollama. On 788 held-out examples it kept the base model's accuracy while inline citations rose from 69% to 99.9% and correct refusals from 45% to 61%.",
      "Ran a security review and fixed 8 issues, including a critical Code Lab secret leak, prompt injection through uploaded files (5/8 → 0/8 obeyed) and XSS in AI answers; added PII scrubbing at every model call.",
      "Added a Socratic hint ladder, a semantic cache (repeat questions in under 0.1 s), tiered model routing with a token budget and an instructor review queue, and grew the test suite from 18 to 100.",
    ],
    pipeline: ["Lectures + notes", "Whisper · OCR", "Hybrid retrieval", "Coverage gate", "Qwen3-14B (fine-tuned)", "Cited answer"],
    stack: ["Python", "FastAPI", "Ollama", "Qwen3", "QLoRA · Unsloth", "FAISS", "BM25", "Reranker", "faster-whisper", "React", "TypeScript"],
    links: [{ label: "Code", href: "https://github.com/DevaP06/Hello-Saarthi-26", kind: "code" }],
  },
  {
    slug: "dispute-sentinel",
    title: "Dispute Sentinel",
    tagline: "Chargeback decisions by expected value",
    category: "ML & Data",
    featured: true,
    summary:
      "A chargeback risk manager that decides which disputes are worth fighting, by expected value in rupees, then assembles the reason-code-correct evidence packet to fight them.",
    metrics: [
      { value: "+30%", label: "net value vs. contesting everything (807 held-out disputes)" },
      { value: "0.043", label: "calibration error after isotonic (from 0.128)" },
      { value: "11", label: "guardrails between a decision and an action" },
    ],
    highlights: [
      "The decision engine contests a dispute only when p(win) ≥ C/A, so a ₹500 dispute at 70% odds is accepted while a ₹50,000 one at 30% is fought.",
      "Calibrated win-probability model (logistic regression / gradient boosting, grouped CV, isotonic) on 54 leakage-checked features; the threshold is chosen on validation and applied unchanged to a hash-pinned test set.",
      "The LLM only drafts the evidence summary: decisions are byte-identical with the LLM disabled, and hallucinated document references are rejected with a template fallback.",
      "11 guardrails (amount cap, irreversible-accept lock, deadline and confidence gates, circuit breakers, kill switch), a payment-gateway client with retries and an SQLite outbox, and an append-only audit log protected by triggers.",
      "Ablation study across 7 policies; a verify command re-runs the evaluation and fails if the reported numbers drift.",
    ],
    pipeline: ["Dispute feed", "54 features", "Calibrated model", "EV = p·A − C", "Guardrails", "Evidence packet"],
    stack: ["Python", "scikit-learn", "FastAPI", "Pydantic", "SQLite", "LLM drafting", "pytest"],
    links: [{ label: "Code", href: "https://github.com/anisheda3/dispute-sentinel-001", kind: "code" }],
  },
  {
    slug: "opthamiss",
    title: "OpthaMiss",
    tagline: "AI-assisted ophthalmic screening",
    category: "Computer Vision",
    featured: true,
    summary:
      "A dual Vision Transformer screening system for anterior-eye and retinal fundus images, returning risk stratification and referral guidance through a deployed web app.",
    metrics: [
      { value: "13", label: "anterior-eye conditions classified" },
      { value: "8", label: "retinal fundus conditions classified" },
      { value: "5-view", label: "test-time augmentation for stable predictions" },
    ],
    highlights: [
      "Two models: a 13-class anterior-eye classifier and a ViT-S/16 8-class fundus classifier.",
      "Separate OpenCV preprocessing per modality: glare removal for anterior images, CLAHE contrast enhancement for fundus images.",
      "3-view (anterior) and 5-view (fundus) test-time augmentation to steady predictions on clinical edge cases.",
      "FastAPI endpoints for anterior, fundus or both, with risk stratification and referral guidance.",
      "Multi-stage Docker build for the backend; frontend deployed on Vercel.",
    ],
    pipeline: ["Eye image", "Glare removal · CLAHE", "ViT + TTA", "Risk score", "Referral guidance"],
    stack: ["PyTorch", "ViT", "timm", "OpenCV", "FastAPI", "Docker", "Next.js", "Vercel"],
    links: [
      { label: "Live demo", href: "https://optha-miss.vercel.app", kind: "live" },
      { label: "Code", href: "https://github.com/anisheda3/OpthaMiss", kind: "code" },
    ],
  },
  {
    slug: "plant-doctor",
    title: "AI Plant Doctor",
    tagline: "AR plant-disease diagnosis & treatment",
    category: "Computer Vision",
    featured: true,
    summary:
      "An Android AR app: photograph a leaf and it identifies the plant and the disease, then teaches spread, treatment, recovery and prevention on an interactive 3D model of that plant.",
    metrics: [
      { value: "142", label: "diseases across 37 plants" },
      { value: "2%", label: "healthy leaves wrongly flagged (from 46%)" },
      { value: "0.85", label: "AUC for disease detection on held-out images" },
    ],
    highlights: [
      "Unity + AR Foundation app that scans a leaf, traces disease regions and anchors a procedurally generated 3D plant twin with shader-driven symptoms.",
      "Scan-quality gate and a CIELAB/Otsu lesion tracer; on held-out PlantSeg and PlantVillage images it cut healthy-leaf false flags from 46% to 2%.",
      "AI layer behind a single result contract: a BioCLIP ViT-B/16 API, a bundled FastAPI/ONNX Runtime server, or an offline demo mode.",
      "Honest uncertainty: confidence is banded and an uncertain result is shown only as a possibility, never as a diagnosis.",
      "221 automated EditMode tests; one SQLite content database shared by the app and the server.",
    ],
    pipeline: ["Leaf photo", "Quality gate", "BioCLIP ViT", "Lesion tracer", "3D plant twin", "Treatment plan"],
    stack: ["Unity", "C#", "AR Foundation", "HLSL", "FastAPI", "ONNX Runtime", "SQLite"],
    links: [
      { label: "Download APK", href: "https://github.com/anisheda3/plantdoc/releases/latest", kind: "download" },
      { label: "Code", href: "https://github.com/anisheda3/plantdoc", kind: "code" },
    ],
  },
  {
    slug: "fyntwin",
    title: "Fyntwin",
    tagline: "Invoice intake & ERP automation",
    category: "Agentic AI",
    summary:
      "An accounts-payable assistant that turns natural-language invoice descriptions into structured data and checks them against live purchase orders before anything is written.",
    metrics: [
      { value: "3", label: "cooperating agents" },
      { value: "100%", label: "invoices human-approved before creation" },
    ],
    highlights: [
      "Converts free-text invoice descriptions into structured data and validates them against live purchase orders.",
      "Agno intake, validation and decision agents with field-level discrepancy reports and persistent session history.",
      "Human approval required before any purchase invoice is created.",
      "ERP reads and writes are separated from agent reasoning to work around model tool-calling incompatibilities, with confirmation and cancellation paths.",
    ],
    pipeline: ["Invoice text", "Intake agent", "PO validation", "Decision agent", "Human approval", "ERPNext"],
    stack: ["Agno", "Gemini API", "ERPNext", "Python", "JavaScript"],
    links: [{ label: "Code", href: "https://github.com/anisheda3/fyntwin-invoice-intake", kind: "code" }],
  },
  {
    slug: "finsight",
    title: "FinSight",
    tagline: "Multi-agent financial planning & analysis",
    category: "Agentic AI",
    summary:
      "A month-end FP&A platform that turns uploaded actuals into forecasts, budget variance reports, anomaly flags and scenario analyses, with human review for material exceptions.",
    metrics: [
      { value: "8", label: "specialist agents in two teams" },
      { value: "80/95%", label: "forecast confidence intervals" },
    ],
    highlights: [
      "Eight specialist Agno agents across analysis and insights teams.",
      "Forecasting with fallbacks and 80%/95% confidence intervals, EBITDA waterfall analysis and optional LLM commentary.",
      "Idempotent ingestion, data lineage and budget versioning.",
      "Temporal signal-based human review for exceptions above KPI-based materiality thresholds.",
    ],
    pipeline: ["Actuals upload", "Ingestion + lineage", "Forecast agents", "Variance + anomalies", "Human review"],
    stack: ["Agno", "Temporal", "Prophet", "PostgreSQL", "FastAPI", "Python"],
    links: [{ label: "Code", href: "https://github.com/anisheda3/finsight-fpa", kind: "code" }],
  },
  {
    slug: "priceguard",
    title: "PriceGuard",
    tagline: "E-commerce price intelligence",
    category: "ML & Data",
    summary:
      "An automated price tracker that detects artificial inflation, forecasts price trends and gives Buy / Wait / Avoid recommendations.",
    metrics: [
      { value: "<2 s", label: "inference latency (from minutes)" },
      { value: "30+", label: "engineered price features" },
    ],
    highlights: [
      "Prophet forecasting, LightGBM 3-class recommendation and Isolation Forest anomaly detection.",
      "30+ features: sale-event context, rolling price statistics, momentum and discount depth against MRP.",
      "Scheduled collection with APScheduler, BeautifulSoup and Selenium.",
      "Caching and model preloading cut average inference latency from minutes to under 2 seconds.",
    ],
    pipeline: ["Scheduled scrape", "30+ features", "Prophet · LightGBM", "Isolation Forest", "Buy / Wait / Avoid"],
    stack: ["Prophet", "LightGBM", "Isolation Forest", "FastAPI", "SQLite", "APScheduler", "Selenium"],
    links: [],
  },
  {
    slug: "fitness",
    title: "AI Fitness Analysis",
    tagline: "Real-time pose analysis + RAG coaching",
    category: "Computer Vision",
    summary:
      "An end-to-end system combining computer vision, retrieval-augmented generation and classical ML for real-time workout analysis and personalised feedback.",
    metrics: [
      { value: "25+ FPS", label: "real-time form analysis" },
      { value: "−35%", label: "false repetition detections" },
    ],
    highlights: [
      "MediaPipe pose analysis with joint-angle geometry and hysteresis for stable repetition counting at 25+ FPS.",
      "RAG over a curated fitness Q&A knowledge base with LangChain, Flan-T5, Sentence Transformers and FAISS.",
      "Random Forest and Gradient Boosting behaviour forecasting with R² above 0.7.",
      "REST API, AI dietician, habit tracker and an LLM virtual gym buddy, with sub-2-second end-to-end latency.",
    ],
    pipeline: ["Webcam", "MediaPipe pose", "Rep counter", "RAG coach", "Feedback"],
    stack: ["MediaPipe", "OpenCV", "LangChain", "FAISS", "Flan-T5", "scikit-learn", "Streamlit", "Gradio"],
    links: [{ label: "Code", href: "https://github.com/anisheda3/ai-fitness-analysis-system", kind: "code" }],
  },
  {
    slug: "multimodal",
    title: "Multimodal Abuse Classifier",
    tagline: "CLIP + RoBERTa with gated fusion & LoRA",
    category: "LLMs & NLP",
    summary:
      "Classifies text and memes as abusive, offensive or non-abusive by fusing CLIP visual features with RoBERTa text embeddings through learned modality gating.",
    metrics: [
      { value: "98.5%", label: "fewer trainable parameters with LoRA" },
      { value: "5", label: "datasets evaluated" },
    ],
    highlights: [
      "Gated cross-modal fusion of CLIP ViT visual features and RoBERTa text embeddings.",
      "LoRA fine-tuning cut trainable parameters by about 98.5%, with roughly 2× lower training time and memory.",
      "Learned gate leans on text (about 73%) and uses the image on ambiguous memes.",
      "Evaluated on five datasets including Memotion-7K and Jigsaw Toxic, with PR curves and per-class failure analysis.",
    ],
    pipeline: ["Meme / text", "OCR", "CLIP + RoBERTa", "Gated fusion", "Label"],
    stack: ["PyTorch", "CLIP ViT", "RoBERTa", "LoRA · PEFT", "EasyOCR"],
    links: [{ label: "Code", href: "https://github.com/anisheda3/multimodal-hate-speech-detection", kind: "code" }],
  },
  {
    slug: "flood-routing",
    title: "Vijayawada Flood Mapping",
    tagline: "Satellite rainfall & SAR inundation",
    category: "Research",
    summary:
      "Automated acquisition of GPM IMERG satellite rainfall and Sentinel-1 SAR flood mapping on Google Earth Engine to study regional inundation patterns.",
    metrics: [
      { value: "2", label: "satellite sources fused" },
    ],
    highlights: [
      "Automated GPM IMERG rainfall acquisition through the earthaccess API.",
      "Sentinel-1 SAR imagery processed on Google Earth Engine for inundation mapping.",
      "Historical flood-extent analysis to find regional inundation patterns.",
      "End-to-end geospatial Python pipeline from ingestion to visualisation.",
    ],
    pipeline: ["GPM IMERG", "Sentinel-1 SAR", "Earth Engine", "Flood extent"],
    stack: ["Python", "Google Earth Engine", "earthaccess", "Sentinel-1", "Remote sensing"],
    links: [],
  },
  {
    slug: "secure-vr",
    title: "Secure VR Framework",
    tagline: "Multi-headset encrypted playback",
    category: "Research",
    status: "B.Tech project · ongoing",
    summary:
      "A synchronised multi-headset VR control system with encrypted media playback that prevents screen capture, aimed at low-latency classroom use.",
    metrics: [],
    highlights: [
      "Synchronised control architecture across multiple headsets.",
      "Encrypted media playback that blocks screen-capture exploits.",
      "Low-latency deployment pipeline for educational settings.",
    ],
    pipeline: ["Instructor", "Sync server", "Encrypted stream", "Headsets"],
    stack: ["VR", "Encryption", "Low-latency networking"],
    links: [],
  },
];

export const categories: ("All" | Category)[] = [
  "All",
  "LLMs & NLP",
  "Agentic AI",
  "Computer Vision",
  "ML & Data",
  "Research",
];

export const experience = [
  {
    role: "AI Team",
    org: "Signals Saarthi · IIIT Sri City",
    period: "Oct 2026 – present",
    summary:
      "Worked in the AI team of a course-grounded tutor: retrieval, grounding, security, evaluation, the GPU data pipeline and the fine-tuned Qwen3-14B model.",
    points: ["Fine-tuned a 14B LLM", "Hybrid RAG + reranking", "8 security fixes", "18 → 100 tests"],
  },
  {
    role: "AI Engineer Intern",
    org: "Ediglobe",
    period: "Completed",
    summary:
      "Implemented core ML algorithms and built complete AI workflows through structured project-based work.",
    points: ["End-to-end ML pipelines", "Production system design"],
  },
  {
    role: "Data Science Intern",
    org: "Finlatics",
    period: "Completed",
    summary:
      "Exploratory analysis, feature engineering and insight-driven modelling on structured and unstructured datasets.",
    points: ["EDA & feature engineering", "Insight-driven modelling"],
  },
  {
    role: "AI Job Bridge Program",
    org: "Unlox Academy",
    period: "Completed",
    summary:
      "Applied training in end-to-end ML development, integration and deployment, including full-stack components.",
    points: ["End-to-end deployment", "Full-stack integration"],
  },
];

export const stats = [
  { value: 11, suffix: "", label: "projects shipped", decimals: 0 },
  { value: 14, suffix: "B", label: "parameter LLM fine-tuned", decimals: 0 },
  { value: 99.9, suffix: "%", label: "grounded-answer citation rate", decimals: 1 },
  { value: 8.65, suffix: "", label: "CGPA at IIIT Sri City", decimals: 2 },
];

export const skillGroups = [
  { title: "LLMs & Fine-tuning", items: ["Ollama", "Qwen3", "QLoRA · Unsloth", "PEFT / LoRA", "RAFT data generation", "GGUF export", "LLM-as-judge eval"] },
  { title: "Retrieval & NLP", items: ["Hybrid retrieval (dense + BM25)", "Cross-encoder reranking", "FAISS", "LangChain", "Sentence Transformers", "faster-whisper", "RoBERTa"] },
  { title: "Agentic Systems", items: ["Agno", "Temporal", "Gemini API", "Human-in-the-loop", "ERPNext integration", "Tool-calling design"] },
  { title: "Computer Vision", items: ["PyTorch", "Vision Transformers", "CLIP · BioCLIP", "MediaPipe", "OpenCV", "Test-time augmentation"] },
  { title: "ML & Forecasting", items: ["scikit-learn", "LightGBM · XGBoost", "Prophet · SARIMA", "Isolation Forest", "Calibration", "Feature engineering"] },
  { title: "Engineering", items: ["FastAPI · Pydantic", "React · Next.js", "TypeScript · Tailwind", "Docker", "PostgreSQL · Redis · SQLite", "Unity · AR Foundation"] },
];

export const marquee = [
  "Python", "PyTorch", "Qwen3", "Ollama", "QLoRA", "FAISS", "BM25", "LangChain", "Agno", "Temporal",
  "FastAPI", "Next.js", "React", "TypeScript", "Docker", "PostgreSQL", "Redis", "OpenCV", "MediaPipe",
  "CLIP", "ViT", "LightGBM", "Prophet", "scikit-learn", "Unity", "ONNX Runtime", "Earth Engine",
];

export const education = [
  {
    school: "Indian Institute of Information Technology, Sri City",
    degree: "B.Tech, Artificial Intelligence and Data Science",
    period: "2023 – 2027",
    score: "8.65",
    scoreLabel: "CGPA · 6 semesters",
    primary: true,
  },
  {
    school: "Narayana Junior College",
    degree: "Intermediate, MPC",
    period: "2021 – 2023",
    score: "9.79",
    scoreLabel: "CGPA",
  },
  {
    school: "Nirmala High School",
    degree: "Secondary education",
    period: "2009 – 2021",
    score: "9.5",
    scoreLabel: "CGPA",
  },
];

export const interests = [
  "Retrieval-augmented generation",
  "LLM fine-tuning & evaluation",
  "AI system engineering",
  "Real-time inference",
  "Agentic workflows",
  "Medical AI",
  "Calibrated decision-making",
  "Time-series forecasting",
  "Remote sensing",
  "AR / VR systems",
];
