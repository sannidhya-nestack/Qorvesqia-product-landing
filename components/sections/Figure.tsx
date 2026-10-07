"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import DashboardShell, { type ShellProps } from "./DashboardShell";

export type CalloutPin = {
  id: string;
  label: string;
  anchor: { x: number; y: number };
  label_at?: { x: number; y: number };
  side?: "left" | "right";
  /**
   * What this callout is — shown when the pin is CLICKED (the label opens into a
   * small description popover). REQUIRED: every callout should carry a real, 1–2
   * sentence explanation of the UI element it points at, so the pin is an
   * interactive explainer, not a static tag. Written per product from the real p1.
   */
  description?: string;
};

type FigureProps = {
  src: string;
  alt: string;
  url: string;
  actions?: string;
  callouts?: CalloutPin[];
  /**
   * Draw the app chrome (sidebar + topbar) as live markup around the cropped
   * content image instead of showing `src` as one flat picture. The composite
   * keeps the original frame's geometry, so callout anchors are unchanged.
   * Keep `src` pointing at the original /assets/p<N> file: it is the fallback if
   * `shell` is removed.
   */
  shell?: ShellProps;
  /** A small chip over the top-left of the screenshot (module name etc.). */
  tag?: string;
  /** Pointer-driven 3D tilt on the hero plate only. */
  tilt?: boolean;
  /** Static resting lean (alternated across a grid); straightens on hover. */
  lean?: "left" | "right";
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function Figure({
  src,
  alt,
  url,
  actions = "LIVE · DASHBOARD",
  callouts,
  shell,
  tag,
  tilt = false,
  lean,
  priority = false,
  width = 1600,
  height = 900,
}: FigureProps) {
  const [zoom, setZoom] = useState(false);
  // Which callout pin is open (showing its description popover). One at a time.
  const [openPin, setOpenPin] = useState<string | null>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setZoom(false), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, close]);

  // Close an open callout popover on Escape or a click anywhere outside a pin.
  useEffect(() => {
    if (!openPin) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPin(null);
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-callout]")) setOpenPin(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [openPin]);

  // Hero-only tilt. Fine pointers only; disabled under reduced motion. Writes
  // the transform straight to the node so there is no per-move React render.
  useEffect(() => {
    if (!tilt) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${(px * 3).toFixed(2)}deg) rotateX(${(-py * 2.4).toFixed(2)}deg)`;
    };
    const reset = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [tilt]);

  const plate = (
    <figure className="figure-frame">
      <div className="figure-chrome">
        <span className="dot" aria-hidden />
        <span className="dot" aria-hidden />
        <span className="dot" aria-hidden />
        <span className="url" aria-hidden>{url}</span>
        <span className="actions hidden sm:inline">{actions}</span>
        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label="Zoom screenshot"
          className="ml-2 grid h-7 w-7 place-items-center rounded-md border border-[var(--line-2)] bg-[var(--card)] text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)]"
        >
          <Maximize2 size={13} strokeWidth={1.75} />
        </button>
      </div>
      <div
        className="relative block w-full cursor-zoom-in"
        role="button"
        tabIndex={0}
        aria-label={`Zoom ${alt}`}
        onClick={() => setZoom(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setZoom(true);
          }
        }}
      >
        {shell ? (
          <>
            <DashboardShell {...shell} priority={priority} />
            <span className="sr-only">{alt}</span>
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        )}
        {tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-[var(--line-2)] bg-[var(--card)]/90 px-3 py-1 text-[11px] font-semibold text-[var(--ink)] backdrop-blur">
            {tag}
          </span>
        )}
        {callouts && callouts.length > 0 && (
          <div className="absolute inset-0 pointer-events-auto">
            {callouts.map((c) => {
              const labelSide = c.side ?? "left";
              const labelX =
                c.label_at?.x ??
                (labelSide === "left"
                  ? Math.max(0, c.anchor.x - 0.09)
                  : Math.min(1, c.anchor.x + 0.09));
              const labelY = c.label_at?.y ?? c.anchor.y;
              const lineLeft = Math.min(c.anchor.x, labelX) * 100;
              const lineWidth = Math.abs(c.anchor.x - labelX) * 100;
              const isOpen = openPin === c.id;

              return (
                <span key={c.id} className="block" data-callout>
                  <span
                    className="pin-line"
                    style={{
                      left: `${lineLeft}%`,
                      top: `${c.anchor.y * 100}%`,
                      width: `${lineWidth}%`,
                    }}
                    aria-hidden
                  />
                  <span
                    className="pin"
                    style={{
                      left: `${c.anchor.x * 100}%`,
                      top: `${c.anchor.y * 100}%`,
                    }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    className="pin-label"
                    style={{
                      left: `${labelX * 100}%`,
                      top: `${labelY * 100}%`,
                      transform:
                        labelSide === "left"
                          ? "translate(-100%, -50%)"
                          : "translate(0, -50%)",
                      cursor: c.description ? "pointer" : "default",
                    }}
                    aria-expanded={isOpen}
                    aria-label={c.description ? `${c.label} — show description` : c.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!c.description) return;
                      setOpenPin(isOpen ? null : c.id);
                    }}
                  >
                    <span>{c.label}</span>
                    {c.description && (
                      <span aria-hidden className="pin-label-toggle">
                        {isOpen ? "–" : "+"}
                      </span>
                    )}
                  </button>

                  {isOpen && c.description && (
                    <span
                      role="dialog"
                      aria-label={c.label}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "absolute",
                        left: `${labelX * 100}%`,
                        top: `calc(${labelY * 100}% + 1.25rem)`,
                        transform: labelSide === "left" ? "translateX(-75%)" : "translateX(0)",
                        zIndex: 40,
                        width: "19rem",
                        maxWidth: "85vw",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        border: "1.5px solid #fde047",
                        background: "#fef9c3",
                        boxShadow: "0 16px 36px -8px rgba(113, 63, 18, 0.25)",
                        textAlign: "left",
                      }}
                    >
                      <span className="font-bold text-[12px] uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        {c.label}
                      </span>
                      <span className="text-[13px] leading-relaxed text-amber-950">
                        {c.description}
                      </span>
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </figure>
  );

  return (
    <>
      {tilt ? (
        <div ref={tiltRef} style={{ transition: "transform .25s ease" }}>
          {plate}
        </div>
      ) : lean ? (
        <div className={lean === "left" ? "plate-lean-left" : "plate-lean-right"}>
          {plate}
        </div>
      ) : (
        plate
      )}

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed: ${alt}`}
          className="fixed inset-0 z-[80] grid place-items-center bg-[color:var(--ink)]/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close zoom"
            className="absolute right-5 top-5 z-[90] grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[var(--ink)] text-white hover:bg-white hover:text-[var(--ink)] transition-colors shadow-lg"
          >
            <X size={18} />
          </button>
          <div className="figure-frame w-full max-w-[1400px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="figure-chrome">
              <span className="dot" aria-hidden />
              <span className="dot" aria-hidden />
              <span className="dot" aria-hidden />
              <span className="url" aria-hidden>{url}</span>
              <span className="actions">{actions}</span>
            </div>
            <div className="relative block w-full">
              {shell ? (
                <>
                  <DashboardShell {...shell} unoptimized />
                  <span className="sr-only">{alt}</span>
                </>
              ) : (
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="block h-auto w-full"
                  sizes="95vw"
                />
              )}
              {callouts && callouts.length > 0 && (
                <div className="absolute inset-0 pointer-events-auto">
                  {callouts.map((c) => {
                    const labelSide = c.side ?? "left";
                    const labelX =
                      c.label_at?.x ??
                      (labelSide === "left"
                        ? Math.max(0, c.anchor.x - 0.09)
                        : Math.min(1, c.anchor.x + 0.09));
                    const labelY = c.label_at?.y ?? c.anchor.y;
                    const lineLeft = Math.min(c.anchor.x, labelX) * 100;
                    const lineWidth = Math.abs(c.anchor.x - labelX) * 100;
                    const isOpen = openPin === c.id;

                    return (
                      <span key={`zoom-${c.id}`} className="block" data-callout>
                        <span
                          className="pin-line"
                          style={{
                            left: `${lineLeft}%`,
                            top: `${c.anchor.y * 100}%`,
                            width: `${lineWidth}%`,
                          }}
                          aria-hidden
                        />
                        <span
                          className="pin"
                          style={{
                            left: `${c.anchor.x * 100}%`,
                            top: `${c.anchor.y * 100}%`,
                          }}
                          aria-hidden
                        />
                        <button
                          type="button"
                          className="pin-label"
                          style={{
                            left: `${labelX * 100}%`,
                            top: `${labelY * 100}%`,
                            transform:
                              labelSide === "left"
                                ? "translate(-100%, -50%)"
                                : "translate(0, -50%)",
                            cursor: c.description ? "pointer" : "default",
                          }}
                          aria-expanded={isOpen}
                          aria-label={c.description ? `${c.label} — show description` : c.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!c.description) return;
                            setOpenPin(isOpen ? null : c.id);
                          }}
                        >
                          <span>{c.label}</span>
                          {c.description && (
                            <span aria-hidden className="pin-label-toggle">
                              {isOpen ? "–" : "+"}
                            </span>
                          )}
                        </button>

                        {isOpen && c.description && (
                          <span
                            role="dialog"
                            aria-label={c.label}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: "absolute",
                              left: `${labelX * 100}%`,
                              top: `calc(${labelY * 100}% + 1.25rem)`,
                              transform: labelSide === "left" ? "translateX(-75%)" : "translateX(0)",
                              zIndex: 40,
                              width: "22rem",
                              maxWidth: "85vw",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.35rem",
                              padding: "0.85rem 1rem",
                              borderRadius: "12px",
                              border: "1.5px solid #fde047",
                              background: "#fef9c3",
                              boxShadow: "0 16px 36px -8px rgba(113, 63, 18, 0.25)",
                              textAlign: "left",
                            }}
                          >
                            <span className="font-bold text-[12px] uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-amber-500" />
                              {c.label}
                            </span>
                            <span className="text-[13px] leading-relaxed text-amber-950">
                              {c.description}
                            </span>
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
