"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { PRODUCT } from "@/lib/product";

const faqs = [
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRODUCT.name} pricing depends on your team size, number of active projects, service workload, and the capabilities you need. Plans can be structured around estimating, project execution, field operations, commissioning, service, or a broader company-wide rollout. Contact our team for pricing based on how your electrical contracting business actually operates.`,
  },
  {
    q: `Do we need to replace our current software to use ${PRODUCT.name}?`,
    a: `No. ${PRODUCT.name} is designed to work alongside the systems your teams already depend on. You can introduce it into high-friction workflows first—such as bid review, field reporting, service dispatch, or maintenance intelligence—without replacing your entire technology stack at once.`,
  },
  {
    q: `How quickly can our team start getting value from the platform?`,
    a: `You do not need to digitize every historical project before getting started. ${PRODUCT.name} can begin with current bids, active projects, service work, or selected electrical assets. The fastest value usually comes from reducing repetitive document review, manual reporting, missed changes, dispatch delays, and time spent searching for project information.`,
  },
  {
    q: `Is ${PRODUCT.name} suitable for both project work and electrical service operations?`,
    a: `Yes. ${PRODUCT.name} is designed for electrical contractors that perform construction, retrofit, commissioning, maintenance, or recurring service work. This means the same platform can support the project lifecycle while also helping service teams manage customer requests, technician dispatch, asset history, and maintenance priorities.`,
  },
  {
    q: `What business problems should we expect ${PRODUCT.name} to reduce?`,
    a: `${PRODUCT.name} is designed around problems electrical contractors regularly lose time or margin to: slow bid-document review, missed scope, disconnected field reports, delayed material decisions, unrecorded change exposure, difficult project-document searches, reactive maintenance, and inefficient service dispatch. The goal is to help your team act earlier with better information rather than discover issues after they have already affected cost or schedule.`,
  },
  {
    q: `Can ${PRODUCT.name} work with our existing drawings, PDFs, reports, and field documents?`,
    a: `Yes. The platform is designed to work with the documents electrical contractors already receive and create, including drawings, specifications, bid packages, RFIs, equipment information, field reports, photos, commissioning records, maintenance records, and service documentation. Your team should not need to manually recreate useful project information simply to make it usable.`,
  },
  {
    q: `Will AI make decisions without our estimator, project manager, or technician approving them?`,
    a: `No. ${PRODUCT.name} is intended to assist experienced electrical professionals, not replace their authority. Important recommendations—such as estimated scope changes, compliance concerns, maintenance actions, or readiness decisions—can be reviewed against the underlying evidence before your team approves or acts on them.`,
  },
  {
    q: `How does ${PRODUCT.name} help protect project margins?`,
    a: `${PRODUCT.name} helps connect estimated labor, installed progress, actual field hours, material requirements, changes, and project risk. This gives project teams earlier visibility into productivity problems, unpriced scope changes, material delays, and other conditions that can erode margin while there is still time to respond.`,
  },
  {
    q: `Can smaller electrical contractors use ${PRODUCT.name}, or is it only for large enterprises?`,
    a: `${PRODUCT.name} can be introduced gradually. A smaller contractor may start with estimating, field reporting, or service operations, while a larger electrical contractor may use the platform across multiple projects, branches, field teams, and maintenance programs. The subscription can be aligned with the scale of the operation rather than requiring every capability from day one.`,
  },
  {
    q: `How difficult is onboarding for our office and field teams?`,
    a: `${PRODUCT.name} is designed around familiar electrical workflows rather than generic enterprise-software processes. Office teams can work from documents, drawings, project records, and operational alerts, while field users can capture information through practical workflows such as voice reporting, photos, work updates, and service records. Rollout can be phased by team or workflow to reduce disruption.`,
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
              Pricing, NECA labor, BIM, switchgear risk and NFPA 70B service — answered for electrical contractors evaluating {PRODUCT.name}.
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
