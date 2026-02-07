"use client";

import Image from "next/image";
import { useState } from "react";
import { conversations } from "@/data/imessageData";

// Icons as inline SVGs
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93] shrink-0"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const VideoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MicIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const EmojiIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PersonIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93]"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

// Traffic light buttons
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

// Message bubble
function MessageBubble({ type, text }) {
  const isOutgoing = type === "outgoing";
  return (
    <div
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-1`}
    >
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm break-words leading-relaxed ${
          isOutgoing ? "bg-[#007AFF] text-white" : "bg-[#3A3A3C] text-[#F2F2F7]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function IMessage({ isClosing = false, onClose }) {
  const [selectedId, setSelectedId] = useState(
    conversations.find((c) => c.isActive)?.id ?? conversations[0].id
  );
  const activeConversation = conversations.find((c) => c.id === selectedId);
  const messages = activeConversation?.messages ?? [];

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
        {/* Left Sidebar */}
        <div
          className="w-[28%] min-w-[180px] flex flex-col border-r border-[#2C2C2E]"
          style={{ backgroundColor: "#1E1E1E" }}
        >
          {/* Search bar */}
          <div className="p-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2C2C2E]">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#8E8E93] outline-none"
                readOnly
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto imessage-scrollbar min-h-0">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedId(conv.id)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedId(conv.id)}
                className={`flex gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                  conv.id === selectedId ? "bg-[#007AFF]" : "hover:bg-[#2C2C2E]"
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#3A3A3C] shrink-0 flex items-center justify-center">
                  {conv.avatar ? (
                    <Image
                      src={conv.avatar}
                      alt={conv.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <PersonIcon />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-semibold truncate text-white">
                      {conv.name}
                    </span>
                    {conv.lastDate && (
                      <span
                        className={`text-xs shrink-0 ${
                          conv.id === selectedId
                            ? "text-white/90"
                            : "text-[#8E8E93]"
                        }`}
                      >
                        {conv.lastDate}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm truncate mt-0.5 ${
                      conv.id === selectedId
                        ? "text-white/95"
                        : "text-[#8E8E93]"
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Panel */}
        <div
          className="flex-1 flex flex-col min-w-0"
          style={{ backgroundColor: "#18181B" }}
        >
          {/* Chat header - macOS contact profile style */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2C2C2E] shrink-0">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#3A3A3C] shrink-0 flex items-center justify-center">
                {activeConversation?.avatar ? (
                  <Image
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <PersonIcon />
                )}
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left min-w-0"
              >
                <span className="font-semibold text-white text-[15px] truncate">
                  {activeConversation?.name}
                </span>
                <ChevronIcon />
              </button>
              <span className="text-xs text-[#8E8E93] shrink-0 hidden sm:inline">
                Feb 23, 2025 at 10:56 PM
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                className="p-2.5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Video call"
              >
                <VideoIcon />
              </button>
              <button
                type="button"
                className="p-2.5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Phone call"
              >
                <PhoneIcon />
              </button>
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 imessage-scrollbar min-h-0">
            {messages.map((msg) => {
              if (msg.type === "timestamp") {
                return (
                  <div key={msg.id} className="flex justify-center my-5">
                    <span className="text-xs text-[#8E8E93] bg-[#2C2C2E]/80 px-3 py-1.5 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                );
              }
              return (
                <MessageBubble key={msg.id} type={msg.type} text={msg.text} />
              );
            })}
          </div>

          {/* Input bar */}
          <div className="p-3 border-t border-[#2C2C2E] shrink-0">
            <div className="flex items-center gap-2 bg-[#2C2C2E] rounded-2xl px-4 py-2.5">
              <button
                type="button"
                className="p-1.5 hover:bg-white/10 rounded-full shrink-0 transition-colors"
              >
                <PlusIcon />
              </button>
              <input
                type="text"
                placeholder="iMessage"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#8E8E93] outline-none py-1 min-w-0"
                readOnly
              />
              <button
                type="button"
                className="p-1.5 hover:bg-white/10 rounded-full shrink-0 transition-colors"
              >
                <MicIcon />
              </button>
              <button
                type="button"
                className="p-1.5 hover:bg-white/10 rounded-full shrink-0 transition-colors"
              >
                <EmojiIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
