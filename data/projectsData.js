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
    liveUrl: "https://sharfsadman.dev",
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
