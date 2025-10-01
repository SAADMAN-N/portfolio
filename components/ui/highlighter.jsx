"use client";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";

export function Highlighter({
  children,
  action = "highlight",
  color = "black",
  strokeWidth = 0.7,
  animationDuration = 1000,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  // New: control start delay (ms). You can also combine with index/baseDelayMs
  delayMs = 0,
  index = 0,
  baseDelayMs = 0,
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);
  const timerRef = useRef(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const annotation = annotate(element, annotationConfig);
    annotationRef.current = annotation;

    // Compute effective delay (per-item staggering)
    const effectiveDelay = delayMs + index * baseDelayMs;

    timerRef.current = setTimeout(
      () => {
        // Guard in case unmounted early
        if (!annotationRef.current) return;
        annotationRef.current.show();

        const resizeObserver = new ResizeObserver(() => {
          annotation.hide();
          annotation.show();
        });

        resizeObserver.observe(element);
        resizeObserver.observe(document.body);

        // Save observer on ref for cleanup
        annotationRef.current._resizeObserver = resizeObserver;
      },
      Math.max(0, effectiveDelay)
    );

    return () => {
      if (element) {
        annotate(element, { type: action }).remove();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        const ro = annotationRef.current?._resizeObserver;
        if (ro) ro.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    delayMs,
    index,
    baseDelayMs,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
