import Image from "next/image";

export default function DesktopItem({ icon, label, position, type }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ top: position.top, left: position.left, width: 64 }}
    >
      <Image src={icon} alt={label} width={64} height={64} draggable={false} />
      <span className="mt-1 text-[12px] text-gray-600 text-center select-none font-semibold">
        {label}
      </span>
    </div>
  );
}
