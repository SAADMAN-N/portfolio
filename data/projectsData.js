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
        code: `graph TD
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
