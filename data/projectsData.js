export const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    bio: "macOS-inspired portfolio built with Next.js",
    icon: "/projects-icon.svg",
    description:
      "A modern portfolio website that mimics the macOS desktop experience with draggable windows, sticky notes, and interactive elements.",
    technologies: ["Next.js", "React", "Tailwind CSS", "WebGL"],
    features: [
      "Desktop metaphor UI",
      "Drag & drop functionality",
      "Interactive sticky notes",
      "3D photo viewer",
      "Responsive design",
    ],
    githubUrl: "https://github.com/yourusername/portfolio-mac",
    liveUrl: "https://yourportfolio.com",
    status: "Completed",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    bio: "Full-stack e-commerce solution",
    icon: "/projects-icon.svg",
    description:
      "A comprehensive e-commerce platform with user authentication, payment processing, and inventory management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    features: [
      "User authentication",
      "Payment processing",
      "Inventory management",
      "Order tracking",
      "Admin dashboard",
    ],
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://yourstore.com",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Task Management App",
    bio: "Collaborative task management tool",
    icon: "/projects-icon.svg",
    description:
      "A team collaboration tool for managing tasks, projects, and deadlines with real-time updates.",
    technologies: ["Vue.js", "Express.js", "PostgreSQL", "Socket.io"],
    features: [
      "Real-time collaboration",
      "Task assignment",
      "Progress tracking",
      "Team chat",
      "File sharing",
    ],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://taskmanager.com",
    status: "Completed",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    bio: "Real-time weather monitoring app",
    icon: "/projects-icon.svg",
    description:
      "A beautiful weather dashboard that provides real-time weather data, forecasts, and location-based recommendations.",
    technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation API"],
    features: [
      "Real-time weather data",
      "5-day forecast",
      "Location detection",
      "Weather alerts",
      "Interactive charts",
    ],
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    liveUrl: "https://weather-app.com",
    status: "Completed",
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
