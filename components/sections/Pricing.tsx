import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPrice } from "@/lib/nestack";
import { PRODUCT } from "@/lib/product";

export default async function Pricing() {
  const price = await getPrice(PRODUCT.insubId);

  return (
    <section id="pricing" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-5 pt-4 pb-8 sm:px-8 sm:pt-6 sm:pb-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div className="max-w-[46ch]">
            <span className="eyebrow">Pricing</span>
            <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
              One plan. Complete live production operations.
            </h2>
            <p className="mt-6 text-[15.5px] leading-[1.6] text-[var(--ink-soft)]">
              Simple, transparent pricing for the entire production platform — no per-seat penalties, no tiers to decode.
              Talk to us and we’ll tailor it to your production volume, touring roster, and festival operations.
            </p>
          </div>

          <div className="rounded-[24px] border border-[var(--line-2)] bg-[var(--card)] p-8 sm:p-10">
            <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--ink-mute)]">
              Starting at
            </span>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-[clamp(2.6rem,6vw,4rem)] font-bold leading-none text-[var(--ink)]">
                $
                <span data-price="true" data-price-source="api" className="tnum">
                  {price}
                </span>
              </span>
              <span className="pb-2 text-[16px] font-medium text-[var(--ink-mute)]">/mo</span>
            </div>
            <p className="mt-5 max-w-[38ch] text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">
              Full access to every module — rider intake, master production planning, technical AV stage coordination,
              union crew dispatch, dock logistics, live run-of-show cue calling, safety compliance, and final financial settlement.
            </p>
            <Link href="#contact" className="btn btn-primary mt-8 h-12 px-7 text-[14px]">
              Know more
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
            <p className="mt-6 border-t border-[var(--line)] pt-4 font-mono text-[9.5px] uppercase leading-[1.65] tracking-[0.06em] text-[var(--ink-mute)]">
              Enterprise security, custom ERP integrations, and multi-tour deployments are supported across all scalable contracts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
