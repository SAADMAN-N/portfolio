export default function Hero({ onDesktopClick }) {
  return (
    <div
      className="font-[var(--font-instrument-serif)] text-right text-5xl font-bold flex justify-center items-center h-screen w-screen text-black select-none"
      onClick={onDesktopClick}
    >
      Welcome to my portfolio
    </div>
  );
}
