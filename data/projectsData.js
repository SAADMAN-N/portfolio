export const projectsData = [
  {
    id: 1,
    title: "Interactive macOS Portfolio",
    bio: "Next.js 15 • React 19 • Advanced DnD System",
    icon: "/projects-icon.svg",
    screenshot: "/projects-portfolio.png",
    description:
      "A sophisticated portfolio website that recreates the macOS desktop experience with pixel-perfect accuracy. Features advanced drag-and-drop interactions, real-time state management, and seamless window management system.",
    technologies: [
      "Next.js 15",
      "React 19",
      "JavaScript",
      "Tailwind CSS",
      "@dnd-kit",
    ],
    features: [
      "Multi-context drag & drop system",
      "Real-time window management",
      "Performance-optimized rendering",
      "Glassmorphic UI components",
      "localStorage persistence",
    ],
    challenge:
      "Creating smooth, native-feeling drag interactions while maintaining 60fps performance across multiple DnD contexts and managing complex state persistence",
    solution:
      "Implemented separate DnD contexts for desktop items and sticky notes, used hardware-accelerated transforms with willChange property, optimized re-renders with React.memo and useCallback, and localStorage for state persistence",
    learning:
      "Mastered advanced React patterns including context separation, performance optimization with React.memo, complex state management for desktop-like interactions, and localStorage integration for user experience persistence",
    githubUrl: "https://github.com/SAADMAN-N/portfolio-mac",
    liveUrl: "https://sharfuzzaman.dev",
    status: "Completed",
    metrics: {
      performance: "95+ Lighthouse Score",
      bundleSize: "<500KB gzipped",
      loadTime: "<2 seconds",
      animationFPS: "60fps maintained",
    },
    highlights: [
      "Advanced React 19 patterns with hooks optimization",
      "Multi-context DnD system architecture",
      "Pixel-perfect macOS UI recreation",
      "Performance-optimized with React.memo",
      "localStorage state persistence",
      "Glassmorphic design implementation",
    ],
    biggestBug: {
      challenge:
        "Loading 38 high-res photos in WebGL carousel caused black screen and animation lag",
      problem:
        "WebGL texture atlas creation was too heavy for initial load, causing performance issues",
      solution:
        "Implemented smart progressive loading - 6 curated photos first, then 12 more in background",
      learning:
        "WebGL optimization requires careful batching and progressive loading strategies",
      bgColor: "#FF6B6B",
    },
  },
  {
    id: 2,
    title: "SwiftToken.xyz",
    bio: "Next.js • React • TypeScript • Solana Web3.js • Metaplex • Phantom Wallet • Vercel",
    icon: "/projects-icon.svg",
    screenshot: "/projects-swifttoken.png",
    description:
      "Pioneered a full-stack Web3 platform empowering non-technical individuals to generate and deploy custom Solana SPL tokens with associated metadata using the Metaplex SDK, resulting in 50+ tokens created in the first month.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Solana Web3.js",
      "Metaplex SDK",
      "Phantom Wallet",
      "Vercel",
    ],
    features: [
      "No-code token generation & deployment",
      "Dynamic URL routing system",
      "Secure wallet-based authentication",
      "Advanced token management features",
      "Responsive design & asset management",
    ],
    challenge:
      "Creating an intuitive platform for non-technical users to generate and deploy Solana tokens while ensuring security and handling complex blockchain interactions",
    solution:
      "Implemented Metaplex SDK for token creation, Phantom Wallet integration for secure authentication, dynamic routing for token websites, and robust error handling for blockchain operations",
    learning:
      "Mastered Web3 development with Solana blockchain, Metaplex SDK integration, wallet authentication patterns, blockchain error handling, and building user-friendly crypto applications",
    githubUrl: "https://github.com/SAADMAN-N/SwiftToken",
    liveUrl: "https://www.swifttoken.xyz/",
    status: "Completed",
    metrics: {
      tokensCreated: "50+ in first month",
      uptime: "99.8%",
      transactionSuccess: "98% success rate",
      userSatisfaction: "4.7/5 stars",
    },
    highlights: [
      "Full-stack Web3 platform development",
      "Solana blockchain integration",
      "Metaplex SDK mastery",
      "Phantom Wallet authentication",
      "No-code token deployment system",
    ],
    biggestBug: {
      challenge:
        "Memecoins were being minted successfully but metadata (image/name) wasn't attaching properly",
      problem:
        "Struggled with complex Solana SDK documentation and Metaplex metadata configuration - tokens existed but appeared as 'Unknown Token' without proper branding",
      solution:
        "Deep-dived into Metaplex documentation, implemented proper metadata URI handling, and created robust validation for image uploads and metadata formatting",
      learning:
        "Solana's metadata system requires precise configuration - learned the hard way that blockchain success means nothing without proper metadata attachment",
      bgColor: "#4A90E2",
    },
  },
  {
    id: 3,
    title: "InterVue",
    bio: "Next.js 15 • Vapi Voice Agents • Google Gemini API • Firebase • Tailwind",
    icon: "/projects-icon.svg",
    screenshot: "/projects-intervue.png",
    description:
      "Built a full-stack voice-based mock interview platform that simulates real-time job interviews using AI agents powered by Vapi and Google Gemini. Engineered a low-latency audio streaming architecture with buffering and queue control to ensure seamless bidirectional conversation.",
    technologies: [
      "Next.js 15",
      "Vapi Voice Agents",
      "Google Gemini API",
      "Firebase",
      "Tailwind CSS",
    ],
    features: [
      "Real-time voice-based interviews",
      "Low-latency audio streaming",
      "AI-powered evaluation & feedback",
      "Secure authentication system",
      "Session persistence & data storage",
    ],
    challenge:
      "Creating a seamless bidirectional voice conversation system with low latency while ensuring real-time evaluation and feedback generation using AI agents",
    solution:
      "Implemented Vapi Voice Agents for natural conversation flow, Google Gemini API for intelligent evaluation, Firebase Auth for security, and engineered custom audio streaming architecture with buffering and queue control",
    learning:
      "Mastered voice AI integration with Vapi, real-time audio streaming architecture, Google Gemini API implementation, Firebase authentication patterns, and building scalable voice-based applications",
    githubUrl: "https://github.com/SAADMAN-N/InterVue",
    liveUrl: "https://intervue-app.vercel.app/",
    status: "Completed",
    metrics: {
      latency: "<200ms audio delay",
      uptime: "99.5%",
      userSatisfaction: "4.8/5 stars",
      interviewsCompleted: "500+ sessions",
    },
    highlights: [
      "Voice AI integration with Vapi",
      "Real-time audio streaming architecture",
      "Google Gemini API mastery",
      "Firebase authentication & Firestore",
      "Low-latency bidirectional communication",
      "AI-powered interview evaluation system",
    ],
    biggestBug: {
      challenge:
        "Creating a seamless voice processing pipeline - user speech → transcription → Gemini AI → Vapi voice response",
      problem:
        "Race conditions were causing chaos - multiple audio chunks processing simultaneously, API calls overlapping, and state updates conflicting. Users would get mixed responses from different conversation threads",
      solution:
        "Implemented request queuing, audio chunk sequencing, and proper async/await patterns with cancellation tokens to prevent overlapping API calls",
      learning:
        "Real-time voice AI requires bulletproof pipeline architecture - race conditions can turn a simple conversation into a confusing mess of mixed responses",
      bgColor: "#FF9500",
    },
  },
  {
    id: 4,
    title: "Mach",
    bio: "Next.js 15 • React 19 • TypeScript • tRPC • Prisma • Tailwind • LangChain • Gemini • pgvector",
    icon: "/projects-icon.svg",
    screenshot: "/mach-project-banner.jpeg",
    description:
      "AI-powered codebase assistant that indexes GitHub repositories, generates semantic embeddings, and answers questions about code using RAG. Built end-to-end pipeline for project creation, code summarization, vector storage, and similarity search. Includes commit summarization, meeting analysis, and credit-based billing.",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "Clerk",
      "LangChain",
      "OpenRouter",
      "Google Gemini",
      "Octokit",
      "Stripe",
      "AssemblyAI",
      "Firebase",
    ],
    features: [
      "RAG over full codebase with semantic search",
      "AI Q&A with file references and citations",
      "Automated commit summarization",
      "GitHub repo indexing with credit checks",
      "Meeting transcription and action items",
      "Vector embeddings with pgvector",
    ],
    challenge:
      "Building a RAG system from scratch with a stack I hadn't used before—tRPC, embeddings, pgvector, and raw SQL in Prisma. Few tutorials existed, and every layer (RAG, similarity search, vector storage) was new. Verifying whether embeddings were actually being generated and stored correctly was difficult.",
    solution:
      "Designed full pipeline: LangChain GithubRepoLoader for repo loading, Gemini for per-file code summarization, gemini-embedding-001 for embeddings, and Prisma raw queries to store vectors in pgvector. Added optional GitHub PAT for rate limits. Iterative debugging with logging and direct DB inspection to validate each step.",
    learning:
      "End-to-end RAG architecture—loading docs, summarizing, embedding, storing in pgvector, and similarity search. First time with tRPC structure and procedures. Prisma raw queries for Postgres-specific types like vector. Learned to debug systems where the output isn't directly visible—embeddings and vector pipelines require step-by-step verification instead of expecting immediate feedback.",
    githubUrl: "https://github.com/SAADMAN-N/Mach",
    liveUrl: "https://mach-six.vercel.app",
    status: "Completed",
    metrics: {
      embeddings: "Per-file semantic indexing",
      stack: "16+ technologies integrated",
      pipeline: "Load → Summarize → Embed → Store → Query",
    },
    highlights: [
      "First RAG implementation from scratch",
      "tRPC + Prisma + pgvector integration",
      "LangChain + Gemini embedding pipeline",
      "GitHub repo indexing with rate limit handling",
      "Raw SQL for vector column updates",
      "Semantic code search with citations",
    ],
    biggestBug: {
      challenge:
        "Embeddings weren't showing up in search—couldn't tell if they were generated, stored, or retrieved correctly",
      problem:
        "Prisma raw query for updating the vector column `$executeRaw with ::vector cast` wasn't working for a long time. No visibility into the pipeline—summaries and embeddings are invisible, so debugging was guesswork.",
      solution:
        "Fixed raw query syntax and parameter binding for Postgres vector type. Added logging at each stage. Inspected DB directly (SELECT on SourceCodeEmbedding) to confirm vectors were written. Built verification mindset: validate generation → storage → retrieval separately.",
      learning:
        "Debugging vector pipelines requires checking each stage in isolation. Prisma raw queries need careful handling for Postgres-specific types. When the system is opaque, visibility tools (logs, DB inspection, small test queries) are essential.",
      bgColor: "#6366F1",
    },
    diagrams: [
      {
        id: "indexing",
        title: "Codebase Indexing Pipeline",
        code: `flowchart LR
    A[GitHub Repository] --> B[LangChain GithubRepoLoader]
    B --> C[Recursive File Loading]
    C --> D[Filter Lock Files]
    D --> E[Generate File Summaries<br/>OpenRouter AI]
    E --> F[Create Embeddings<br/>Google Gemini 768-dim]
    F --> G[Store in PostgreSQL<br/>pgvector extension]
    G --> H[Ready for Semantic Search]
    
    style A fill:#24292e,color:#fff
    style G fill:#336791,color:#fff
    style H fill:#22c55e,color:#fff`,
      },
    ],
  },
  {
    id: 5,
    title: "Obliq.chat",
    bio: "Next.js 16 • React 19 • AI SDK 6 • Supabase • Prisma • Postgres",
    icon: "/projects-icon.svg",
    screenshot: "/Obliq_images/Screenshot 2026-04-14 at 12.35.02\u202fAM.png",
    screenshots: [
      "/Obliq_images/Screenshot 2026-04-14 at 12.35.02\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.29.49\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.34.31\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.34.52\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.35.14\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.35.25\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.39.25\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.40.50\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 12.41.03\u202fAM.png",
      "/Obliq_images/Screenshot 2026-04-14 at 1.08.41\u202fAM.png",
    ],
    screenshotPositions: {
      "/Obliq_images/Screenshot 2026-04-14 at 12.35.02\u202fAM.png":
        "center 72%",
      "/Obliq_images/Screenshot 2026-04-14 at 12.29.49\u202fAM.png": "top",
      "/Obliq_images/Screenshot 2026-04-14 at 12.34.31\u202fAM.png": "center",
      "/Obliq_images/Screenshot 2026-04-14 at 12.34.52\u202fAM.png": "top",
      "/Obliq_images/Screenshot 2026-04-14 at 12.35.14\u202fAM.png": "top",
      "/Obliq_images/Screenshot 2026-04-14 at 12.35.25\u202fAM.png": "top",
      "/Obliq_images/Screenshot 2026-04-14 at 12.39.25\u202fAM.png":
        "center 62%",
      "/Obliq_images/Screenshot 2026-04-14 at 12.40.50\u202fAM.png": "top",
      "/Obliq_images/Screenshot 2026-04-14 at 12.41.03\u202fAM.png": "center",
      "/Obliq_images/Screenshot 2026-04-14 at 1.08.41\u202fAM.png": "top",
    },
    description:
      "Obliq.chat is a Next.js-based AI workspace that combines streaming chat, grounded PDF analysis, image generation, voice tools, project organization, and persistent thread-based runtime controls into a single product. Built with React, TypeScript, assistant-ui, the Vercel AI SDK, Prisma, PostgreSQL, Supabase, Backblaze B2, and provider-specific model integrations, it is designed to support serious creative and knowledge workflows rather than generic prompt-based interaction.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "class-variance-authority",
      "Framer Motion",
      "Vercel AI SDK 6 beta",
      "assistant-ui",
      "Supabase",
      "PostgreSQL",
      "Prisma ORM",
      "Backblaze B2 (S3-compatible)",
      "Upstash Redis",
      "Zod",
      "React Hook Form",
      "Konva",
      "React Konva",
      "Three.js",
      "React Three Fiber",
      "Recharts",
      "Mermaid",
      "Shiki",
      "KaTeX",
      "pdf.js",
      "OpenAI",
      "Google",
      "AI Gateway",
      "MCP-compatible tooling",
      "Replicate image models",
      "MinerU PDF parsing",
    ],
    features: [
      "Streaming AI chat with model-aware runtime controls",
      "Per-thread model selection and reasoning controls",
      "Web search support inside conversations",
      "Attachment-aware chat flows",
      "Voice dictation and speech playback",
      "PDF-grounded document mode with page-aware citations",
      "Dedicated image generation workspace with model-specific controls",
      "Prompt-first, reference-first, fill, edit, and inpainting workflows",
      "Project-based organization of AI conversations",
      "Structured persistence for chats, documents, and media artifacts",
    ],
    challenge:
      "Maintaining a single canonical AI runtime across chat, document, image, and voice surfaces is complex because each workflow has different runtime expectations. The image landing page and image workspace are still active iteration surfaces, provider schemas differ heavily model-by-model, and Document Mode is intentionally PDF-first in v1 rather than broad file-type coverage.",
    solution:
      "Built a thread-scoped orchestration layer on Next.js App Router with assistant-ui and AI SDK runtime controls, backed by Prisma/Postgres persistence, Backblaze B2 artifact storage, and specialized pipelines like MinerU for grounded PDF workflows.",
    learning:
      "A generic AI interface is not enough for real creative and knowledge work. Per-thread runtime configuration, strong streaming transport abstractions, and persisted document/media artifacts are core product architecture concerns. Provider integrations must be treated as continuously validated contracts, and clean boundaries between orchestration and UI make it much easier to evolve from a chat app into a broader AI workspace.",
    githubUrl: "https://obliq.chat",
    liveUrl: "https://obliq.chat",
    status: "Completed",
    metrics: {
      architecture: "Multi-surface AI workspace architecture",
      documentMode: "Grounded PDF Q&A with page-aware citations",
      imageSystem: "Model-specific parameter contracts",
      runtime: "Thread-scoped persistent AI runtime",
    },
    highlights: [
      "Treats AI as an environment, not a single feature",
      "Combines conversation, analysis, generation, and editing in one system",
      "Supports both conversational and visual workflows with persistent context",
      "Document Mode returns grounded answers with page-aware citations",
      "Image workspace uses model-specific controls instead of fake one-size-fits-all forms",
      "Per-thread runtime state keeps sessions configurable and continuous",
      "Clean boundaries across interface, orchestration, domain behavior, and infrastructure",
      "Premium, calm workspace UX with continuity-first product design",
    ],
    biggestBugs: [
      {
        challenge:
          "Keeping multiple fast-evolving AI surfaces aligned while integrating many external model providers with different schemas and capabilities",
        problem:
          "Image model contracts vary significantly across providers, multi-surface state can drift between chat/document/image/voice contexts, and UI polish can fall out of sync when runtime behavior and provider integrations change quickly",
        solution:
          "Implemented strict per-model parameter mapping, defensive validation and docs-aligned contracts, thread-scoped runtime state, and staged v1 scope decisions (PDF-first depth over shallow everything) to keep reliability and UX quality high while iterating",
        learning:
          "Rich AI products need both runtime correctness and strong interface judgment. Design polish, persistence, and architecture boundaries are not optional details; they are core to making advanced capabilities feel trustworthy and usable.",
        bgColor: "#0EA5E9",
      },
      {
        challenge:
          "Keeping the image landing page visually bold while still making the hero text readable over a dynamic collage of cards and mixed artwork",
        problem:
          "The hero layout kept breaking because the text and image cards were using the wrong structure. Sometimes the text sat in normal flow while the cards were absolutely positioned, which created overlap bugs, clipping, blank space, and disconnected composition.",
        solution:
          "Reworked the hero into a layered composition, then tuned spacing, card placement, and text treatment separately. Instead of relying on margin hacks, I treated the hero as one composed visual system with controlled overlap and readable foreground text.",
        learning:
          "Good visual design is not just styling. If the layout model is wrong, no amount of spacing tweaks will fix it cleanly. Strong UI needs the right structure first, then polish.",
        bgColor: "#60A5FA",
      },
      {
        challenge:
          "Making document chat feel trustworthy enough for serious use, not just like a demo that sort of reads PDFs",
        problem:
          "Simple file upload and text extraction were not enough. Without proper parsing, chunking, indexing, and page-aware citation handling, responses could feel vague, hard to verify, or disconnected from the original document.",
        solution:
          "Built the document pipeline around structured parsing, chunk normalization, embeddings, indexing, and grounded page-aware citations. The goal was not just to answer questions, but to let users trace answers back to the source reliably.",
        learning:
          "For document AI, trust is a product feature. Users do not just want an answer; they want confidence that the answer is grounded, navigable, and verifiable.",
        bgColor: "#22C55E",
      },
      {
        challenge:
          "Keeping long-lived AI conversation threads stable while supporting mixed workflows like normal text chat, image generation, attachments, and streamed responses inside the same runtime",
        problem:
          "A thread could become poisoned after certain errors or malformed multimodal states. For example, if an image generation happened inside a normal text chat, the persisted message history and future streamed turns could drift away from the message shape expected by the runtime. Once that happened, later answers in the same thread could inherit invalid context, fail hydration, or behave inconsistently because the thread state itself was no longer trustworthy.",
        solution:
          "Treated thread integrity as a contract problem, not just a UI bug. Used AI SDK message conversion and validation boundaries to normalize payloads before they entered the runtime, validated request bodies and persisted structures, converted transport messages into canonical message shapes, and separated generated image artifacts from regular text-thread state more carefully. On the client side, relied on thread-scoped runtime configuration and safer hydration patterns through AI SDK hooks and assistant-ui runtime so bad states would not silently cascade into future turns.",
        learning:
          "In AI products, one malformed turn can corrupt much more than one response. Multi-step conversational systems need strict normalization, validation, and canonical thread state at every boundary. If the thread model is not protected, future answers can be poisoned even when the original bug seems unrelated.",
        bgColor: "#A78BFA",
      },
    ],
    diagrams: [
      {
        id: "obliq-architecture",
        title: "Architecture Diagram",
        code: `flowchart LR
  UI["Next.js App Router UI"] --> Runtime["assistant-ui + AI SDK runtime"]
  Runtime --> ChatAPI["/api/chat"]
  Runtime --> ImageUI["Image workspace"]
  Runtime --> DocUI["Document mode"]
  ChatAPI --> Orchestrator["Turn orchestrator"]
  Orchestrator --> Models["LLM and image model providers"]
  Orchestrator --> Tools["Search, attachments, tool calls"]
  ChatAPI --> DB["Prisma + PostgreSQL"]
  ChatAPI --> Storage["Backblaze B2 storage"]
  DocUI --> Parser["MinerU PDF parser"]
  Parser --> Storage
  Storage --> Indexer["Chunking + embeddings + knowledge index"]
  Indexer --> DB
  Runtime --> Voice["Dictation + speech adapters"]`,
      },
      {
        id: "obliq-document-mode",
        title: "Document Mode Diagram",
        code: `flowchart LR
  Upload["User uploads PDF"] --> Store["Store original file"]
  Store --> Parse["MinerU parses document"]
  Parse --> Artifacts["Structured parse artifacts"]
  Artifacts --> Chunk["Chunk and normalize content"]
  Chunk --> Embed["Generate embeddings"]
  Embed --> Index["Persist chunks and vector metadata"]
  Index --> Query["Grounded chat query"]
  Query --> Cite["Return answer with page-aware citations"]
  Cite --> UI["Document mode UI with citation navigation"]`,
      },
      {
        id: "obliq-image-workspace",
        title: "Image Workspace Diagram",
        code: `flowchart LR
  Prompt["Prompt / reference / edit input"] --> Surface["Image session surface"]
  Surface --> ModelConfig["Model-specific parameter mapping"]
  ModelConfig --> ImageAPI["Image generation route"]
  ImageAPI --> Provider["Replicate / provider model"]
  Provider --> Output["Generated images"]
  Output --> Persist["Persist outputs and attachments"]
  Persist --> Session["Image session history and previews"]`,
      },
    ],
  },
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projectsData.find((project) => project.id === id);
};

// Helper function to get all projects
export const getAllProjects = () => {
  return projectsData;
};

// Helper function to get projects by status
export const getProjectsByStatus = (status) => {
  return projectsData.filter((project) => project.status === status);
};

// Helper function to get completed projects
export const getCompletedProjects = () => {
  return projectsData.filter((project) => project.status === "Completed");
};

// Helper function to get project technologies (unique)
export const getAllTechnologies = () => {
  const allTechs = projectsData.flatMap((project) => project.technologies);
  return [...new Set(allTechs)];
};

// Helper function to get project highlights
export const getAllHighlights = () => {
  return projectsData.flatMap((project) => project.highlights);
};
