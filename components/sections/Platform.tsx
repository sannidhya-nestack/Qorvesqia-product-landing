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

        {/* ── KPI Impact Metric Strip (Reference) ── */}
        <div className="border-t border-white/12 pt-12 mt-16">
          <div className="mx-auto max-w-[1240px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* KPI 1: AI Confidence Score */}
            <div className="flex flex-col">
              <div className="text-[clamp(2.2rem,3.6vw,3.4rem)] font-bold tracking-tight text-[#00e5ff] font-mono-ui leading-none drop-shadow-[0_0_14px_rgba(0,229,255,0.25)]">
                9.9 / 10
              </div>
              <h4 className="mt-4 text-[15.5px] font-bold text-white tracking-tight">
                AI Confidence Score
              </h4>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
                High-confidence consensus across extracted specs &amp; addenda
              </p>
            </div>

            {/* KPI 2: Production Hours Saved */}
            <div className="flex flex-col">
              <div className="text-[clamp(2.2rem,3.6vw,3.4rem)] font-bold tracking-tight text-[#00e5ff] font-mono-ui leading-none drop-shadow-[0_0_14px_rgba(0,229,255,0.25)]">
                44.5h
              </div>
              <h4 className="mt-4 text-[15.5px] font-bold text-white tracking-tight">
                Production Hours Saved
              </h4>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
                Average takeoff and scope review hours saved per show
              </p>
            </div>

            {/* KPI 3: Workflow Efficiency Gain */}
            <div className="flex flex-col">
              <div className="text-[clamp(2.2rem,3.6vw,3.4rem)] font-bold tracking-tight text-[#00e5ff] font-mono-ui leading-none drop-shadow-[0_0_14px_rgba(0,229,255,0.25)]">
                6.2x
              </div>
              <h4 className="mt-4 text-[15.5px] font-bold text-white tracking-tight">
                Workflow Efficiency Gain
              </h4>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
                End-to-end turnaround acceleration from rider intake to show call
              </p>
            </div>

            {/* KPI 4: Show Delivery Capacity */}
            <div className="flex flex-col">
              <div className="text-[clamp(2.2rem,3.6vw,3.4rem)] font-bold tracking-tight text-[#00e5ff] font-mono-ui leading-none drop-shadow-[0_0_14px_rgba(0,229,255,0.25)]">
                4.5x
              </div>
              <h4 className="mt-4 text-[15.5px] font-bold text-white tracking-tight">
                Show Delivery Capacity
              </h4>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
                More qualified production packages &amp; stages delivered per crew
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
