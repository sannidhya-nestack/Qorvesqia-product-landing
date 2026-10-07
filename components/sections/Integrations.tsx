import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PRODUCT } from "@/lib/product";

export default function Integrations() {
  return (
    <section id="integrations" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid lg:grid-cols-2">
          {/* Left Column (Light) */}
          <div className="flex flex-col bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 lg:pr-14">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-mute)]">
              {PRODUCT.name} ships
            </p>
            <h2 className="mt-6 max-w-[22ch] text-[clamp(1.85rem,3.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]">
              Production intelligence agents, in production, reading real artist riders and stage plots.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.65] text-[var(--ink-soft)]">
              Structured records from technical riders, stage plots, lighting patch sheets, and gear submittals — live in your CAD, scheduling,
              and ERP targets through documented API integrations, with each agent mapped to the
              live event modules your team already runs.
            </p>

            <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              <li className="flex items-start gap-3.5 py-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 bg-[var(--brand)]" aria-hidden="true" />
                <span className="text-[15px] font-medium leading-snug text-[var(--ink)]">
                  Artist rider extraction and automated bill-of-quantities agents
                </span>
              </li>
              <li className="flex items-start gap-3.5 py-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 bg-[var(--brand)]" aria-hidden="true" />
                <span className="text-[15px] font-medium leading-snug text-[var(--ink)]">
                  Live cue variance monitoring and curfew protection agents
                </span>
              </li>
            </ul>

            <a
              href={PRODUCT.agentsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-10 inline-flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-mute)] transition-colors hover:text-[var(--brand)]"
            >
              Catalogued in playbook ENT043
              <ArrowUpRight size={13} strokeWidth={2} />
            </a>
          </div>

          {/* Right Column (Dark Navy) */}
          <div className="flex flex-col bg-[var(--navy)] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24 lg:pl-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href={PRODUCT.agentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
              >
                Sister platform — Nestack Agent Care
              </a>
              <a
                href={PRODUCT.agentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
              >
                P 43 · Entertainment Playbooks
              </a>
            </div>

            <h2 className="mt-10 max-w-[20ch] font-display text-[clamp(1.6rem,3.4vw,2.35rem)] font-bold uppercase leading-[1.12] tracking-[0.01em] text-white">
              Your{" "}
              <span className="inline-block border border-[var(--accent)] px-2 py-0.5 text-[var(--accent)]">
                entertainment
              </span>{" "}
              AI agents, run like production systems.
            </h2>

            <p className="mt-6 max-w-[44ch] text-white/65 text-[15px] leading-[1.65]">
              Telemetry, evaluations, guardrails, human review and incident response — pinned to the
              Live Event Production playbook so rider parsing, union labor checks, and cue execution agents stay reliable from intake
              through financial closeout.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              <div>
                <dt className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none text-[var(--accent)]">
                  38
                </dt>
                <dd className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.06em] text-white/55">
                  Failure modes catalogued
                </dd>
              </div>
              <div>
                <dt className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none text-[var(--accent)]">
                  38
                </dt>
                <dd className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.06em] text-white/55">
                  Evaluation sets
                </dd>
              </div>
              <div>
                <dt className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none text-[var(--accent)]">
                  1,950+
                </dt>
                <dd className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.06em] text-white/55">
                  Baseline eval cases
                </dd>
              </div>
              <div>
                <dt className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-none text-[var(--accent)]">
                  24/7
                </dt>
                <dd className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.06em] text-white/55">
                  Agent monitoring
                </dd>
              </div>
            </dl>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light mt-10 h-12 w-full max-w-[360px] px-6 text-[13px] sm:w-auto"
              href={PRODUCT.agentsUrl}
            >
              Open the Entertainment playbook
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>

            <a
              href={PRODUCT.agentsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-10 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white/70"
            >
              Live entertainment agents are catalogued in playbook ENT043.
            </a>
          </div>
        </div>

        {/* Center Connecting Arrow Icon */}
        <a
          href={PRODUCT.agentsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105 lg:grid lg:h-11 lg:w-11 lg:place-items-center lg:bg-[var(--brand)] lg:shadow-[0_8px_24px_-8px_rgba(23,42,129,0.8)]"
          aria-label="Open the Media & Entertainment playbook"
        >
          <ArrowRight size={18} strokeWidth={2.4} className="text-white" />
        </a>
      </div>

      <p className="mx-auto max-w-[1240px] px-5 py-6 text-[12px] leading-[1.55] text-[var(--ink-mute)] sm:px-8">
        Tool names and marks belong to their respective owners. No endorsement or partnership implied.
      </p>
    </section>
  );
}
