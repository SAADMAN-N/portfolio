// app/components/Menubar.js

import React from "react";
import Image from "next/image";

export default function Menubar() {
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
      className="flex justify-between items-center h-8 px-2 text-[13px] tracking-wide"
      style={{
        backgroundColor: "rgba(52, 58, 64, 0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Left side: App Name and Menu Items */}
      <div className="flex space-x-4 ">
        <span>
          <Image
            className="m-0 p-0 justify-center items-center pb-0.5"
            src="/apple.svg"
            alt="Apple icon"
            width={13}
            height={13}
          />
        </span>
        <span className="underline   text-gray-950 font-semibold underline-offset-2">
          Sharf's portfolio
        </span>
        <button className="text-gray-700 hover:underline">Resume</button>
        <button className="text-gray-700 hover:underline">Contact</button>
      </div>

      {/* Right side: Icons and Time */}
      <div className="flex items-center space-x-4 gap-0.8">
        <span>
          <Image
            className="m-0 p-0"
            src="/siri.png"
            alt="Siri icon"
            width={16}
            height={16}
          />
        </span>
        <Image
          className="m-0 p-0"
          src="/control-center.svg"
          alt="Control center icon"
          width={16}
          height={16}
        />
        <span></span>
        <span>
          <Image
            className="m-0 p-0"
            src="/battery.svg"
            alt="Battery icon"
            width={24}
            height={24}
          />
        </span>
        <span className="text-gray-900">
          {dayDate} {currentTime}
        </span>
      </div>
    </div>
  );
}
