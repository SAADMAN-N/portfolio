// Content data for different desktop items and sidebar items
export const contentData = {
  // Desktop item content
  desktopItems: {
    1: {
      // Folder
      default: [
        {
          id: 1,
          name: "readme.md",
          icon: "/folder-icon.png",
          type: "file",
        },
      ],
      // Sidebar-specific content for Folder
      sidebar: {
        1: [
          // Experience content in Folder
          {
            id: 1,
            name: "Software Engineer",
            icon: "/work-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "Internship",
            icon: "/work-icon.svg",
            type: "file",
          },
        ],
        2: [
          // Education content in Folder
          {
            id: 1,
            name: "Computer Science",
            icon: "/education-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "Certifications",
            icon: "/education-icon.svg",
            type: "file",
          },
        ],
        3: [
          // Skills content in Folder
          {
            id: 1,
            name: "JavaScript",
            icon: "/skills-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "React",
            icon: "/skills-icon.svg",
            type: "file",
          },
        ],
        4: [
          // Projects content in Folder
          {
            id: 1,
            name: "Portfolio Website",
            icon: "/projects-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "E-commerce App",
            icon: "/projects-icon.svg",
            type: "file",
          },
        ],
      },
    },
    2: {
      // About Me
      default: [
        {
          id: 1,
          name: "bio.txt",
          icon: "/aboutme-icon.png",
          type: "file",
        },
        {
          id: 2,
          name: "contact.md",
          icon: "/aboutme-icon.png",
          type: "file",
        },
      ],
      // Sidebar-specific content for About Me
      sidebar: {
        1: [
          // Experience content in About Me
          {
            id: 1,
            name: "Resume.pdf",
            icon: "/work-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "Cover Letter",
            icon: "/work-icon.svg",
            type: "file",
          },
        ],
        2: [
          // Education content in About Me
          {
            id: 1,
            name: "Transcript.pdf",
            icon: "/education-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "Diploma",
            icon: "/education-icon.svg",
            type: "file",
          },
        ],
        3: [
          // Skills content in About Me
          {
            id: 1,
            name: "Technical Skills",
            icon: "/skills-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "Soft Skills",
            icon: "/skills-icon.svg",
            type: "file",
          },
        ],
        4: [
          // Projects content in About Me
          {
            id: 1,
            name: "GitHub Repos",
            icon: "/projects-icon.svg",
            type: "file",
          },
          {
            id: 2,
            name: "Live Demos",
            icon: "/projects-icon.svg",
            type: "file",
          },
        ],
      },
    },
  },
};

// Helper function to get content for a specific desktop item and sidebar item
export const getContent = (desktopItemId, sidebarItemId = null) => {
  const desktopContent = contentData.desktopItems[desktopItemId];

  if (!desktopContent) {
    return [];
  }

  // If sidebar item is selected, return sidebar-specific content
  if (
    sidebarItemId &&
    desktopContent.sidebar &&
    desktopContent.sidebar[sidebarItemId]
  ) {
    return desktopContent.sidebar[sidebarItemId];
  }

  // Otherwise return default content
  return desktopContent.default || [];
};
