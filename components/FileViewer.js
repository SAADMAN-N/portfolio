"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";

function TrafficLights({ onClose }) {
  return (
    <div className="flex gap-1.5 pl-3 pt-3 shrink-0 items-center">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="relative group cursor-pointer w-3 h-3 rounded-full p-0 m-0 border-0 flex items-center justify-center shrink-0"
        title="Close"
        aria-label="Close"
      >
        <Image
          src="/close-icon.svg"
          alt=""
          width={12}
          height={12}
          className="w-3 h-3"
        />
        <Image
          src="/cross-icon.svg"
          alt=""
          width={6}
          height={6}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none"
        />
      </button>
      <div className="w-3 h-3 rounded-full bg-[#febc2e] shrink-0" />
      <div className="w-3 h-3 rounded-full bg-[#28c840] shrink-0" />
    </div>
  );
}

export default function FileViewer({
  title = "Dont look",
  content,
  isClosing = false,
  onClose,
}) {
  return (
    <div
      className={`fixed overflow-hidden select-none transition-all duration-200 ease-in-out z-[10001] rounded-2xl flex flex-col ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      style={{
        width: "50vw",
        height: "55vh",
        minWidth: "400px",
        minHeight: "350px",
        left: "50%",
        top: "50%",
        transform: isClosing
          ? "translate(-50%, -50%) scale(0.95)"
          : "translate(-50%, -50%)",
        backgroundColor: "#1C1C1E",
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <div className="flex items-center h-10 shrink-0 bg-[#2C2C2E] border-b border-[#38383A]">
        <TrafficLights onClose={onClose} />
      </div>
      <div className="h-12 shrink-0 flex items-center px-4 border-b border-[#38383A]">
        <span className="text-sm font-medium text-[#e5e5ea]">{title}</span>
      </div>
      <div className="flex-1 overflow-auto p-6 bg-[#2C2C2E]">
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-bold text-white mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold text-white mt-6 mb-2">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-[#e5e5ea] mb-3 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-[#e5e5ea] mb-3 space-y-1">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-[#e5e5ea]">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-[#8e8e93] italic">{children}</em>
              ),
              hr: () => <hr className="border-[#38383A] my-4" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
