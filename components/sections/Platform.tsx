import Figure, { type CalloutPin } from "./Figure";
import { PRODUCT } from "@/lib/product";
import { shellFor } from "@/lib/shell";

const pins: CalloutPin[] = [
  {
    id: "p1",
    label: "Readiness Index",
    anchor: { x: 0.415, y: 0.225 },
    label_at: { x: 0.34, y: 0.33 },
    side: "right",
    description:
      "Weighted composite readiness score tracking technical, crew, vendor, schedule, safety, and financial milestones toward show start.",
  },
  {
    id: "p2",
    label: "Run-of-Show Pulse",
    anchor: { x: 0.69, y: 0.375 },
    label_at: { x: 0.775, y: 0.375 },
    side: "right",
    description:
      "Live minute-by-minute cue variance tracking across soundcheck, doors, headliner sets, and curfew windows with department cue tallies.",
  },
  {
    id: "p3",
    label: "AI Risk Queue",
    anchor: { x: 0.535, y: 0.725 },
    label_at: { x: 0.615, y: 0.725 },
    side: "right",
    description:
      "Surfaces high-impact budget overruns and operational blockers — such as overnight rigging labor or missing vendor confirmations.",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="max-w-[52ch] lg:max-w-none">
            <span className="eyebrow on-dark">The Live Production Command Center</span>
            <h2 className="h-section mt-5 text-[clamp(1.9rem,4vw,3.1rem)] text-white">
              Every stage, every cue, every resource — on one screen.
            </h2>
          </div>
          <p className="max-w-[54ch] text-[16.5px] leading-[1.65] text-white/70">
            Live event producers coordinate complex productions involving distributed crews, touring riders, technical AV systems, and unmovable curfews. The {PRODUCT.name}{" "}
            command center connects your entire operational lifecycle — from rider intake and rigging calculations to live cue calling and financial settlement.
          </p>
        </div>

        <div className="mt-12">
          <Figure
            src="/assets/p1.jpeg"
            alt={`${PRODUCT.name} — live event production dashboard with readiness forecast, run-of-show pulse, and AI risk queue`}
            url="app.qorvesqia.com/dashboard"
            actions="LIVE · DASHBOARD"
            callouts={pins}
            shell={shellFor(1, "Dashboard")}
            priority
          />
        </div>

        {/* ── Feasibility & Efficiency Impact Rail ── */}
        <div className="border-b border-white/12 pb-6 mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="eyebrow on-dark">Operational Impact</span>
            <h3 className="h-section mt-2 text-[clamp(1.5rem,2.8vw,2.2rem)] text-white">
              Engineered for Production Readiness & Efficiency.
            </h3>
          </div>
          <p className="max-w-[46ch] text-[14.5px] leading-relaxed text-white/70">
            Eliminate day-of-show surprises, automate rider parsing, protect municipal curfews, and coordinate cross-department crews with synchronized intelligence.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[1120px] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Efficiency */}
          <div className="flex flex-col border border-white/10 bg-white/[0.04] p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-5">
              <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                Efficiency
              </span>
              <span className="font-display tnum text-[24px] font-bold text-white">
                10× Faster
              </span>
            </div>
            <h4 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-white">
              Rider & Spec Extraction
            </h4>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-white/60">
              Instantly converts 50+ page artist riders and venue technical packets into structured equipment picklists, audio patch sheets, and labor calls.
            </p>
          </div>

          {/* Card 2: Feasibility */}
          <div className="flex flex-col border border-emerald-500/20 bg-emerald-500/[0.05] p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 border-b border-emerald-500/20 pb-5">
              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                Feasibility
              </span>
              <span className="font-display tnum text-[24px] font-bold text-white">
                100% ANSI
              </span>
            </div>
            <h4 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-white">
              Rigging & Power Safety
            </h4>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-white/60">
              Pre-verifies motor hoist point loads, bridle angles, and 3-phase power balancing under ANSI E1.21 and NFPA 70 before load-in begins.
            </p>
          </div>

          {/* Card 3: Efficiency */}
          <div className="flex flex-col border border-white/10 bg-white/[0.04] p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-5">
              <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                Efficiency
              </span>
              <span className="font-display tnum text-[24px] font-bold text-white">
                0 Penalties
              </span>
            </div>
            <h4 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-white">
              Union Labor Optimization
            </h4>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-white/60">
              Monitors crew call times, mandatory meal windows, and 8-hour turnaround rest periods to eliminate compounding IATSE overtime fees.
            </p>
          </div>

          {/* Card 4: Feasibility */}
          <div className="flex flex-col border border-emerald-500/20 bg-emerald-500/[0.05] p-6 rounded-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 border-b border-emerald-500/20 pb-5">
              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                Feasibility
              </span>
              <span className="font-display tnum text-[24px] font-bold text-white">
                On Curfew
              </span>
            </div>
            <h4 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-white">
              Live Show & Curfew Control
            </h4>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-white/60">
              Real-time show variance tracking models dynamic changeover trimming to safeguard strict municipal sound curfews and avoid $1,000/min fines.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[1120px] text-[12px] text-white/50">
          Purpose-built for concert touring, festivals, technical AV providers, and corporate event producers to guarantee show readiness.
        </p>
      </div>
    </section>
  );
}
