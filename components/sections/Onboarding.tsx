import { Check, Cloud, ShieldCheck } from "lucide-react";
import SliderDots from "@/components/ui/SliderDots";
import { ONBOARDING } from "@/lib/onboarding";
import { PRODUCT } from "@/lib/product";

export default function Onboarding() {
  const tiers = [ONBOARDING.essential, ONBOARDING.plus, ONBOARDING.enterprise];

  return (
    <section id="onboarding" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="max-w-[54ch] lg:max-w-none">
            <span className="eyebrow">Onboarding</span>
            <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
              What your onboarding fee covers
            </h2>
          </div>
          <p className="max-w-[60ch] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            {ONBOARDING.description}
          </p>
        </div>

        <SliderDots targetId="onboarding-tiers" count={3} size="lg" />

        <div id="onboarding-tiers" className="slider-lg mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map(({ key, fee, featured, opener, features }) => (
            <div
              key={key}
              className={
                "card flex flex-col p-8" + (featured ? " ring-1 ring-[var(--brand)]" : "")
              }
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[18px] font-bold uppercase tracking-[0.06em] text-[var(--ink)]">
                  {key}
                </h3>
                {featured ? (
                  <span className="inline-flex items-center rounded-full bg-[var(--tint)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--brand)]">
                    Most teams
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-none text-[var(--ink)]">
                  {fee}
                </span>
                <span className="text-[13.5px] font-medium text-[var(--ink-mute)]">
                  one-time
                </span>
              </div>

              <div className="hair my-7" />

              {opener ? (
                <p className="mb-4 text-[13.5px] font-semibold text-[var(--ink)]">
                  {opener}
                </p>
              ) : null}

              <ul className="flex flex-col gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--tint)] text-[var(--brand)]"
                      aria-hidden="true"
                    >
                      <Check size={13} strokeWidth={2.6} />
                    </span>
                    <span className="text-[14.5px] leading-[1.5] text-[var(--ink-soft)]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Where it runs / Deployment Section matching Reference Design */}
        <div className="mt-10 rounded-[24px] border border-[var(--line-2)] bg-[var(--card)] p-7 sm:p-10 shadow-sm">
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--ink-mute)]">
            Where it runs
          </span>
          <h2 className="mt-2 text-[clamp(1.5rem,2.8vw,2.2rem)] font-bold tracking-[-0.02em] text-[var(--ink)]">
            Two ways to deploy — same platform, same subscription
          </h2>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-[1.6] text-[var(--ink-soft)]">
            Run {PRODUCT.name} wherever your production riders, stage specifications, and financial settlement records are allowed to live. The subscription price is identical either way.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Cloud (SaaS) */}
            <div className="flex items-start gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--paper)] p-6 transition-all hover:border-[var(--line-2)]">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-600">
                <Cloud size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[var(--ink)]">
                  {ONBOARDING.deployment.cloud.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-[var(--ink-soft)]">
                  Runs in Nestack&rsquo;s managed cloud — nothing to provision. The fastest way to get your production queues, rider ingestion, and show teams live.
                </p>
              </div>
            </div>

            {/* Private / self-hosted */}
            <div className="flex items-start gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--paper)] p-6 transition-all hover:border-[var(--line-2)]">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-600">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[var(--ink)]">
                  {ONBOARDING.deployment.private.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-[var(--ink-soft)]">
                  The same platform deployed inside your own infrastructure — your cloud, VPC, or on-prem — for live entertainment producers and agencies with strict corporate data governance. Artist riders, labor contracts, and settlement records never leave your environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-[64ch] text-[13.5px] leading-[1.6] text-[var(--ink-mute)]">
          The subscription is identical on either model; only the onboarding scope differs by your security and deployment requirements.
        </p>
      </div>
    </section>
  );
}
