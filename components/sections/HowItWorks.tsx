import SliderDots from "@/components/ui/SliderDots";

const steps = [
  {
    step: "01",
    title: "Ingest artist riders & technical venue specs",
    desc: "Drop incoming artist contracts, technical riders, stage plots, and venue packets into one unified workspace. AI extracts backline requirements, lighting universes, audio I/O splits, and power specs directly into structured bills-of-quantities.",
  },
  {
    step: "02",
    title: "Coordinate stages, union crew & dock logistics",
    desc: "Convert production timelines into dynamic master schedules. Coordinate union crew call sheets with built-in IATSE meal and rest guardrails, sequence loading dock arrivals, and detect freight clashes before load-in begins.",
  },
  {
    step: "03",
    title: "Execute live show cues & automate financial closeout",
    desc: "Call cues live with real-time delay mitigation and strict curfew protection. Reconcile labor overtime, gear rentals, and final show settlements automatically before the tour heads to the next venue.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-[var(--line)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[46ch]">
          <span className="eyebrow">How It Works</span>
          <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
            Your live production workflow, from intake to post-show settlement.
          </h2>
        </div>

        <SliderDots targetId="how-steps" count={3} size="lg" />

        <div id="how-steps" className="slider-lg mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <article key={s.step} className="card p-7">
              <span className="font-display text-[13px] font-bold tracking-[0.18em] text-[var(--brand)]">
                {s.step}
              </span>
              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[var(--ink-soft)]">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
