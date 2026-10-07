import Image from "next/image";
import { Package } from "lucide-react";
import SliderDots from "@/components/ui/SliderDots";
import { PRODUCTS } from "@/lib/showcase";

export default function Products() {
  if (!PRODUCTS.length) return null;

  return (
    <section id="products" className="border-b border-[var(--line)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="max-w-[48ch] lg:max-w-none">
            <span className="eyebrow">Add-ons</span>
            <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
              Add the hardware your electrical workflow needs.
            </h2>
          </div>
          <p className="max-w-[54ch] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            Optional field testing and continuous telemetry devices that stream live electrical readings into your workspace —
            validating field megger and torque tests against digital dependency graphs and streaming switchgear thermal data under NFPA 70B.
          </p>
        </div>

        <SliderDots targetId="products-list" count={PRODUCTS.length} size="lg" />

        <div id="products-list" className="slider-lg mt-14 grid gap-8">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="card group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--line)] bg-[#faf4ef] p-4 sm:p-8 flex items-center justify-center">
                {p.image ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--accent)] p-8 text-center text-[var(--navy)]">
                    <Package size={40} strokeWidth={1.6} aria-hidden />
                    <span className="font-display text-[15px] font-bold uppercase tracking-[0.04em]">
                      {p.name}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[14.5px] leading-[1.55] text-[var(--ink-soft)]">
                  {p.blurb}
                </p>
                {p.tags && p.tags.length > 0 && (
                  <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label={`Modules integrated with ${p.name}`}
                  >
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-[var(--brand)] px-3 py-1 text-[12px] font-medium text-white"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-[72ch] border-t border-[var(--line)] pt-8 text-[13px] leading-[1.6] text-[var(--ink-mute)]">
          Hardware, installation, and integration are not included in the standard subscription.
          Additional charges apply based on the hardware selected, integration modules required, and
          implementation scope.
        </p>
      </div>
    </section>
  );
}
