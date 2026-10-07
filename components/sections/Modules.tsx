import Figure from "./Figure";
import SliderDots from "@/components/ui/SliderDots";
import { PRODUCT } from "@/lib/product";
import { shellFor } from "@/lib/shell";

const mainModules = [
  {
    id: "module-intake",
    page: 2,
    navTitle: "Event Intake",
    src: "/assets/p2.jpeg",
    url: "app.qorvesqia.com/intake",
    eyebrow: "Intake & Document Intelligence",
    title: "Automated artist rider extraction, venue spec audits and proposal generation",
    body: "Transform complex incoming event briefs, multi-page technical riders, and venue specification packets into structured production records. AI parses backline, lighting universes, audio I/O splits, and power requirements directly into live estimates and feasibility checklists.",
    tags: [
      "Rider & spec OCR parsing",
      "Venue technical pack audit",
      "Instant bill-of-quantities",
    ],
    lean: "left" as const,
  },
  {
    id: "module-planning",
    page: 3,
    navTitle: "Production Planning",
    src: "/assets/p3.jpeg",
    url: "app.qorvesqia.com/planning",
    eyebrow: "Production Planning & Scheduling",
    title: "Master production timelines, load-in milestones and change ripple analysis",
    body: "Build master production schedules anchored to venue access, load-in, soundcheck, doors, and strict curfews. When an artist soundcheck or load-in slips, AI immediately maps downstream consequences across FOH, catering, security, rehearsals, and crew call times.",
    tags: [
      "Critical-path schedule tree",
      "Downstream change ripple engine",
      "Dynamic curfew protection",
    ],
    lean: "right" as const,
  },
  {
    id: "module-technical",
    page: 4,
    navTitle: "Technical Production",
    src: "/assets/p4.jpeg",
    url: "app.qorvesqia.com/technical",
    eyebrow: "Technical Production & Stage Design",
    title: "Coordinated audio, lighting, video, rigging and stage engineering",
    body: "Unify department paperwork across audio input splits, DMX universes, LED video tile rasters, and rigging point loads. Automatically flags unassigned stage power drops, Dante channel conflicts, and hoist load overages before equipment leaves the warehouse.",
    tags: [
      "Rigging point load audits",
      "Stage power distribution",
      "Audio & DMX patch manager",
    ],
    lean: "left" as const,
  },
  {
    id: "module-crew",
    page: 5,
    navTitle: "Crew & Resources",
    src: "/assets/p5.jpeg",
    url: "app.qorvesqia.com/crew",
    eyebrow: "Crew Scheduling & Union Compliance",
    title: "Intelligent crew matching, call sheets and IATSE collective bargaining guardrails",
    body: "Schedule department heads, certified high-riggers, and local stagehand rosters with automated skill matching. Built-in compliance algorithms monitor call times, 5-hour meal windows, and mandatory 8-hour continuous rest turnaround periods to eliminate expensive union penalties.",
    tags: [
      "AI skill & rate matching",
      "Meal penalty & overtime warnings",
      "Digital call sheet dispatch",
    ],
    lean: "right" as const,
  },
  {
    id: "module-logistics",
    page: 6,
    navTitle: "Vendors & Logistics",
    src: "/assets/p6.jpeg",
    url: "app.qorvesqia.com/logistics",
    eyebrow: "Vendors & Logistics Management",
    title: "Dock scheduling, freight tracking and cross-vendor load-in conflict detection",
    body: "Coordinate staging freight, power generators, lighting rentals, and security barricades across loading docks and access gates. The real-time conflict engine alerts dispatchers when multiple rigging trucks or catering deliveries overlap on tight dock windows.",
    tags: [
      "Dock conflict resolution",
      "Freight & ETA tracking",
      "Certificate of Insurance audits",
    ],
    lean: "left" as const,
  },
  {
    id: "module-showops",
    page: 7,
    navTitle: "Show Operations",
    src: "/assets/p7.jpeg",
    url: "app.qorvesqia.com/show-operations",
    eyebrow: "Live Show Operations & Run-of-Show",
    title: "Synchronized digital cue calling, timecode tracking and delay mitigation",
    body: "Execute live run-of-show cues across audio, lighting, video, and stage crew in real time. When live segments or artist walk-ons run long, AI instantly recalculates talk segments and set changes to protect hard venue curfew cutoffs.",
    tags: [
      "Real-time cue execution",
      "Curfew recovery AI",
      "Live variance alerts",
    ],
    lean: "right" as const,
  },
  {
    id: "module-safety",
    page: 8,
    navTitle: "Safety & Compliance",
    src: "/assets/p8.jpeg",
    url: "app.qorvesqia.com/safety",
    eyebrow: "Safety & Compliance Automation",
    title: "Structural permits, wind action thresholds and pre-show safety inspections",
    body: "Track open site risks, temporary structure sign-offs, fire safety egress, and weather contingency plans. Correlates anemometer telemetry and structural load limits with municipal inspection checkpoints before audience doors open.",
    tags: [
      "ANSI E1.21 wind protocols",
      "AHJ permit verification",
      "Pre-show inspection checklists",
    ],
    lean: "left" as const,
  },
  {
    id: "module-settlement",
    page: 9,
    navTitle: "Settlement & Closeout",
    src: "/assets/p9.jpeg",
    url: "app.qorvesqia.com/settlement",
    eyebrow: "Settlement & Closeout Reconciliation",
    title: "Real-time budget vs. actuals, overtime reconciliation and client closeout",
    body: "Reconcile production labor, rigging overtime, equipment sub-rentals, and fuel costs against original contracts in real time. Generates auditable backup documentation and billing adjustments before crew disperses from the venue.",
    tags: [
      "Labor overtime audits",
      "Margin & variance reconciliation",
      "Automated settlement exports",
    ],
    lean: "right" as const,
  },
];

export default function Modules() {
  return (
    <section id="modules" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[52ch]">
          <span className="eyebrow">The Platform</span>
          <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
            Every department. One synchronized live event production operating system.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            From technical rider ingestion and structural rigging calculations to live cue calling and post-event financial settlement, {PRODUCT.name} eliminates operational surprises and keeps multi-department crews in lockstep.
          </p>
        </div>

        <SliderDots targetId="modules-main" count={mainModules.length} size="lg" />

        {/* Main Modules */}
        <div id="modules-main" className="slider-lg mt-16 gap-6 space-y-16 sm:space-y-24">
          {mainModules.map((m, i) => {
            const isEven = i % 2 === 1;
            return (
              <article
                key={m.eyebrow}
                id={m.id}
                className={`scroll-mt-24 grid gap-8 lg:items-center lg:gap-10 ${
                  isEven
                    ? "lg:grid-cols-[0.7fr_2fr]"
                    : "lg:grid-cols-[2fr_0.7fr]"
                }`}
              >
                <div className={isEven ? "lg:order-2" : ""}>
                  <Figure
                    src={m.src}
                    alt={`${m.eyebrow} — ${PRODUCT.name}`}
                    url={m.url}
                    actions="LIVE · DASHBOARD"
                    lean={m.lean}
                    shell={shellFor(m.page, m.navTitle)}
                  />
                </div>

                <div className={isEven ? "lg:order-1" : ""}>
                  <span className="eyebrow">{m.eyebrow}</span>
                  <h3 className="mt-4 text-[clamp(1.3rem,2.2vw,1.75rem)] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                    {m.title}
                  </h3>
                  <p className="mt-4 max-w-[44ch] text-[15.5px] leading-[1.6] text-[var(--ink-soft)]">
                    {m.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-[var(--brand)] px-3 py-1 text-[12px] font-medium text-white"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
