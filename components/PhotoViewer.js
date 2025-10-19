import InfiniteMenu from "./InfiniteMenu";
import { useState, useEffect } from "react";

// Smart loading strategy: Load curated images first for smooth animation, then load rest in background
const curatedImages = [
  {
    image: "/profile-icon.jpeg",
    link: "",
    title: "Me with Sparty!",
    description: "Fun fact: He jumpscared me while I was on a zoom call!",
  },
  {
    image: "/gallery-plane-window.jpeg",
    link: "",
    title: "Best view ever",
    description:
      "Spirit gave me a very cheap ticket to (almost) space that day",
  },
  {
    image: "/gallery-jed.jpeg",
    link: "",
    title: "Red Sea Coast",
    description: "A peaceful moment along the coast of the Red Sea in Al Hamra",
  },
  {
    image: "/gallery-travel-1.jpeg",
    link: "",
    title: "I love gaming",
    description: "and I love travelling...",
  },
  {
    image: "/gallery-travel-2.jpeg",
    link: "",
    title: "Adventure Awaits",
    description:
      "Every journey brings new perspectives and unforgettable memories",
  },
  {
    image: "/gallery-food-3.jpeg",
    link: "",
    title: "Taste of Culture",
    description: "Food is the universal language that connects us all",
  },
];

// Additional images to load progressively after initial animation
const additionalImages = [
  {
    image: "/IMG_5511.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_5530.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_5657.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_5839.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6050.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6070.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6091.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6099.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6190.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6483.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_6519.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_7159.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_7282.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_9082.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_9136.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_9750.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_9902.jpeg",
    link: "",
    title: "",
    description: "",
  },
  {
    image: "/IMG_9907.jpeg",
    link: "",
    title: "",
    description: "",
  },
];

export default function PhotoViewer({
  top = "50vh",
  left = "50vw",
  style,
  isClosing = false,
}) {
  const [currentItems, setCurrentItems] = useState(curatedImages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Start with curated images for smooth animation
    setCurrentItems(curatedImages);

    // Load additional images in background after animation completes
    const timer = setTimeout(() => {
      setIsLoadingMore(true);
      // Add more images after a shorter delay
      setTimeout(() => {
        const allImages = [...curatedImages, ...additionalImages];
        setCurrentItems(allImages);
        setIsLoadingMore(false);
      }, 500); // Load additional images after 500ms
    }, 1500); // Start loading after 1.5 seconds (let animation finish)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`rounded-2xl transition-all duration-200 ease-in-out z-[10000] ${
        isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        position: "fixed",
        top: top,
        left: left,
        width: "680px", // Match the 3rd window size
        height: "440px", // Match the 3rd window size
        zIndex: style?.zIndex || 1000,
        backgroundColor: "rgba(0, 0, 0, 0.05)", // Slight background to see the borders
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <InfiniteMenu key={currentItems.length} items={currentItems} />
      {isLoadingMore && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Loading more photos...
        </div>
      )}
    </div>
  );
}
