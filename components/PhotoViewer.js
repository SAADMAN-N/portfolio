import SphereImageGrid from "./ui/image-sphere.jsx";
import { useState, useEffect } from "react";

// Smart loading strategy: Load curated images first for smooth animation, then load rest in background
const curatedImages = [
  {
    id: "profile-sparty",
    src: "/profile-icon.jpeg",
    alt: "Me with Sparty!",
    title: "Me with Sparty!",
    description: "Fun fact: He jumpscared me while I was on a zoom call!",
  },
  {
    id: "plane-window",
    src: "/gallery-plane-window.jpeg",
    alt: "Best view ever",
    title: "Best view ever",
    description:
      "Spirit gave me a very cheap ticket to (almost) space that day",
  },
  {
    id: "red-sea-coast",
    src: "/gallery-jed.jpeg",
    alt: "Red Sea Coast",
    title: "Red Sea Coast",
    description: "A peaceful moment along the coast of the Red Sea in Al Hamra",
  },
  {
    id: "gaming-travel",
    src: "/gallery-travel-1.jpeg",
    alt: "I love gaming",
    title: "I love gaming",
    description: "and I love travelling...",
  },
  {
    id: "adventure-awaits",
    src: "/gallery-travel-2.jpeg",
    alt: "Adventure Awaits",
    title: "Adventure Awaits",
    description:
      "Every journey brings new perspectives and unforgettable memories",
  },
  {
    id: "taste-culture",
    src: "/gallery-food-3.jpeg",
    alt: "Taste of Culture",
    title: "Taste of Culture",
    description: "Food is the universal language that connects us all",
  },
];

// Additional images to load progressively after initial animation
const additionalImages = [
  {
    id: "img-5511",
    src: "/IMG_5511.jpeg",
    alt: "Travel Photo 1",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-5530",
    src: "/IMG_5530.jpeg",
    alt: "Travel Photo 2",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-5657",
    src: "/IMG_5657.jpeg",
    alt: "Travel Photo 3",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-5839",
    src: "/IMG_5839.jpeg",
    alt: "Travel Photo 4",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6050",
    src: "/IMG_6050.jpeg",
    alt: "Travel Photo 5",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6070",
    src: "/IMG_6070.jpeg",
    alt: "Travel Photo 6",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6091",
    src: "/IMG_6091.jpeg",
    alt: "Travel Photo 7",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6099",
    src: "/IMG_6099.jpeg",
    alt: "Travel Photo 8",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6190",
    src: "/IMG_6190.jpeg",
    alt: "Travel Photo 9",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6483",
    src: "/IMG_6483.jpeg",
    alt: "Travel Photo 10",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-6519",
    src: "/IMG_6519.jpeg",
    alt: "Travel Photo 11",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-7159",
    src: "/IMG_7159.jpeg",
    alt: "Travel Photo 12",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-7282",
    src: "/IMG_7282.jpeg",
    alt: "Travel Photo 13",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-9082",
    src: "/IMG_9082.jpeg",
    alt: "Travel Photo 14",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-9136",
    src: "/IMG_9136.jpeg",
    alt: "Travel Photo 15",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-9750",
    src: "/IMG_9750.jpeg",
    alt: "Travel Photo 16",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-9902",
    src: "/IMG_9902.jpeg",
    alt: "Travel Photo 17",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
  },
  {
    id: "img-9907",
    src: "/IMG_9907.jpeg",
    alt: "Travel Photo 18",
    title: "Travel Memory",
    description: "Capturing moments from my journeys",
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
      // Add more images after a shorter delay - limit to 12 total for performance
      setTimeout(() => {
        const limitedAdditionalImages = additionalImages.slice(0, 4); // Only 4 additional images for better performance
        const allImages = [...curatedImages, ...limitedAdditionalImages];
        setCurrentItems(allImages);
        setIsLoadingMore(false);
      }, 500); // Load additional images after 500ms
    }, 1500); // Start loading after 1.5 seconds (let animation finish)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed rounded-2xl bg-[#363636] overflow-hidden select-none transition-all duration-200 ease-in-out z-[10000] ${
        isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        top: top,
        left: left,
        width: "680px", // Match the 3rd window size
        height: "440px", // Match the 3rd window size
        zIndex: style?.zIndex || 1000,
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <SphereImageGrid
          images={currentItems}
          containerSize={600}
          sphereRadius={200}
          dragSensitivity={0.4}
          momentumDecay={0.96}
          maxRotationSpeed={2}
          baseImageScale={0.2}
          hoverScale={1.1}
          perspective={600}
          autoRotate={true}
          autoRotateSpeed={0.2}
          className="w-full h-full"
        />
      </div>
      {isLoadingMore && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Loading more photos...
        </div>
      )}
    </div>
  );
}
