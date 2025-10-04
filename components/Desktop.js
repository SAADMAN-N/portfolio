"use client";

import Dock from "./Dock";
import Hero from "./Hero";
import Menubar from "./MenuBar";
import DesktopItem from "./DesktopItem";
import desktopItems from "@/data/desktopItems";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  DndContext,
  useDraggable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import WindowDesktop from "./WindowDesktop";
import PhotoViewer from "./PhotoViewer";
import AboutMe from "./AboutMe";
import StickyNote from "./StickyNote";
import { aboutMeWindows } from "@/data/aboutMeWindows";
import { stickyNotesData, getApprovedNotes } from "@/data/stickyNotesData";

function DraggableItem({ item, onItemClick }) {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: item.id,
    });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : "auto",
        willChange: "transform",
      }
    : undefined;
  const dragAttrs = { ...listeners, ...attributes };

  return (
    <DesktopItem
      icon={item.icon}
      label={item.label}
      position={item.position}
      type={item.type}
      dragRef={setNodeRef}
      dragStyle={dragStyle}
      dragAttrs={dragAttrs}
      onClick={onItemClick}
    />
  );
}

function DraggableDesktopItem({ item, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function Desktop() {
  const [items, setItems] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [openWindows, setOpenWindows] = useState({});
  const [closingWindows, setClosingWindows] = useState({});
  const [stickyNotes, setStickyNotes] = useState([]);
  const [minimizedNotes, setMinimizedNotes] = useState(new Set());

  // Configure drag sensors for better performance
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before starting drag
      },
    })
  );

  // Load sticky notes from localStorage on component mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("stickyNotes");
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        setStickyNotes(parsedNotes);
      } else {
        // If no saved notes, use default data
        setStickyNotes(stickyNotesData);
      }
    } catch (e) {
      console.warn("Failed to load sticky notes:", e);
      setStickyNotes(stickyNotesData);
    }
  }, []);

  // Save sticky notes to localStorage whenever they change
  useEffect(() => {
    if (stickyNotes.length > 0) {
      try {
        localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));
      } catch (e) {
        console.warn("Failed to save sticky notes:", e);
      }
    }
  }, [stickyNotes]);

  // One-time initialize positions: prefer saved, else top-right defaults with right-to-left stacking
  useEffect(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
    const menubarHeight = 32;
    const iconW = 64;
    const topPadding = menubarHeight + 16;
    const rightPadding = 24;
    const verticalGap = 120;
    const dockHeight = 100;

    // Compute how many rows fit in one column between menubar and dock
    const usableHeight = vh - topPadding - dockHeight - 16; // bottom padding
    const rowsPerColumn = Math.max(1, Math.floor(usableHeight / verticalGap));

    const columnGap = 24; // space between columns

    const withTopRight = desktopItems.map((it, index) => {
      const col = Math.floor(index / rowsPerColumn); // 0 = rightmost
      const row = index % rowsPerColumn;

      const left = vw - iconW - rightPadding - col * (iconW + columnGap);
      const top = topPadding + row * verticalGap;

      return { ...it, position: { top, left } };
    });

    try {
      const raw = localStorage.getItem("desktopPositions");
      if (raw) {
        const saved = JSON.parse(raw);
        const merged = withTopRight.map((it) =>
          saved?.[it.id]
            ? {
                ...it,
                position: { top: saved[it.id].top, left: saved[it.id].left },
              }
            : it
        );
        setItems(merged);
      } else {
        setItems(withTopRight);
      }
    } catch (_e) {
      setItems(withTopRight);
    }
    setInitialized(true);
  }, []);

  // Persist positions whenever items change
  useEffect(() => {
    if (!initialized || items.length === 0) return;
    const positions = Object.fromEntries(
      items.map((it) => [it.id, it.position])
    );
    try {
      localStorage.setItem("desktopPositions", JSON.stringify(positions));
    } catch (_e) {
      // storage might be unavailable; fail silently
    }
  }, [items, initialized]);

  const GRID = 16; // px grid for snap-to-grid

  function clampToBounds(pos) {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    const vh = typeof window !== "undefined" ? window.innerHeight : 1080;

    const menubarHeight = 32; // matches MenuBar h-8
    const dockHeight = 100; // dock + bottom gap
    const iconW = 64;
    const iconH = 80; // icon + label area

    const minTop = menubarHeight + 16;
    const maxTop = vh - dockHeight - iconH - 16;
    const minLeft = 8;
    const maxLeft = vw - iconW - 8;

    return {
      top: Math.max(minTop, Math.min(maxTop, pos.top)),
      left: Math.max(minLeft, Math.min(maxLeft, pos.left)),
    };
  }

  function snapToGrid(pos) {
    const round = (n) => Math.round(n / GRID) * GRID;
    return { top: round(pos.top), left: round(pos.left) };
  }

  // Re-clamp and snap all icons on window resize
  useEffect(() => {
    function handleResize() {
      setItems((prev) =>
        prev.map((it) => {
          const clamped = clampToBounds(it.position);
          const snapped = snapToGrid(clamped);
          return { ...it, position: snapped };
        })
      );
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item) => {
    setOpenWindows((prev) => {
      // If the clicked item is currently open, close it with animation
      if (prev[item.id]) {
        // Start closing animation for the clicked item
        setClosingWindows((closingPrev) => ({
          ...closingPrev,
          [item.id]: true,
        }));

        // After animation completes, actually close the window
        setTimeout(() => {
          setOpenWindows((openPrev) => ({ ...openPrev, [item.id]: false }));
          setClosingWindows((closingPrev) => ({
            ...closingPrev,
            [item.id]: false,
          }));
        }, 200);

        return prev; // Don't change state immediately
      }

      // If the clicked item is closed, close all other windows first, then open the clicked item
      const closedAll = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Then open the clicked item
      return {
        ...closedAll,
        [item.id]: true,
      };
    });
  };

  const handleDesktopClick = (e) => {
    // Don't close windows if clicking on sticky notes or their children
    if (e.target.closest("[data-sticky-note]")) {
      return;
    }

    // Start closing animation for all open windows
    const currentlyOpen = Object.keys(openWindows).filter(
      (key) => openWindows[key]
    );
    if (currentlyOpen.length > 0) {
      setClosingWindows(
        currentlyOpen.reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      // After animation completes, actually close the windows
      setTimeout(() => {
        setOpenWindows({});
        setClosingWindows({});
      }, 200); // Match the CSS transition duration
    }
  };

  const handleStickyNoteUpdate = useCallback((updatedNote) => {
    setStickyNotes((prev) => {
      const updated = prev.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      return updated;
    });
  }, []);

  const handleNoteCreated = useCallback((newNote) => {
    setStickyNotes((prev) => [...prev, newNote]);
  }, []);

  const handleCreateStickyNote = useCallback(() => {
    const colorOptions = [
      { bg: "#FFE066", text: "#333333" },
      { bg: "#FF6B6B", text: "#FFFFFF" },
      { bg: "#4ECDC4", text: "#FFFFFF" },
      { bg: "#45B7D1", text: "#FFFFFF" },
      { bg: "#96CEB4", text: "#333333" },
      { bg: "#FFEAA7", text: "#333333" },
      { bg: "#DDA0DD", text: "#333333" },
      { bg: "#98D8C8", text: "#333333" },
    ];

    const randomColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];

    // Calculate dynamic size based on content
    const baseWidth = 200;
    const baseHeight = 120;
    const contentHeight = 60; // Base height for content
    const dynamicHeight = baseHeight + contentHeight;

    const newNote = {
      id: `sticky-note-${Date.now()}`,
      title: "New Note",
      content:
        "Leave a review or feedback here! Click to edit and share your thoughts.",
      position: {
        top: window.innerHeight / 2 - dynamicHeight / 2,
        left: window.innerWidth / 2 - baseWidth / 2,
      },
      size: { width: baseWidth, height: dynamicHeight },
      bgColor: randomColor.bg,
      textColor: randomColor.text,
      isEditable: true,
      type: "visitor",
      author: null,
      status: "approved",
      createdAt: new Date().toISOString(),
    };

    setStickyNotes((prev) => [...prev, newNote]);
  }, []);

  // Helper function to clear sticky notes (for testing)
  const clearStickyNotes = useCallback(() => {
    localStorage.removeItem("stickyNotes");
    setStickyNotes(stickyNotesData);
  }, []);

  const handleMinimizeNote = useCallback((noteId) => {
    setMinimizedNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId); // Toggle off
      } else {
        newSet.add(noteId); // Toggle on
      }
      return newSet;
    });
  }, []);

  const handleMinimizeAll = useCallback(() => {
    setMinimizedNotes((prev) => {
      const allNoteIds = new Set(
        getApprovedNotes(stickyNotes).map((note) => note.id)
      );
      return allNoteIds;
    });
  }, [stickyNotes]);

  const handleDeleteStickyNote = useCallback((noteId) => {
    setStickyNotes((prev) => prev.filter((note) => note.id !== noteId));
  }, []);

  return (
    <div
      className="desktop-wallpaper desktop-background"
      style={{ backgroundColor: "#F5F2E8" }}
      onClick={handleDesktopClick}
    >
      <Menubar
        onTidy={() => {
          // Clear saved positions and reapply default top-right stacking
          try {
            localStorage.removeItem("desktopPositions");
          } catch (_e) {}
          // Re-run initializer logic by computing defaults again
          const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
          const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
          const menubarHeight = 32;
          const iconW = 64;
          const topPadding = menubarHeight + 16;
          const rightPadding = 24;
          const verticalGap = 120;
          const dockHeight = 100;
          const usableHeight = vh - topPadding - dockHeight - 16;
          const rowsPerColumn = Math.max(
            1,
            Math.floor(usableHeight / verticalGap)
          );
          const columnGap = 24;
          setItems(
            desktopItems.map((it, index) => {
              const col = Math.floor(index / rowsPerColumn);
              const row = index % rowsPerColumn;
              const left =
                vw - iconW - rightPadding - col * (iconW + columnGap);
              const top = topPadding + row * verticalGap;
              return { ...it, position: { top, left } };
            })
          );
        }}
        onCreateStickyNote={handleCreateStickyNote}
      />
      <Hero onDesktopClick={handleDesktopClick} />

      {/* Desktop Items DndContext */}
      <DndContext
        sensors={sensors}
        modifiers={[restrictToWindowEdges]}
        onDragEnd={({ active, delta }) => {
          setItems((prev) =>
            prev.map((it) => {
              if (it.id !== active.id) return it;
              const next = {
                top: it.position.top + delta.y,
                left: it.position.left + delta.x,
              };
              const clamped = clampToBounds(next);
              const snapped = snapToGrid(clamped);
              return { ...it, position: snapped };
            })
          );
        }}
      >
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            onItemClick={() => handleItemClick(item)}
          />
        ))}
      </DndContext>

      {/* Sticky Notes DndContext */}
      <DndContext
        sensors={sensors}
        onDragEnd={useCallback(({ active, delta }) => {
          setStickyNotes((prev) =>
            prev.map((note) => {
              if (note.id !== active.id) return note;
              const next = {
                top: note.position.top + delta.y,
                left: note.position.left + delta.x,
              };
              return { ...note, position: next };
            })
          );
        }, [])}
      >
        {useMemo(
          () =>
            getApprovedNotes(stickyNotes).map((note) => (
              <StickyNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                position={note.position}
                size={note.size}
                bgColor={note.bgColor}
                textColor={note.textColor}
                isEditable={note.isEditable}
                type={note.type}
                author={note.author}
                status={note.status}
                createdAt={note.createdAt}
                isMinimized={minimizedNotes.has(note.id)}
                onUpdate={handleStickyNoteUpdate}
                onMinimize={handleMinimizeNote}
                onMinimizeAll={handleMinimizeAll}
                onDelete={handleDeleteStickyNote}
              />
            )),
          [
            stickyNotes,
            handleStickyNoteUpdate,
            minimizedNotes,
            handleMinimizeNote,
            handleMinimizeAll,
            handleDeleteStickyNote,
          ]
        )}
      </DndContext>

      {/* Desktop Windows - outside DndContext */}
      {desktopItems.map((item) => {
        if (!openWindows[item.id]) return null;

        // Special case: About Me opens 3 windows
        if (item.id === 2) {
          return aboutMeWindows.map((windowPreset, index) => {
            // Special case: PhotoViewer for the 3rd window
            if (windowPreset.type === "photo-viewer") {
              return (
                <PhotoViewer
                  key={`${item.id}-photo-viewer`}
                  top={`${windowPreset.position.top}px`}
                  left={`${windowPreset.position.left}px`}
                  style={{ zIndex: 99 + index }}
                  isClosing={closingWindows[item.id]}
                />
              );
            }

            // Special case: AboutMe custom component for the 2nd window
            if (windowPreset.type === "about-me") {
              return (
                <AboutMe
                  key={`${item.id}-about-me`}
                  width={windowPreset.size.width}
                  height={windowPreset.size.height}
                  position={windowPreset.position}
                  style={{ zIndex: 99 + index }}
                  isClosing={closingWindows[item.id]}
                />
              );
            }

            // Default WindowDesktop for first 2 windows
            return (
              <WindowDesktop
                key={`${item.id}-${windowPreset.id}`}
                title={windowPreset.header.title}
                position={windowPreset.position}
                bio={windowPreset.header.bio}
                desktopItem={item}
                width={windowPreset.size.width}
                height={windowPreset.size.height}
                content={windowPreset.content}
                onClose={() =>
                  setOpenWindows((prev) => ({ ...prev, [item.id]: false }))
                }
                style={{ zIndex: 99 + index }}
                isClosing={closingWindows[item.id]}
              />
            );
          });
        }

        // Default case: single window for other items
        return (
          <WindowDesktop
            key={item.id}
            title={item.label}
            position={{ top: 100, left: 100 }}
            bio={item.bio}
            desktopItem={item}
            onClose={() =>
              setOpenWindows((prev) => ({ ...prev, [item.id]: false }))
            }
            isClosing={closingWindows[item.id]}
          />
        );
      })}

      <Dock onDesktopClick={handleDesktopClick} />
    </div>
  );
}
