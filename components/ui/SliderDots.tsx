"use client";

import { useEffect, useState } from "react";

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
      const width = el.clientWidth;
      if (width <= 0) return;
      const idx = Math.min(count - 1, Math.max(0, Math.round(scrollLeft / (width * 0.85))));
      setActiveIndex(idx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [targetId, count]);

  const scrollTo = (index: number) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const children = el.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  };

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
