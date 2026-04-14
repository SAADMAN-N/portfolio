import Image from "next/image";

const DOT_ROW_H = "h-2"; /* reserve identical space under every icon */

export default function DockIcon({
  isClickable,
  /** When set, overrides whether the “running app” dot is shown (defaults to isClickable). */
  showIndicator,
  icon,
  /** Slightly smaller glyph (e.g. Settings, VS Code) while keeping the same column height. */
  compact = false,
}) {
  const dotVisible = showIndicator !== undefined ? showIndicator : isClickable;

  const innerSize = compact ? "h-8 w-8" : "h-9 w-9";
  const imgSizes = compact ? "32px" : "36px";

  return (
    <div
      className={`flex min-w-[48px] max-w-[48px] flex-col items-center gap-0.5 translate-y-1 ${isClickable ? "cursor-pointer" : "cursor-default"}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden p-px ${
          isClickable
            ? "transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-1"
            : ""
        }`}
      >
        <div className={`relative ${innerSize} shrink-0`}>
          <Image
            src={icon}
            alt=""
            fill
            sizes={imgSizes}
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>
      <div
        className={`flex ${DOT_ROW_H} w-full shrink-0 items-center justify-center`}
        aria-hidden
      >
        <span
          className={`block h-1 w-1 rounded-full bg-[#3a3a3c] dark:bg-[#5c5c5c] ${dotVisible ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
