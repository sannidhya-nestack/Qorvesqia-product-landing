import SliderDots from "@/components/ui/SliderDots";

const steps = [
  {
    step: "01",
    title: "Ingest electrical packages & single-lines",
    desc: "Feed RFPs, plan sheets, panel schedules, riser diagrams, and specifications into one workspace. AI outlines symbols, extracts equipment schedules, and flags missing scope before your team commits time or budget.",
  },
  {
    step: "02",
    title: "Execute coordinated construction & prefab",
    desc: "Awarded takeoff assemblies flow directly into BIM system trees, switchgear procurement need-dates, prefab shop spools, and executable foreman work packages without manual spreadsheet re-entry.",
  },
  {
    step: "03",
    title: "Commission & maintain installed assets",
    desc: "Verify upstream energization dependencies, compile audit-ready turnover packages automatically, and monitor live switchgear, transformers, and panels under NFPA 70B predictive maintenance programs.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-[var(--line)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[46ch]">
          <span className="eyebrow">How It Works</span>
          <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
            Your electrical workflow, from bid to building maintenance.
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
