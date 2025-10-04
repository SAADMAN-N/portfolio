import { VideoText } from "@/components/ui/video-text";

export default function Hero({ onDesktopClick }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=PT+Mono&display=swap"
        rel="stylesheet"
      />
      <div
        className="font-['Instrument_Serif'] font-bold text-right text-5xl flex justify-center items-center h-screen w-screen text-4xl font-bold text-black select-none"
        onClick={onDesktopClick}
      >
        Welcome to my portfolio
      </div>
    </>
  );
}
