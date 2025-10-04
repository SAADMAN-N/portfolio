"use client";

import { useDraggable } from "@dnd-kit/core";
import { useState, useCallback, memo, useEffect } from "react";

const StickyNote = memo(function StickyNote({
  id,
  title = "Sticky Note",
  content = "Click to edit...",
  position = { top: 100, left: 100 },
  size = { width: 200, height: 150 },
  bgColor = "#FFE066",
  textColor = "#333333",
  isEditable = true,
  type = "permanent",
  author = null,
  isMinimized = false,
  onUpdate,
  onMinimize,
  onMinimizeAll,
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  // Sync local state with props when they change (important for reload persistence)
  // Only sync when not actively editing to avoid interfering with user input
  useEffect(() => {
    if (!isEditingTitle) {
      setNoteTitle(title);
    }
  }, [title, isEditingTitle]);

  useEffect(() => {
    if (!isEditingContent) {
      setNoteContent(content);
    }
  }, [content, isEditingContent]);

  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : "auto",
      }
    : undefined;

  const handleSaveTitle = useCallback(() => {
    // Use setTimeout to prevent interference with other editing
    setTimeout(() => {
      setIsEditingTitle(false);
      if (onUpdate) {
        onUpdate({
          id,
          title: noteTitle,
          content: noteContent,
          position,
          size,
          bgColor,
          textColor,
          isEditable,
        });
      }
    }, 0);
  }, [
    id,
    noteTitle,
    noteContent,
    position,
    size,
    bgColor,
    textColor,
    isEditable,
    onUpdate,
  ]);

  const handleSaveContent = useCallback(() => {
    // Use setTimeout to prevent interference with other editing
    setTimeout(() => {
      setIsEditingContent(false);
      if (onUpdate) {
        onUpdate({
          id,
          title: noteTitle,
          content: noteContent,
          position,
          size,
          bgColor,
          textColor,
          isEditable,
        });
      }
    }, 0);
  }, [
    id,
    noteTitle,
    noteContent,
    position,
    size,
    bgColor,
    textColor,
    isEditable,
    onUpdate,
  ]);

  const handleCancelTitle = useCallback(() => {
    setIsEditingTitle(false);
    setNoteTitle(title);
  }, [title]);

  const handleCancelContent = useCallback(() => {
    setIsEditingContent(false);
    setNoteContent(content);
  }, [content]);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-sticky-note={id}
      className={`absolute cursor-move select-none rounded-lg shadow-lg border-2 border-black/10 flex flex-col ${
        isDragging
          ? "z-50 scale-105 shadow-2xl"
          : "z-40 hover:shadow-xl transition-all duration-200"
      }`}
      style={{
        top: position.top,
        left: position.left,
        width: size.width,
        height: isMinimized ? 40 : size.height,
        backgroundColor: bgColor,
        color: textColor,
        ...dragStyle,
      }}
      onClick={(e) => {
        // Prevent desktop click handler from triggering
        e.stopPropagation();

        // Save any active editing when clicking on the note background
        if (isEditingTitle) {
          handleSaveTitle();
        }
        if (isEditingContent) {
          handleSaveContent();
        }
      }}
      onMouseDown={(e) => {
        // Prevent desktop click handler from triggering
        e.stopPropagation();
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-black/20">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Minimize button (yellow) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize(id);
            }}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors flex-shrink-0 border border-black/20 shadow-sm"
            title="Minimize"
          />
          {/* Minimize all button (red) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimizeAll) onMinimizeAll();
            }}
            className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors flex-shrink-0 border border-black/20 shadow-sm"
            title="Minimize All"
          />
          {/* Title - especially important when minimized */}
          {isEditingTitle ? (
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveTitle();
                } else if (e.key === "Escape") {
                  handleCancelTitle();
                }
              }}
              onFocus={(e) => {
                e.target.select(); // Select all text when focused
              }}
              className="font-semibold text-sm flex-1 min-w-0 bg-transparent border-none outline-none"
              autoFocus
              placeholder=""
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : (
            <h3
              className="font-semibold text-sm truncate flex-1 min-w-0 cursor-text"
              onClick={(e) => {
                e.stopPropagation();
                if (isEditable && !isMinimized) {
                  setIsEditingTitle(true);
                }
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              {noteTitle}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* No save/cancel buttons needed for inline editing */}
        </div>
      </div>

      {/* Content - only show when not minimized */}
      {!isMinimized && (
        <div className="flex-1 p-3 overflow-hidden">
          <div className="h-full flex flex-col">
            {isEditingContent ? (
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleCancelContent();
                  }
                }}
                onFocus={(e) => {
                  e.target.select(); // Select all text when focused
                }}
                className="w-full flex-1 text-xs bg-transparent border border-black/20 rounded resize-none focus:outline-none focus:border-black/40 overflow-hidden leading-relaxed"
                placeholder=""
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            ) : (
              <p
                className="text-xs flex-1 overflow-hidden leading-relaxed cursor-text"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditable) {
                    setIsEditingContent(true);
                  }
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                {noteContent}
              </p>
            )}
            {type === "visitor" && author && (
              <div className="text-xs opacity-70 mt-1 border-t border-black/10 pt-1">
                — {author}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default StickyNote;
