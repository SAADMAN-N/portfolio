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
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

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

  const dragStyle =
    transform && !isResizing
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          zIndex: isDragging ? 1000 : "auto",
        }
      : undefined;

  const handleSaveTitle = useCallback(() => {
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

  // Resize handlers
  const handleResizeStart = useCallback(
    (e) => {
      e.stopPropagation();
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      });
    },
    [size]
  );

  const handleResizeMove = useCallback(
    (e) => {
      if (!isResizing) return;

      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      const newWidth = Math.max(150, resizeStart.width + deltaX);
      const newHeight = Math.max(100, resizeStart.height + deltaY);

      if (onUpdate) {
        onUpdate({
          id,
          title: noteTitle,
          content: noteContent,
          position,
          size: { width: newWidth, height: newHeight },
          bgColor,
          textColor,
          isEditable,
        });
      }
    },
    [
      isResizing,
      resizeStart,
      onUpdate,
      id,
      noteTitle,
      noteContent,
      position,
      bgColor,
      textColor,
      isEditable,
    ]
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add global mouse event listeners for resize
  useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e) => handleResizeMove(e);
      const handleMouseUp = () => handleResizeEnd();

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  const handleCancelTitle = useCallback(() => {
    setIsEditingTitle(false);
    setNoteTitle(title);
  }, [title]);

  const handleCancelContent = useCallback(() => {
    setIsEditingContent(false);
    setNoteContent(content);
  }, [content]);

  // Optimized event handlers
  const handleStopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleTitleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isEditable && !isMinimized) {
        setIsEditingTitle(true);
      }
    },
    [isEditable, isMinimized]
  );

  const handleContentClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isEditable) {
        setIsEditingContent(true);
      }
    },
    [isEditable]
  );

  const handleMinimizeClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (onMinimize) onMinimize(id);
    },
    [onMinimize, id]
  );

  return (
    <div
      ref={setNodeRef}
      data-sticky-note={id}
      className={`absolute select-none rounded-lg border border-gray-300/30 flex flex-col overflow-hidden [border-radius:0.5rem] ${
        isDragging
          ? "z-50 scale-105 shadow-2xl"
          : isMinimized
            ? "z-40 hover:scale-102 transition-all duration-200 shadow-none [box-shadow:none!important]"
            : "z-40 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-200"
      }`}
      style={{
        top: position.top,
        left: position.left,
        width: size.width,
        height: isMinimized ? 40 : size.height,
        backgroundColor: bgColor,
        color: textColor,
        willChange: isDragging ? "transform" : "auto",
        ...dragStyle,
      }}
      onClick={handleStopPropagation}
      onMouseDown={(e) => {
        // Prevent desktop click handler from triggering
        e.stopPropagation();
      }}
    >
      {/* Header - draggable area */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-gray-300/20 bg-gray-50/50 cursor-move"
        {...listeners}
        {...attributes}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Close button (red) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add close functionality here if needed
              }}
              onMouseDown={handleStopPropagation}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-150 flex-shrink-0"
              title="Close"
            />
            {/* Minimize button (yellow) */}
            <button
              onClick={handleMinimizeClick}
              onMouseDown={handleStopPropagation}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-150 flex-shrink-0"
              title="Minimize"
            />
          </div>
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
              onMouseDown={handleStopPropagation}
              className="font-medium text-sm flex-1 min-w-0 bg-transparent border-none outline-none text-gray-800"
              autoFocus
              placeholder=""
              onClick={handleStopPropagation}
            />
          ) : (
            <h3
              className="font-medium text-sm truncate flex-1 min-w-0 cursor-text text-gray-800"
              onMouseDown={handleStopPropagation}
              onClick={handleTitleClick}
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
        <div className="flex-1 p-3 overflow-hidden bg-white/95">
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
                className="w-full flex-1 text-sm bg-transparent border-none resize-none focus:outline-none overflow-hidden leading-relaxed text-gray-800 font-normal"
                placeholder=""
                autoFocus
                onClick={handleStopPropagation}
                onMouseDown={handleStopPropagation}
              />
            ) : (
              <p
                className="text-sm flex-1 overflow-hidden leading-relaxed cursor-text text-gray-800 font-normal"
                onClick={handleContentClick}
                onMouseDown={handleStopPropagation}
              >
                {noteContent}
              </p>
            )}
            {type === "visitor" && author && (
              <div className="text-xs opacity-60 mt-2 border-t border-gray-300/20 pt-2 italic text-gray-600">
                — {author}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resize handle - only show when not minimized */}
      {!isMinimized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300/30 hover:bg-gray-400/40 transition-colors duration-200 rounded-tl-lg"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleResizeStart(e);
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m8 8 4 4-4-4-4 4 4-4z' fill='%23000' opacity='0.3'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "12px 12px",
          }}
        />
      )}
    </div>
  );
});

export default StickyNote;
