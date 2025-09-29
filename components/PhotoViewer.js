import InfiniteMenu from "./InfiniteMenu";

const items = [
  {
    image: "https://picsum.photos/300/300?grayscale",
    link: "https://google.com/",
    title: "Item 1",
    description: "This is pretty cool, right?",
  },
  {
    image: "https://picsum.photos/400/400?grayscale",
    link: "https://google.com/",
    title: "Item 2",
    description: "This is pretty cool, right?",
  },
  {
    image: "https://picsum.photos/500/500?grayscale",
    link: "https://google.com/",
    title: "Item 3",
    description: "This is pretty cool, right?",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Item 4",
    description: "This is pretty cool, right?",
  },
];

export default function PhotoViewer({ top = "50vh", left = "50vw" }) {
  return (
    <div
      className="w-200 h-100 flex justify-center items-center translate-x-[-50%] translate-y-[-50%]"
      style={{ position: "relative", top: top, left: left }}
    >
      <InfiniteMenu items={items} />
    </div>
  );
}
