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

const ChevronRightIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#8E8E93] opacity-90"
    aria-hidden
  >
    <path d="m9 18 6-6-6-6" />
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

const imessageFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif';

function MessageBubble({ type, text }) {
  const isOutgoing = type === "outgoing";
  return (
    <div
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-0.5`}
    >
      <div
        className={`max-w-[78%] break-words px-[11px] py-[7px] text-[15px] leading-[1.35] tracking-[-0.015em] ${
          isOutgoing
            ? "rounded-tl-[18px] rounded-tr-[18px] rounded-br-none rounded-bl-[18px] bg-[#007AFF] text-white"
            : "rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px] rounded-bl-none bg-[#3A3A3C] text-[#F2F2F7]"
        }`}
        style={{ fontFamily: imessageFont }}
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
      className={`fixed overflow-hidden select-none transition-all duration-200 ease-in-out z-[10000] rounded-3xl flex flex-col ${
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
        fontFamily: imessageFont,
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
          <div className="px-2.5 pb-2 pt-2 shrink-0">
            <div className="flex items-center gap-2 rounded-[10px] bg-[#2C2C2E]/90 px-2.5 py-1.5">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-[13px] text-white placeholder:text-[#8E8E93] outline-none"
                readOnly
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto imessage-scrollbar min-h-0">
            {conversations.map((conv) => {
              const selected = conv.id === selectedId;
              const showUnread = Boolean(conv.unread) && !selected;
              return (
                <div
                  key={conv.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedId(conv.id)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedId(conv.id)}
                  className={`flex cursor-pointer items-center gap-2 px-2.5 py-2 transition-colors ${
                    selected ? "bg-[#007AFF]" : "hover:bg-[#2C2C2E]/80"
                  }`}
                >
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex w-2.5 items-center justify-center">
                      {showUnread ? (
                        <span
                          className="h-2 w-2 rounded-full bg-[#007AFF]"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3A3A3C]">
                      {conv.avatar ? (
                        <Image
                          src={conv.avatar}
                          alt={conv.name}
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <PersonIcon />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[13px] font-semibold text-white">
                        {conv.name}
                      </span>
                      {conv.lastDate && (
                        <span
                          className={`shrink-0 text-[11px] tabular-nums ${
                            selected ? "text-white/85" : "text-[#8E8E93]"
                          }`}
                        >
                          {conv.lastDate}
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-px truncate text-[12px] leading-tight ${
                        selected ? "text-white/90" : "text-[#8E8E93]"
                      }`}
                    >
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Chat Panel */}
        <div
          className="flex min-w-0 flex-1 flex-col"
          style={{ backgroundColor: "#000000" }}
        >
          {/* Chat header — centered contact, frosted gradient (no hard divider) */}
          <div className="flex shrink-0 justify-center bg-gradient-to-b from-black/95 via-black/55 to-transparent px-3 py-2 pb-3 backdrop-blur-xl backdrop-saturate-150 sm:px-4">
            <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 py-0.5 text-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3A3A3C]">
                {activeConversation?.avatar ? (
                  <Image
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PersonIcon />
                )}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="max-w-[200px] truncate text-[14px] font-semibold text-white">
                  {activeConversation?.name}
                </span>
                <ChevronRightIcon />
              </div>
              <span className="text-[10px] leading-tight text-[#8E8E93]">
                Feb 23, 2025 at 10:56 PM
              </span>
            </div>
          </div>

          {/* Message area */}
          <div className="imessage-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {messages.map((msg) => {
              if (msg.type === "timestamp") {
                return (
                  <div key={msg.id} className="my-4 flex justify-center">
                    <span className="rounded-full bg-[#2C2C2E]/90 px-3 py-1 text-[11px] font-medium text-[#8E8E93]">
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

          {/* Input bar — pill field like macOS */}
          <div className="shrink-0 border-t border-[#2C2C2E]/80 p-2.5">
            <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#1C1C1E] px-2 py-1.5 pl-2.5">
              <button
                type="button"
                className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/10"
                aria-label="Apps"
              >
                <PlusIcon />
              </button>
              <input
                type="text"
                placeholder="iMessage"
                className="min-w-0 flex-1 bg-transparent py-1 text-[15px] text-white outline-none placeholder:text-[#8E8E93]"
                readOnly
              />
              <button
                type="button"
                className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/10"
                aria-label="Audio message"
              >
                <MicIcon />
              </button>
              <button
                type="button"
                className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/10"
                aria-label="Emoji"
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
