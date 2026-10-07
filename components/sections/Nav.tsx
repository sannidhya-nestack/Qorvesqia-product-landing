"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PRODUCT } from "@/lib/product";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#modules", label: "Modules" },
  { href: "#how", label: "How it works" },
  { href: "#compliance", label: "Compliance" },
  { href: "#products", label: "Add-ons" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [head, tail] = PRODUCT.name.split(".");

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-[var(--line)] bg-[color:var(--paper)]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[70px] max-w-[1240px] flex-nowrap items-center justify-between gap-3 px-5 sm:px-8">
          {/* Logo */}
          <Link href="#top" className="flex items-center" onClick={() => setIsOpen(false)}>
            <span className="whitespace-nowrap font-display text-[17px] font-bold uppercase leading-none tracking-[0.02em] text-[var(--ink)]">
              {head}
              {tail && <span className="text-[var(--brand)]">.{tail}</span>}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden flex-nowrap items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex flex-nowrap items-center gap-2 sm:gap-3">
            {/* Book Button */}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-[36px] sm:h-[40px] items-center justify-center rounded-full bg-slate-950 px-4 sm:px-5 text-[13px] sm:text-[13.5px] font-medium text-white shadow-sm transition-all hover:bg-slate-800"
            >
              <span className="sm:hidden lowercase font-medium">book</span>
              <span className="hidden sm:inline">Book a demo</span>
            </Link>

            {/* Mobile Menu Toggle: 3 lines only */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--ink)] transition-colors hover:bg-black/5 hover:text-[var(--brand)] lg:hidden"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer - Full screen mobile overlay */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[70px] bottom-0 z-50 h-[calc(100dvh-70px)] w-full bg-[var(--paper)] px-5 pt-3 pb-8 overflow-y-auto flex flex-col justify-between lg:hidden animate-in fade-in duration-150">
          <nav className="mx-auto flex w-full max-w-[1240px] flex-col" aria-label="Mobile Navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-[var(--line)] py-4 text-[16px] font-medium text-[var(--ink)] transition-colors hover:text-[var(--brand)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mx-auto w-full max-w-[1240px] pt-8 pb-4">
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex h-[46px] w-full items-center justify-center rounded-full bg-slate-950 text-[14px] font-medium text-white shadow-sm transition-all hover:bg-slate-800"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
