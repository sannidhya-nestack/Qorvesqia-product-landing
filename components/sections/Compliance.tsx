import { FileSearch } from "lucide-react";
import SliderDots from "@/components/ui/SliderDots";
import { COMPLIANCE } from "@/lib/showcase";
import { PRODUCT } from "@/lib/product";

export default function Compliance() {
  if (!COMPLIANCE.length) return null;

  return (
    <section id="compliance" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="max-w-[48ch] lg:max-w-none">
            <span className="eyebrow">Compliance</span>
            <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
              Mapped to the codes your work is inspected against.
            </h2>
          </div>
          <p className="max-w-[54ch] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            {PRODUCT.name} recognises these standards in your documents, tags each callout to the
            reference it belongs to and keeps the evidence trail your reviewers and inspectors ask
            for. Sign-off stays with your engineers.
          </p>
        </div>

        <SliderDots targetId="compliance-cards" count={COMPLIANCE.length} size="sm" />

        <ul id="compliance-cards" className="slider-sm mt-14 grid gap-5 sm:grid-cols-2">
          {COMPLIANCE.map((c) => (
            <li key={c.code} className="card p-6">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--tint)] text-[var(--brand)]"
                  aria-hidden="true"
                >
                  <FileSearch size={18} strokeWidth={2.2} />
                </span>
                <span className="inline-flex items-center rounded-full border border-[var(--line-2)] bg-[var(--paper-2)] px-3 py-1 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--brand)]">
                  {c.code}
                </span>
              </div>
              <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {c.name}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--ink-soft)]">
                {c.note}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-[var(--line)] pt-8">
          <p className="max-w-[1000px] text-[15px] leading-relaxed text-[var(--ink-soft)]">
            These are standards the platform is built to support inside your workflows — obligations that fall on you as the license. They are not certifications held by us, and support in the product is not a substitute for your own counsel or compliance officer.
          </p>
        </div>
      </div>
    </section>
  );
}
