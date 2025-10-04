"use client";

import { useState } from "react";
import { addStickyNote } from "@/data/stickyNotesData";

export default function NoteCreator({ onNoteCreated, onClose }) {
  const [noteType, setNoteType] = useState("permanent"); // "permanent" or "visitor"
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [bgColor, setBgColor] = useState("#FFE066");
  const [textColor, setTextColor] = useState("#333333");

  const colorOptions = [
    { bg: "#FFE066", text: "#333333", name: "Yellow" },
    { bg: "#FF6B6B", text: "#FFFFFF", name: "Red" },
    { bg: "#4ECDC4", text: "#FFFFFF", name: "Teal" },
    { bg: "#45B7D1", text: "#FFFFFF", name: "Blue" },
    { bg: "#96CEB4", text: "#333333", name: "Green" },
    { bg: "#FFEAA7", text: "#333333", name: "Light Yellow" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: `sticky-note-${Date.now()}`,
      title: title || "New Note",
      content: content || "Click to edit...",
      position: {
        top: Math.random() * 200 + 100,
        left: Math.random() * 300 + 100,
      },
      size: { width: 200, height: 150 },
      bgColor,
      textColor,
      isEditable: true,
      type: noteType,
      author: noteType === "visitor" ? author : null,
      status: noteType === "visitor" ? "pending" : "approved",
      createdAt: new Date().toISOString(),
    };

    onNoteCreated(newNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create New Note</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Note Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setNoteType("permanent")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  noteType === "permanent"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Permanent (My Note)
              </button>
              <button
                type="button"
                onClick={() => setNoteType("visitor")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  noteType === "visitor"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Visitor Feedback
              </button>
            </div>
          </div>

          {/* Author (for visitor notes) */}
          {noteType === "visitor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.bg}
                  type="button"
                  onClick={() => {
                    setBgColor(color.bg);
                    setTextColor(color.text);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    bgColor === color.bg
                      ? "border-gray-800 scale-105"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.bg, color: color.text }}
                >
                  <div className="text-xs font-medium">{color.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {noteType === "visitor" ? "Submit for Review" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
