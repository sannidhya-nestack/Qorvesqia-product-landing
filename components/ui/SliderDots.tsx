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

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      let closestIdx = 0;
      let minDiff = Infinity;
      children.forEach((child, i) => {
        const diff = Math.abs(child.offsetLeft - el.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });
      setActiveIndex(closestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // Check initial position
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [targetId]);

  const scrollTo = useCallback(
    (index: number) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      const target = children[index];
      if (target) {
        const targetLeft = target.offsetLeft - el.offsetLeft;
        el.scrollTo({
          left: targetLeft,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    },
    [targetId]
  );

  if (count <= 1) return null;

  return (
    <div
      className={`slider-dots slider-dots-${size} ${onDark ? "on-dark" : ""}`}
      aria-label="Slide position"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to item ${i + 1} of ${count}`}
          aria-current={i === activeIndex}
          className={i === activeIndex ? "is-active" : ""}
          onClick={() => scrollTo(i)}
        />
      ))}
    </div>
  );
}
