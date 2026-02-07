import Image from "next/image";

export default function DockIcon({
  isClickable,
  icon,
  paddingBottom,
  width = 48,
  height = 48,
}) {
  return (
    <div
      className={`relative p-0 m-0 cursor-pointer transition-transform duration-200 ease-out ${
        isClickable ? "hover:scale-110 hover:-translate-y-1" : ""
      }`}
    >
      <Image src={icon} alt="Dock-apps-icon" width={width} height={height} />
      {isClickable && (
        <div
          className="absolute left-1/2  transform -translate-x-1/2 w-[5px] h-[5px] bg-gray-600 rounded-full"
          style={{
            bottom: paddingBottom ? paddingBottom + "px" : -5 + "px",
          }}
        ></div>
      )}
    </div>
  );
}
