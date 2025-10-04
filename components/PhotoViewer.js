import InfiniteMenu from "./InfiniteMenu";

const items = [
  {
    image: "/profile-icon.jpeg",
    link: "",
    title: "Me with Sparty!",
    description: "Fun fact: He jumpscared me while I was on a zoom call!",
  },
];

export default function PhotoViewer({
  top = "50vh",
  left = "50vw",
  style,
  isClosing = false,
}) {
  return (
    <div
      className={`rounded-2xl transition-all duration-200 ease-in-out ${
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
