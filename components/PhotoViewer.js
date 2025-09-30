import InfiniteMenu from "./InfiniteMenu";

const items = [
  {
    image: "/profile-icon.jpeg",
    link: "",
    title: "Me with Sparty!",
    description: "Fun fact: He jumpscared me while I was on a zoom call!",
  },
];

export default function PhotoViewer({ top = "50vh", left = "50vw", style }) {
  return (
    <div
      className="rounded-2xl"
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
    >
      <InfiniteMenu items={items} />
    </div>
  );
}
