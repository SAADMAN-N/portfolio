import Image from "next/image";

export default function DesktopItem({
  icon,
  label,
  position,
  type,
  dragRef,
  dragStyle,
  dragAttrs,
  onClick,
}) {
  return (
    <div
      ref={dragRef}
      {...(dragAttrs || {})}
      className="absolute flex flex-col items-center cursor-move group transition-all duration-200 ease-out hover:scale-105 hover:drop-shadow-lg"
      style={{
        top: position.top,
        left: position.left,
        width: 64,
        ...(dragStyle || {}),
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <div className="relative transition-all duration-200 group-hover:scale-110">
        <Image
          src={icon}
          alt={label}
          width={70}
          height={70}
          draggable={false}
          className="transition-all duration-200 group-hover:brightness-110"
        />
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm -z-10" />
      </div>
      <span className="mt-1 text-[14px] text-black text-center select-none font-semibold transition-all duration-200  group-hover:font-bold">
        {label}
      </span>
    </div>
  );
}
