// app/components/Menubar.js

import React from "react";
import Image from "next/image";

export default function Menubar({ onTidy, onCreateStickyNote }) {
  const dayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div
      className="flex justify-between items-center h-8 px-2 text-[13px] tracking-wide select-none"
      style={{
        backgroundColor: "rgba(52, 58, 64, 0.40)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Left side: App Name and Menu Items */}
      <div className="flex space-x-4 ">
        <span>
          <Image
            className="m-0 p-0 justify-center items-center pb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.40)]"
            src="/apple.svg"
            alt="Apple icon"
            width={14}
            height={14}
          />
        </span>
        <span className="underline text-black font-semibold underline-offset-2">
          Sharf's portfolio
        </span>
        <button className="text-gray-950 hover:underline">Resume</button>
        <button
          onClick={onCreateStickyNote}
          className="text-gray-950 hover:underline"
        >
          Create Sticky Note{" "}
          <span className="text-blue-700 font-bold ml-2">{`Try it out!`}</span>
        </button>
      </div>

      {/* Right side: Tidy button, Icons and Time */}
      <div className="flex items-center space-x-4 gap-0.8">
        <button
          onClick={onTidy}
          className="px-2 py-0.5 text-[12px] rounded-md bg-black/10 hover:bg-black/20 text-black"
          title="Reset desktop layout"
        >
          Tidy
        </button>

        <span>
          <Image
            className="m-0 p-0"
            src="/siri.png"
            alt="Siri icon"
            width={16}
            height={16}
            style={{ fill: "black" }}
          />
        </span>
        <Image
          className="m-0 p-0"
          src="/control-center.svg"
          alt="Control center icon"
          width={16}
          height={16}
        />
        <span>
          <Image
            className="m-0 p-0"
            src="/battery.svg"
            alt="Battery icon"
            width={26}
            height={26}
          />
        </span>
        <span className="text-black">
          {dayDate} {currentTime}
        </span>
      </div>
    </div>
  );
}
