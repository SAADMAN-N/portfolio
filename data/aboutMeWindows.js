// About Me window presets - 3 different windows that open when About Me is clicked
export const aboutMeWindows = [
  {
    id: "about-text",
    position: { top: 50, left: 80 },
    size: { width: 560, height: 500 },
    header: { title: "About Me", bio: "Just a bit about me!" },
    content: {
      items: [
        { name: "bio.txt", icon: "/aboutme-icon.png" },
        { name: "contact.md", icon: "/aboutme-icon.png" },
        { name: "resume.pdf", icon: "/work-icon.svg" },
        { name: "skills.md", icon: "/skills-icon.svg" },
        { name: "education.md", icon: "/education-icon.svg" },
        { name: "projects.md", icon: "/projects-icon.svg" },
      ],
    },
  },
  {
    id: "about-tech",
    position: { top: 50, left: 700 },
    size: { width: 600, height: 600 },
    header: { title: "About Me", bio: "Just a bit about me!" },
    content: {
      items: [
        { name: "React", icon: "/work-icon.svg" },
        { name: "Next.js", icon: "/education-icon.svg" },
        { name: "JavaScript", icon: "/skills-icon.svg" },
        { name: "TypeScript", icon: "/projects-icon.svg" },
        { name: "Tailwind CSS", icon: "/folder-icon.png" },
        { name: "Node.js", icon: "/aboutme-icon.png" },
      ],
    },
  },
  {
    id: "about-gallery",
    position: { top: 400, left: 250 },
    size: { width: 680, height: 440 },
    header: { title: "About Me", bio: "Just a bit about me!" },
    content: {
      items: [
        { name: "Profile", icon: "/aboutme-icon.png" },
        { name: "Work", icon: "/work-icon.svg" },
        { name: "Education", icon: "/education-icon.svg" },
        { name: "Skills", icon: "/skills-icon.svg" },
        { name: "Projects", icon: "/projects-icon.svg" },
        { name: "Portfolio", icon: "/folder-icon.png" },
      ],
    },
  },
];
