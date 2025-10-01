// About Me window presets - 3 different windows that open when About Me is clicked
export const aboutMeWindows = [
  {
    id: "about-text",
    position: { top: 500, left: 900 },
    size: { width: 560, height: 300 },
    header: { title: "Connect with me", bio: "Links" },
    content: {
      items: [
        { name: "Github", icon: "/github-icon.svg" },
        { name: "LinkedIn", icon: "/linkedin-icon.png" },
        { name: "Resume", icon: "/file-icon.png" },
      ],
    },
  },
  {
    id: "about-tech",
    position: { top: 50, left: 10 },
    size: { width: 725, height: 677 },
    header: { title: "About Me", bio: "Just a bit about me!" },
    type: "about-me",
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
    position: { top: 50, left: 750 },
    size: { width: 680, height: 440 },
    header: { title: "About Me", bio: "Just a bit about me!" },
    type: "photo-viewer", // This will render PhotoViewer instead of WindowDesktop
    // Removed content - PhotoViewer will handle its own content
  },
];
