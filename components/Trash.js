"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import FileViewer from "./FileViewer";
import { dontLookMarkdown } from "@/data/dontLookContent";

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

export default function Trash({ isClosing = false, onClose }) {
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [isFileViewerClosing, setIsFileViewerClosing] = useState(false);

  const handleFileViewerClose = useCallback(() => {
    if (isFileViewerOpen) {
      setIsFileViewerClosing(true);
      setTimeout(() => {
        setIsFileViewerOpen(false);
        setIsFileViewerClosing(false);
      }, 200);
    }
  }, [isFileViewerOpen]);

  const handleFileClick = useCallback(() => {
    setIsFileViewerOpen(true);
  }, []);

  return (
    <div
      className={`fixed overflow-hidden select-none transition-all duration-200 ease-in-out z-[10000] rounded-2xl flex flex-col ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      style={{
        width: "65vw",
        height: "65vh",
        minWidth: "520px",
        minHeight: "500px",
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
      {/* Title bar with traffic lights */}
      <div className="flex items-center h-10 shrink-0 bg-[#2C2C2E] border-b border-[#38383A]">
        <TrafficLights onClose={onClose} />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-48 shrink-0 flex flex-col bg-[#1c1c1e] border-r border-[#2c2c2e] rounded-bl-2xl">
          <div className="flex flex-col pt-6 gap-4 px-2">
            <div className="text-[11px] tracking-wide pl-4 uppercase text-[#8e8e93]">
              Favorites
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                className="flex items-center gap-2 pl-4 py-2 rounded-md bg-[#2c2c2e] text-left transition-colors cursor-default"
              >
                <Image
                  src="/trash-icon.png"
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-90"
                />
                <span className="text-[13px] text-white font-medium">
                  Trash
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#2C2C2E] rounded-br-2xl">
          {/* Toolbar */}
          <div className="h-12 shrink-0 flex items-center gap-2 px-4 border-b border-[#38383A]">
            <button
              type="button"
              className="p-1.5 rounded hover:bg-white/10 transition-colors opacity-60"
              disabled
              aria-label="Back"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
              aria-label="Forward"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <span className="text-sm text-[#8e8e93] ml-2">Trash</span>
          </div>

          {/* File grid content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="flex flex-wrap gap-6">
              <button
                type="button"
                onClick={handleFileClick}
                className="flex flex-col items-center gap-2 w-20 cursor-pointer group text-left"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-lg group-hover:bg-white/10 transition-colors">
                  <Image
                    src="/file-icon.png"
                    alt="Dont look"
                    width={48}
                    height={48}
                  />
                </div>
                <span className="text-xs text-[#e5e5ea] text-center truncate max-w-full px-1">
                  Dont look
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFileViewerOpen && (
        <FileViewer
          title="Dont look"
          content={dontLookMarkdown}
          isClosing={isFileViewerClosing}
          onClose={handleFileViewerClose}
        />
      )}
    </div>
  );
}
