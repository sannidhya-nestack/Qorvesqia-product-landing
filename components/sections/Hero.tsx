"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PRODUCT } from "@/lib/product";

// Authentic event production & live entertainment jobsite photography
const strip = [
  { src: "/assets/concert-lighting-truss.jpg", label: "Arena Lighting Rig & Truss Grid" },
  { src: "/assets/live-foh-soundcheck.jpg", label: "Festival Stage Soundcheck & FOH Audio" },
  { src: "/assets/audio-lighting-console.jpg", label: "Digital Audio & DMX Lighting Console" },
  { src: "/assets/stage-band-performance.jpg", label: "Live Stage Performance & Backline Monitoring" },
  { src: "/assets/pyro-stage-production.jpg", label: "SFX Pyrotechnics & Flame FX Show Ops" },
];

export default function Hero() {
  const track = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;

      if (content.current) {
        content.current.style.transform = `translate3d(0, ${(-p * 52).toFixed(1)}px, 0) scale(${(1 - p * 0.06).toFixed(4)})`;
        content.current.style.opacity = (1 - p * 0.55).toFixed(3);
      }
      if (gallery.current) {
        gallery.current.style.transform = `translate3d(0, ${((1 - p) * 24).toFixed(1)}px, 0) scale(${(0.96 + p * 0.08).toFixed(4)})`;
        gallery.current.style.opacity = (0.9 + p * 0.1).toFixed(3);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" ref={track} className="hero-pin relative">
      <div className="hero-scene flex flex-col overflow-hidden border-b border-[var(--line)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 0%, rgba(23,42,129,.08), transparent 60%)," +
              "radial-gradient(50% 40% at 92% 8%, rgba(66,216,255,.10), transparent 60%)",
          }}
        />

        <div
          ref={content}
          className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-5 pt-16 sm:px-8 sm:pt-20"
        >
          <h1 className="reveal-2 mt-2 h-display text-[var(--ink)] text-[clamp(1.7rem,6.5vw,5.3rem)]">
            The Connected Operating System for
            <br />
            <span className="text-[var(--brand)]">Live Event Production</span>
          </h1>

          <div className="mt-8 flex flex-col gap-8">
            <p className="reveal-3 max-w-[62ch] text-[clamp(1rem,1.4vw,1.32rem)] leading-[1.55] text-[var(--ink-soft)]">
              <strong className="font-semibold text-[var(--ink)]">{PRODUCT.name}</strong> unifies the entire live entertainment lifecycle into one intelligent command center — synchronizing artist rider intake, technical stage specs, union crew dispatch, dock logistics, real-time cue calling, and post-show financial settlement without operational surprises.
            </p>
            <div className="reveal-3 flex flex-wrap items-center gap-3">
              <Link href="#contact" className="btn btn-primary">
                Book a demo
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Link>
              <Link href="#platform" className="btn btn-ghost">
                See the platform
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

        <div ref={gallery} className="hero-gallery marquee-mask mt-10 sm:mt-14">
          <div className="hero-marquee-track pb-14 sm:pb-20">
            {[...strip, ...strip].map((t, i) => (
              <figure
                key={i}
                className="media media-grad mx-2.5 h-[260px] w-[420px] shrink-0 sm:h-[320px] sm:w-[520px]"
              >
                <Image
                  src={t.src}
                  alt={t.label}
                  width={1040}
                  height={640}
                  priority={i < 3}
                  sizes="520px"
                />
                <figcaption className="absolute bottom-4 left-5 z-10 flex items-center gap-2 text-[13px] font-medium text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {t.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
