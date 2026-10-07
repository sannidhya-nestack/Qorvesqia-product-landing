"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { PRODUCT } from "@/lib/product";

const faqs = [
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRODUCT.name} pricing is structured as a transparent, flat monthly subscription based on your production volume, active tour legs, or festival scale — with zero per-seat penalties. Contact our team to configure a plan aligned with your live production operations.`,
  },
  {
    q: `Do we need to replace our current software to use ${PRODUCT.name}?`,
    a: `No. ${PRODUCT.name} integrates alongside Vectorworks, Shoflo, LASSO, Rentman, Flex, and your accounting ERP. You can connect it into high-friction workflows first — such as technical rider parsing, union crew dispatch, live cue timing, or post-show settlement.`,
  },
  {
    q: `How quickly can our team start getting value from the platform?`,
    a: `You can begin on your next active show or upcoming tour leg. Ingesting artist riders and generating bills-of-quantities takes minutes, and master production timelines can be imported directly into the live command center.`,
  },
  {
    q: `Is ${PRODUCT.name} suitable for both single festivals and multi-city touring productions?`,
    a: `Yes. ${PRODUCT.name} supports multi-stage music festivals, arena concert tours, corporate galas, and theatrical productions. Touring legs can inherit master show files while adapting local union crew rules and venue dock schedules for each city.`,
  },
  {
    q: `What operational bottlenecks does ${PRODUCT.name} eliminate?`,
    a: `${PRODUCT.name} eliminates last-minute rider surprises, loading dock traffic jams, IATSE union meal penalties and rest violations, live cue timing drift, and delayed financial settlement with artists and promoters.`,
  },
  {
    q: `Can ${PRODUCT.name} work with our existing PDF riders, CAD stage plots, and input lists?`,
    a: `Yes. Our document intelligence pipeline ingests multi-page artist contracts, PDF technical riders, Excel audio patch lists, lighting universe sheets, and venue specification packets without manual data re-entry.`,
  },
  {
    q: `Will AI make show-critical decisions without human confirmation?`,
    a: `No. ${PRODUCT.name} assists production managers, technical directors, and stage managers rather than replacing them. Every schedule adjustment, crew call, risk mitigation, and settlement invoice requires human review and sign-off.`,
  },
  {
    q: `How does ${PRODUCT.name} protect against union penalties and curfew fines?`,
    a: `Built-in IATSE and collective bargaining guardrails monitor crew call times to alert coordinators before 5-hour meal windows or 8-hour rest periods are breached. During live shows, the delay mitigation engine recalculates run-of-show timing in real time to protect strict municipal noise curfew cutoffs.`,
  },
  {
    q: `Can independent production companies use ${PRODUCT.name}, or is it only for major tours?`,
    a: `${PRODUCT.name} scales from boutique production companies and regional AV providers to global touring promoters and festival organizers. Plans can be tailored to the exact volume of your live operations.`,
  },
  {
    q: `How difficult is onboarding for production managers and touring crew?`,
    a: `${PRODUCT.name} is designed around intuitive live event workflows — digital call sheets, run-of-show timelines, dock arrival boards, and settlement sheets. Office and touring teams can be trained and running within days.`,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="eyebrow">FAQ</span>
            <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
              Questions before you subscribe
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15.5px] leading-[1.6] text-[var(--ink-soft)]">
              Rider intake, union overtime, curfew protection, and tour settlements — answered for live event production teams evaluating {PRODUCT.name}.
            </p>
            <Link href="#contact" className="btn btn-ghost mt-8">
              Book a demo <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={f.q}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 text-left font-semibold text-[var(--ink)]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] leading-snug">{f.q}</span>
                    <Plus
                      size={18}
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-45 text-[var(--brand)]" : "text-[var(--ink-mute)]"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-[15px] leading-[1.65] text-[var(--ink-soft)]">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
