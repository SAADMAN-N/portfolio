"use client";

import { useEffect, useRef, useState, useId } from "react";

/**
 * Renders a single mermaid diagram. Uses dynamic import so mermaid
 * is only loaded when this component mounts (Mach project only).
 */
export default function MermaidDiagram({ id, code, title }) {
  const reactId = useId().replace(/:/g, "");
  const containerRef = useRef(null);
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          flowchart: { useMaxWidth: true, htmlLabels: true },
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
      {title && (
        <h4 className="text-sm font-semibold text-[#e5e5ea]">{title}</h4>
      )}
      <div
        ref={containerRef}
        className="flex justify-center overflow-x-auto rounded-lg p-4"
      >
        {error && (
          <p className="text-xs text-red-400">Failed to render diagram</p>
        )}
        {svg && (
          <div
            className="mermaid-diagram"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  );
}
