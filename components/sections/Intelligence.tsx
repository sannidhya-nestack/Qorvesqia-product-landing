import Image from "next/image";
import SliderDots from "@/components/ui/SliderDots";
import { PRODUCT } from "@/lib/product";

const steps = [
  {
    step: "01",
    title: "Parse technical riders & stage plots",
    desc: "OCR, layout detection and tabular extraction across artist technical riders, input lists, and venue specification packets.",
    model: "Mistral",
    provider: "Document AI",
    icon: "/icons/intelligence/mistralai.svg",
    isSimpleIcon: false,
  },
  {
    step: "02",
    title: "Classify stage departments & backline",
    desc: "Audio splits, lighting universes, video wall tile rasters, and stage rigging requirements categorized automatically.",
    model: "Open Weights",
    provider: "Inference Providers",
    icon: "https://cdn.simpleicons.org/meta/172a81",
    isSimpleIcon: true,
  },
  {
    step: "03",
    title: "Hold the whole production in context",
    desc: "Multi-stage timelines, load-in constraints, curfew windows, and talent hospitality requirements kept in active context.",
    model: "Gemini",
    provider: "Gemini API",
    icon: "https://cdn.simpleicons.org/google/172a81",
    isSimpleIcon: true,
  },
  {
    step: "04",
    title: "Map union crew rules & gear manifests",
    desc: "IATSE collective bargaining rules, meal penalty windows, rest turnarounds, and cross-rental equipment manifests.",
    model: "OpenAI",
    provider: "Responses API",
    icon: "/icons/intelligence/openai.svg",
    isSimpleIcon: false,
  },
  {
    step: "05",
    title: "Draft safety & municipal compliance sign-offs",
    desc: "Evaluates ANSI E1.21 wind action plans, high-rigger fall protection protocols, and local fire marshal flame-spread certificates.",
    model: "Claude",
    provider: "Messages API",
    icon: "https://cdn.simpleicons.org/anthropic/172a81",
    isSimpleIcon: true,
  },
  {
    step: "06",
    title: "Validate run-of-show timing & curfew risk",
    desc: "Real-time timeline analysis; flags schedule drift and downstream curfew breaches for immediate production manager sign-off.",
    model: "DeepSeek",
    provider: "DeepSeek API",
    badgeText: "DS",
  },
];

export default function Intelligence() {
  return (
    <section id="intelligence" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[48ch]">
          <span className="eyebrow">Intelligence</span>
          <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
            A specialized AI pipeline for live entertainment & production.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            Technical riders, venue CAD stage plots, union contracts, and gear manifests are too specialized for generic models. {PRODUCT.name} routes each document to dedicated intelligence agents — parsing stage requirements, auditing rigging safety, and keeping live show schedules on time.
          </p>
        </div>

        <SliderDots targetId="intel-steps" count={6} size="sm" />

        <div
          id="intel-steps"
          className="slider-sm mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((s) => (
            <article
              key={s.step}
              className="card flex flex-col justify-between p-6 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <span className="font-display text-[12px] font-bold tracking-[0.16em] text-[var(--ink-mute)]">
                    STEP {s.step}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {s.icon ? (
                      <Image
                        src={s.icon}
                        alt=""
                        width={14}
                        height={14}
                        className={`h-3.5 w-3.5 object-contain ${
                          s.isSimpleIcon ? "" : "opacity-80"
                        }`}
                      />
                    ) : s.badgeText ? (
                      <span className="grid h-4 w-4 place-items-center rounded-sm bg-[#172a81] text-[9px] font-bold text-white">
                        {s.badgeText}
                      </span>
                    ) : null}
                    <span className="text-[12px] font-medium text-[var(--ink-soft)]">
                      {s.model}
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-[var(--ink-soft)]">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[var(--line)] text-[12px] text-[var(--ink-mute)]">
                <span>Orchestrated via</span>
                <span className="font-mono text-[11px] font-medium text-[var(--ink-soft)]">
                  {s.provider}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
