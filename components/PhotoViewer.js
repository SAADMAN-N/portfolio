import InfiniteMenu from "./InfiniteMenu";

// Performance optimization: Limit initial images to prevent WebGL texture atlas overload
// The InfiniteMenu component loads all images into a WebGL texture atlas at once,
// which causes performance issues with too many high-resolution images
const initialItems = [
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
    image: "/gallery-food-1.jpeg",
    link: "",
    title: "Culinary Adventures",
    description:
      "Exploring local flavors and discovering new tastes wherever I go",
  },
  {
    image: "/gallery-travel-1.jpeg",
    link: "",
    title: "I love gaming",
    description: "and I love travelling...",
  },
  {
    image: "/gallery-food-2.jpeg",
    link: "",
    title: "Foodie Chronicles",
    description:
      "Documenting delicious discoveries from my travels around the world",
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
  // Add a few more curated images for better initial experience
  {
    image: "/IMG_3673.jpeg",
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
    image: "/IMG_6091.jpeg",
    link: "",
    title: "",
    description: "",
  },
];

// Use initial items for better performance - limit to 12 images max for smooth animation
const items = initialItems;

export default function PhotoViewer({
  top = "50vh",
  left = "50vw",
  style,
  isClosing = false,
}) {
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
    >
      <InfiniteMenu items={items} />
    </div>
  );
}
