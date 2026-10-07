import Image from "next/image";
import SliderDots from "@/components/ui/SliderDots";
import { PRODUCT } from "@/lib/product";

const steps = [
  {
    step: "01",
    title: "Read single-lines, panel schedules & spec tables",
    desc: "OCR, layout detection and tabular extraction across electrical drawings, panelboards and equipment schedules.",
    model: "Mistral",
    provider: "Document AI",
    icon: "/icons/intelligence/mistralai.svg",
    isSimpleIcon: false,
  },
  {
    step: "02",
    title: "Classify electrical sheets & symbols",
    desc: "Power, lighting, low-voltage, riser and detail sheets categorized; device and fixture symbols detected.",
    model: "Open Weights",
    provider: "Inference Providers",
    icon: "https://cdn.simpleicons.org/meta/172a81",
    isSimpleIcon: true,
  },
  {
    step: "03",
    title: "Hold the whole electrical system in context",
    desc: "Cross-sheet references, riser diagrams, panel schedules and revision addenda kept in active context.",
    model: "Gemini",
    provider: "Gemini API",
    icon: "https://cdn.simpleicons.org/google/172a81",
    isSimpleIcon: true,
  },
  {
    step: "04",
    title: "Extract assemblies & map NECA labor units",
    desc: "Structured takeoffs, conduit run calculations and NECA Manual of Labor Units assembly mapping.",
    model: "OpenAI",
    provider: "Responses API",
    icon: "/icons/intelligence/openai.svg",
    isSimpleIcon: false,
  },
  {
    step: "05",
    title: "Draft code-audit and safety compliance notes",
    desc: "Proposed designs and field installations checked against NEC 2026, NFPA 70E arc flash, and OSHA 1926 Subpart K.",
    model: "Claude",
    provider: "Messages API",
    icon: "https://cdn.simpleicons.org/anthropic/172a81",
    isSimpleIcon: true,
  },
  {
    step: "06",
    title: "Validate dependency graph & route review queue",
    desc: "Topological upstream-to-downstream verification; low-confidence items held for estimator or engineer signoff.",
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
            A multi-model pipeline for complex electrical systems.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            Electrical drawings, one-lines, and spec books are too dense for one generic model. {PRODUCT.name} routes each document to the right specialist — extracting circuits, flagging code risks, and generating defensible estimates with full audit lineage.
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
