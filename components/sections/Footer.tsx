"use client";

import Link from "next/link";
import { PRODUCT } from "@/lib/product";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[var(--line)] bg-white text-[var(--ink)]">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-12 sm:px-8 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand & Tagline */}
          <div className="max-w-[320px]">
            <Link href="#top" className="inline-block">
              <span className="font-display text-[22px] font-bold tracking-tight text-[var(--ink)]">
                {PRODUCT.name}
              </span>
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--ink-soft)]">
              The AI Operating System for
              <br />
              {PRODUCT.subIndustry}.
            </p>
            <div className="mt-4">
              <a
                href="mailto:info@nestack.com"
                className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)]"
              >
                info@nestack.com
              </a>
            </div>
          </div>

          {/* Column 1: PLATFORM */}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-mute)]">
              Platform
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="#platform"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="#modules"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Modules
                </Link>
              </li>
              <li>
                <Link
                  href="#intelligence"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="#integrations"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: GETTING STARTED */}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-mute)]">
              Getting Started
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="#how"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#onboarding"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Onboarding
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Book a demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: GOOD TO KNOW */}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-mute)]">
              Good to Know
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="#compliance"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Standards
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Hardware add-ons
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Questions
                </Link>
              </li>
              <li>
                <a
                  href={PRODUCT.agentsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  Electrical AI agents
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-[13px] text-[var(--ink-mute)] sm:flex-row">
          <p>© 2026 Cirqentra AI</p>
          <p className="font-medium text-[var(--ink-soft)]">Built with Nestack</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 transition-colors hover:text-[var(--ink)]"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
