export default function Hero({ onDesktopClick }) {
  return (
    <div
      className="font-[var(--font-instrument-serif)] font-bold text-right text-5xl flex justify-center items-center h-screen w-screen text-4xl font-bold text-black select-none"
      onClick={onDesktopClick}
    >
      Welcome to my portfolio
    </div>
  );
}
