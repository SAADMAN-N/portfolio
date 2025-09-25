import Image from "next/image";

export default function DesktopItem({
  icon,
  label,
  position,
  type,
  dragRef,
  dragStyle,
  dragAttrs,
}) {
  return (
    <div
      ref={dragRef}
      {...(dragAttrs || {})}
      className="absolute flex flex-col items-center"
      style={{
        top: position.top,
        left: position.left,
        width: 64,
        ...(dragStyle || {}),
      }}
    >
      <Image src={icon} alt={label} width={70} height={70} draggable={false} />
      <span className="mt-1 text-[14px] text-black text-center select-none font-semibold">
        {label}
      </span>
    </div>
  );
}
