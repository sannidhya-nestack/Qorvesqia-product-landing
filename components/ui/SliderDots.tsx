"use client";

import { useEffect, useState, useCallback } from "react";

type SliderDotsProps = {
  targetId: string;
  count: number;
  size?: "sm" | "lg";
  onDark?: boolean;
};

export default function SliderDots({
  targetId,
  count,
  size = "sm",
  onDark = false,
}: SliderDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = document.getElementById(targetId);
    if (!el || el.children.length === 0) return;

    const parentRect = el.getBoundingClientRect();
    let closestIdx = 0;
    let minDiff = Infinity;

    Array.from(el.children).forEach((child, idx) => {
      const childRect = (child as HTMLElement).getBoundingClientRect();
      const diff = Math.abs(childRect.left - parentRect.left);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  }, [targetId]);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      updateActiveIndex();
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(updateActiveIndex, 100);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    const rafId = requestAnimationFrame(() => {
      updateActiveIndex();
    });

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveIndex);
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [targetId, updateActiveIndex]);

  const scrollTo = (index: number) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const child = el.children[index] as HTMLElement;
    if (child) {
      const parentRect = el.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();
      const targetLeft = el.scrollLeft + (childRect.left - parentRect.left);
      el.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  if (count <= 1) return null;

  return (
    <div
      className={`slider-dots slider-dots-${size} ${onDark ? "on-dark" : ""}`}
      aria-label="Slide position"
      role="tablist"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-label={`Go to item ${i + 1} of ${count}`}
          aria-selected={i === activeIndex}
          aria-current={i === activeIndex}
          className={`slider-dot-btn ${i === activeIndex ? "is-active" : ""}`}
          onClick={() => scrollTo(i)}
        />
      ))}
    </div>
  );
}
