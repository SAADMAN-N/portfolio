"use client";

import { memo } from "react";
import { remindersData, getCompletedCount } from "../data/remindersData";

const Reminders = memo(function Reminders({
  position = { top: 200, left: 600 },
  isMinimized = false,
  onMinimize,
}) {
  // Don't render if minimized
  if (isMinimized) {
    return (
      <div
        className="absolute z-10 rounded-lg border border-gray-700/50 shadow-lg cursor-pointer hover:bg-gray-800/50 transition-colors duration-200 select-none"
        style={{
          top: position.top,
          left: position.left,
          width: 320,
          height: 40,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.2)",
          boxShadow:
            "0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
        onClick={onMinimize}
      >
        <div className="flex items-center gap-2 px-3 h-full">
          <button
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          />
          <span className="text-black text-sm font-medium">Reminders</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute z-10 rounded-lg flex flex-col overflow-hidden select-none"
      style={{
        top: position.top,
        left: position.left,
        width: 320,
        height: 450,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.2)",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.4), " +
          "0 8px 16px rgba(0,0,0,0.2), " +
          "inset 0 1px 0 rgba(255,255,255,0.3), " +
          "inset 0 -1px 0 rgba(0,0,0,0.1)",
      }}
    >
      {/* Content */}
      <div
        className="flex-1 p-4 overflow-y-auto custom-scrollbar"
        style={{
          backgroundColor: "#282B2B",
          scrollbarWidth: "thin",
          scrollbarColor: "#4A5568 transparent",
        }}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-2 mb-2">
          <button
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200"
            onClick={onMinimize}
          />
        </div>

        {/* Section Header */}
        <h2 className="text-blue-400 text-lg font-bold mb-3">Reminders</h2>

        {/* Reminders List */}
        <div className="space-y-1">
          {remindersData.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              {/* Circular Checkbox */}
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    reminder.completed
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500 hover:border-gray-400"
                  }`}
                >
                  {reminder.completed && (
                    <svg
                      className="w-2.5 h-2.5 text-white m-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm leading-relaxed ${
                    reminder.completed
                      ? "text-gray-400 line-through"
                      : "text-white"
                  }`}
                >
                  {reminder.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Reminders;
