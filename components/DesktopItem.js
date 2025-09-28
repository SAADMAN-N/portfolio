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
      className="absolute flex flex-col items-center"
      style={{
        top: position.top,
        left: position.left,
        width: 64,
        ...(dragStyle || {}),
      }}
    >
      {/* Drag handle - only this area is draggable */}
      <div
        {...(dragAttrs || {})}
        className="flex flex-col items-center cursor-move"
      >
        <Image
          src={icon}
          alt={label}
          width={70}
          height={70}
          draggable={false}
        />
        <span className="mt-1 text-[14px] text-black text-center select-none font-semibold">
          {label}
        </span>
      </div>

      {/* Clickable overlay - this handles clicks */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      />
    </div>
  );
}
