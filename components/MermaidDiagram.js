"use client";

import { useCallback, useEffect, useRef, useState, useId } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/**
 * Renders a single mermaid diagram. Uses dynamic import so mermaid
 * is only loaded when this component mounts (Mach project only).
 */
export default function MermaidDiagram({ id, code, title }) {
  const reactId = useId().replace(/:/g, "");
  const containerRef = useRef(null);
  const panContainerRef = useRef(null);
  const panStateRef = useRef({
    isPointerDown: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  const handleZoomWheel = useCallback((e) => {
    // Keep default scrolling unless user intentionally zooms.
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();

    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => {
      const next = prev * factor;
      return Math.min(2.6, Math.max(0.7, next));
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const handlePanStart = useCallback((e) => {
    if (e.button !== 0) return;
    const container = panContainerRef.current;
    if (!container) return;

    panStateRef.current = {
      isPointerDown: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };
    container.setPointerCapture?.(e.pointerId);
    setIsPanning(true);
  }, []);

  const handlePanMove = useCallback((e) => {
    const container = panContainerRef.current;
    const pan = panStateRef.current;
    if (!container || !pan.isPointerDown) return;

    const deltaX = e.clientX - pan.startX;
    const deltaY = e.clientY - pan.startY;
    container.scrollLeft = pan.scrollLeft - deltaX;
    container.scrollTop = pan.scrollTop - deltaY;
  }, []);

  const handlePanEnd = useCallback((e) => {
    const container = panContainerRef.current;
    const pan = panStateRef.current;
    if (!pan.isPointerDown) return;

    panStateRef.current = {
      ...pan,
      isPointerDown: false,
      pointerId: null,
    };
    if (container && pan.pointerId !== null) {
      container.releasePointerCapture?.(pan.pointerId);
    }
    setIsPanning(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            fontSize: "14px",
          },
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            nodeSpacing: 32,
            rankSpacing: 42,
          },
          sequence: { useMaxWidth: true },
        });

        const uniqueId = `mermaid-${id}-${reactId}`;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, code);

        if (!cancelled && containerRef.current) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [id, code]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        {title ? (
          <h4 className="text-sm font-semibold text-[#e5e5ea]">{title}</h4>
        ) : (
          <div />
        )}
        <div className="ml-auto flex items-center gap-2 text-[11px] text-white/60">
          <span>Cmd/Ctrl + scroll to zoom</span>
          <button
            type="button"
            onClick={handleResetZoom}
            className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/70 hover:bg-white/10"
          >
            Reset ({Math.round(zoom * 100)}%)
          </button>
        </div>
      </div>
      <div ref={containerRef} className="w-full rounded-lg p-4">
        {error && <p className="text-xs text-red-400">Failed to render diagram</p>}
        {svg && (
          <ScrollArea
            className="w-full rounded-md"
            viewportRef={panContainerRef}
            viewportClassName={`select-none ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
            viewportProps={{
              onWheel: handleZoomWheel,
              onPointerDown: handlePanStart,
              onPointerMove: handlePanMove,
              onPointerUp: handlePanEnd,
              onPointerCancel: handlePanEnd,
            }}
          >
            <div className="min-w-max">
              <div
                className="mermaid-diagram"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
                }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
            <ScrollBar orientation="horizontal" className="bg-transparent" />
            <ScrollBar orientation="vertical" className="bg-transparent" />
          </ScrollArea>
        )}
      </div>
      <style jsx global>{`
        .mermaid-diagram svg {
          width: auto !important;
          max-width: 100% !important;
          height: auto !important;
          background: transparent;
          display: block;
        }
      `}</style>
    </div>
  );
}
