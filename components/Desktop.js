"use client";

import Dock from "./Dock";
import Hero from "./Hero";
import Menubar from "./MenuBar";
import DesktopItem from "./DesktopItem";
import desktopItems from "@/data/desktopItems";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { useEffect, useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import WindowDesktop from "./WindowDesktop";
import PhotoViewer from "./PhotoViewer";
import AboutMe from "./AboutMe";
import { aboutMeWindows } from "@/data/aboutMeWindows";

function DraggableItem({ item, onItemClick }) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: item.id,
  });
  const dragStyle = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
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
      // Close all other windows first
      const closedAll = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Then toggle the clicked item
      return {
        ...closedAll,
        [item.id]: !prev[item.id],
      };
    });
  };

  return (
    <div className="desktop-wallpaper" style={{ backgroundColor: "#F5F2E8" }}>
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
      />
      <Hero />
      <DndContext
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
          />
        );
      })}

      <Dock />
    </div>
  );
}
