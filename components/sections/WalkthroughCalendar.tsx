"use client";

import { getMonthAvailability, useCalendarBrowserReady } from "@/lib/month-availability";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Check,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Plus,
} from "lucide-react";
import {
  getModules,
  createDraft,
  updateDraft,
  book,
  type Module,
  type Slot,
} from "@/lib/nestack";
import { PRODUCT } from "@/lib/product";
import { SHELL_NAV } from "@/lib/shell";

const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const STEP_LABELS = ["Pick a time", "Your details", "What to see"];

const userTz = () =>
  (typeof Intl !== "undefined" && Intl.DateTimeFormat().resolvedOptions().timeZone) ||
  "America/New_York";

const isoParts = (iso: string | number | Date, tz: string) => {
  const [y, m, d] = new Date(iso)
    .toLocaleDateString("en-CA", { timeZone: tz })
    .split("-")
    .map(Number);
  return { y, m: m - 1, d };
};

const timeLabel = (iso: string, tz: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  });

const dateLabelLong = (y: number, m: number, d: number) =>
  new Date(y, m, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const isPastDate = (y: number, m: number, d: number) => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return new Date(y, m, d) < t;
};

const INPUT_CLASS =
  "w-full rounded-[6px] border border-[var(--line)] bg-white px-4 py-3 text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-mute)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--tint)]";
const BTN_CONTINUE =
  "inline-flex items-center gap-2 rounded-[6px] bg-[var(--ink)] px-5 py-3 text-[13px] font-medium uppercase tracking-[-0.01em] text-white transition-colors hover:bg-[var(--brand)] disabled:cursor-not-allowed disabled:bg-[var(--ink-mute)]/60";
const BTN_BACK =
  "inline-flex items-center gap-2 text-[13px] font-medium uppercase text-[var(--ink-mute)] transition-colors hover:text-[var(--ink)]";

export default function WalkthroughCalendar() {
  const calendarBrowserReady = useCalendarBrowserReady();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [hasCustomRequest, setHasCustomRequest] = useState(false);
  const [customRequestText, setCustomRequestText] = useState("");

  const [timezone] = useState(userTz);
  const [availableSlots, setAvailableSlots] = useState<Slot[] | null>(null);
  const [today] = useState(() => new Date());
  const [viewMonth, setViewMonth] = useState({
    y: today.getFullYear(),
    m: today.getMonth(),
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Fetch modules for this product from the platform
  useEffect(() => {
    getModules(PRODUCT.insubId).then((fetched) => setModules(fetched.length ? fetched : SHELL_NAV.filter(item => item.key !== "dashboard").map((item, index) => ({ pageNo: index + 2, label: item.label }))));
  }, []);

  // 2. Fetch availability slots and track draft status
  useEffect(() => { if (step !== 1) return; if (sessionToken) {
        updateDraft({ sessionToken, status: "time" });
      } }, [step, sessionToken]);
  // Month navigation owns availability; cleanup rejects responses from older months.
  const calendarYear = viewMonth.y;
  const calendarMonthIndex = viewMonth.m;
  const [calendarRevision, setCalendarRevision] = useState(0);
  useEffect(() => {
    if (!timezone) return;
    let cancelled = false;
    void Promise.resolve().then(async () => {
      if (cancelled) return;
      setAvailableSlots(null);

      setSelectedDay(null);
      setSelectedSlotTime(null);
      const nextSlots = await getMonthAvailability(timezone, calendarYear, calendarMonthIndex);
      if (cancelled) return;
      setAvailableSlots(nextSlots);

    });

    return () => { cancelled = true;  };
  }, [calendarYear, calendarMonthIndex, timezone, calendarRevision]);


  // Group slots by day in visible month
  const slotsByDay = useMemo(() => {
    const map = new Map<number, Slot[]>();
    for (const slot of availableSlots ?? []) {
      const p = isoParts(slot.startTime, timezone);
      if (p.y === viewMonth.y && p.m === viewMonth.m) {
        if (!map.has(p.d)) map.set(p.d, []);
        map.get(p.d)!.push(slot);
      }
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [availableSlots, viewMonth, timezone]);

  const availableDaysInMonth = useMemo(() => [...slotsByDay.keys()], [slotsByDay]);
  const activeDaySlots = selectedDay ? slotsByDay.get(selectedDay) ?? [] : [];

  const toggleModule = (label: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const stepMonth = (dir: 1 | -1) => {
    const target = new Date(viewMonth.y, viewMonth.m + dir, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (dir === -1 && target < currentMonthStart) return;
    setViewMonth({ y: target.getFullYear(), m: target.getMonth() });
    setSelectedDay(null);
    setSelectedSlotTime(null);
  };

  // Step 2 Submission -> Create draft lead session
  async function handleDetailsSubmit() {
    if (!form.name.trim() || !form.email.trim() || submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      const token = await createDraft({
        insubId: PRODUCT.insubId,
        productName: PRODUCT.name,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        sourceUrl: typeof window !== "undefined" ? window.location.href : null,
        sourceHost: typeof window !== "undefined" ? window.location.host : null,
      });
      if (token) setSessionToken(token);
    } finally {
      setSubmitting(false);
      setStep(3);
    }
  }

  // Step 3 Submission -> Book demo
  async function handleBookDemo() {
    if (!selectedSlotTime || submitting) return;
    setSubmitting(true);
    setErrorMessage("");

    if (sessionToken) {
      await updateDraft({
        sessionToken,
        selectedModules: [...selectedModules],
        somethingElse: hasCustomRequest ? customRequestText.trim() : null,
        status: "modules",
      });
    }

    try {
      const res = await book({
        insubId: PRODUCT.insubId,
        productName: PRODUCT.name,
        selectedModules: [...selectedModules],
        somethingElse: hasCustomRequest ? customRequestText.trim() : null,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        startTime: selectedSlotTime,
        timezone,
        sessionToken,
      });

      if (!res.ok) {
        if (res.status === 409) {
          setSelectedSlotTime(null);
          setCalendarRevision(value => value + 1);
          setStep(1);
        }
        throw new Error(res.error || "Couldn't book that time. Please try another slot.");
      }

      setBookedSlot(selectedSlotTime);
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleReset = () => {
    setStep(1);
    setSelectedDay(null);
    setSelectedSlotTime(null);
    setBookedSlot(null);
    setErrorMessage("");
    setForm({ name: "", email: "", company: "" });
    setSelectedModules(new Set());
    setHasCustomRequest(false);
    setCustomRequestText("");
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    if (!bookedSlot) return "#";
    const startDate = new Date(bookedSlot);
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);
    const fmtGCal = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const title = encodeURIComponent(`${PRODUCT.name} Walk-Through: ${form.company || form.name}`);
    const details = encodeURIComponent(
      `45-minute live technical walkthrough of ${PRODUCT.name}.\nAttendee: ${form.name} (${form.email})\nSelected Modules: ${
        [...selectedModules].join(", ") || "Full Platform"
      }`
    );
    const location = encodeURIComponent("Google Meet (link will be sent to your email)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmtGCal(
      startDate
    )}/${fmtGCal(endDate)}&details=${details}&location=${location}`;
  };

  const firstDay = new Date(viewMonth.y, viewMonth.m, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInCurrentMonth = new Date(viewMonth.y, viewMonth.m + 1, 0).getDate();

  const selectedSlotParts = selectedSlotTime ? isoParts(selectedSlotTime, timezone) : null;
  const bookedSlotParts = bookedSlot ? isoParts(bookedSlot, timezone) : null;

  const canContinueDetails = form.name.trim().length > 0 && form.email.trim().includes("@");
  const canContinueModules =
    selectedModules.size > 0 || (hasCustomRequest && customRequestText.trim().length > 0);

  if (!calendarBrowserReady) return <section id="contact" aria-busy="true" className="min-h-[600px]" />;
  return (
    <section id="contact" className="bg-[var(--paper)] py-16 sm:py-24 lg:py-28">
      {/* ================= 2-COLUMN BOOK DEMO CALENDAR ================= */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1120px] overflow-hidden border border-[var(--line)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          {/* ================= LEFT COLUMN ================= */}
          <div className="relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden bg-[var(--navy)] p-6 text-white sm:min-h-[420px] sm:p-10">
            <Image
              src="/assets/concert-lighting-truss.jpg"
              alt="Live event production team coordinating show operations"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="-z-10 object-cover object-[72%_center]"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,7,12,0.35) 0%, rgba(5,7,12,0.72) 45%, rgba(5,7,12,0.94) 100%)",
              }}
            />

            <span className="eyebrow on-dark">Book a demo</span>
            <h2 className="h-mega mt-3 max-w-[14ch] text-[clamp(2.2rem,3.4vw,2.75rem)] text-white">
              Let’s make your next close the easy one.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.6] text-white/80">
              Three quick steps — pick a time, tell us who you are, choose what to see. We run{" "}
              {PRODUCT.name} live against a slice of your own project documents.
            </p>
            <div className="rule-dark my-6" />
            <p className="text-[13px] leading-[1.55] text-white/70">
              Prefer email first?{" "}
              <a
                href="mailto:info@nestack.com"
                className="text-white underline-offset-4 hover:underline"
              >
                info@nestack.com
              </a>{" "}
              — we reply same day when we can.
            </p>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="flex flex-col bg-white p-5 sm:p-10">
            {/* Step Progress Tabs */}
            <ol className="grid grid-cols-3 gap-3">
              {STEP_LABELS.map((label, idx) => {
                const stepNum = (idx + 1) as 1 | 2 | 3;
                const isActive = step === stepNum && !bookedSlot;
                const isPastOrBooked = (step > stepNum && !bookedSlot) || !!bookedSlot;

                return (
                  <li
                    key={label}
                    className={`border-t-2 pt-3 text-center font-condensed text-[13px] uppercase sm:text-[15px] leading-none tracking-[0.01em] transition-colors ${
                      isActive
                        ? "border-[var(--ink)] text-[var(--ink)]"
                        : isPastOrBooked
                        ? "border-[var(--brand)] text-[var(--brand)]"
                        : "border-[var(--line-soft)] text-[var(--ink-mute)]"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    0{stepNum} {label}
                  </li>
                );
              })}
            </ol>

            {/* ================= BOOKED SUCCESS SCREEN ================= */}
            {bookedSlot ? (
              <div className="flex flex-1 flex-col items-center justify-center py-14 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-[var(--tint)] text-[var(--brand)]">
                  <CalendarCheck size={26} />
                </span>
                <h3 className="h-mega mt-5 text-[2rem] text-[var(--ink)]">
                  You’re booked.
                </h3>
                {bookedSlotParts && (
                  <p className="mt-2 text-[14px] text-[var(--ink-soft)]">
                    {dateLabelLong(bookedSlotParts.y, bookedSlotParts.m, bookedSlotParts.d)} ·{" "}
                    {timeLabel(bookedSlot, timezone)} ({timezone.replace(/_/g, " ")})
                  </p>
                )}
                <p className="mt-1 text-[13px] text-[var(--ink-mute)]">
                  A calendar invite and join link are on the way to {form.email}.
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--ink)] px-5 py-3 text-[13px] font-medium uppercase tracking-[-0.01em] text-white transition-colors hover:bg-[var(--brand)]"
                  >
                    <CalendarIcon size={14} />
                    <span>Add to Google Calendar</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-[6px] border border-[var(--line)] px-5 py-3 text-[13px] font-medium uppercase tracking-[-0.01em] text-[var(--ink)] transition-colors hover:bg-[var(--paper)]"
                  >
                    <span>Book another time</span>
                  </button>
                </div>
              </div>
            ) : step === 1 ? (
              /* ================= STEP 1: PICK A TIME ================= */
              <>
                <h3 className="h-mega mt-6 border-t border-[var(--line)] pt-5 text-[clamp(1.6rem,2.4vw,1.85rem)] text-[var(--ink)]">
                  Product walkthrough and discussion
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--ink-soft)]">
                  A 45-minute working session on {PRODUCT.name} — bid readiness, procurement risk,
                  field readiness, forecast margin, and handover on the modules you choose.
                </p>
                <p className="mt-3 font-condensed text-[15px] uppercase tracking-[0.02em] text-[var(--ink-mute)]">
                  45 minutes · video call · times in {timezone.replace(/_/g, " ")}
                </p>

                {/* Month Navigator */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-[var(--ink)]">
                    {new Date(viewMonth.y, viewMonth.m, 1).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => stepMonth(-1)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] transition-colors hover:bg-[var(--ink)] hover:text-white"
                    >
                      <ArrowLeft size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => stepMonth(1)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] transition-colors hover:bg-[var(--ink)] hover:text-white"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Weekdays Header */}
                <div aria-busy={availableSlots === null} className="mt-4 grid grid-cols-7 gap-1 sm:gap-1.5">
                  {DAY_NAMES.map((d) => (
                    <div
                      key={d}
                      className="py-1 text-center font-condensed text-[13px] tracking-[0.02em] text-[var(--ink-mute)]"
                    >
                      {d}
                    </div>
                  ))}

                  {availableSlots === null ? (
                    Array.from({ length: 35 }).map((_, r) => (
                      <div
                        key={r}
                        className="mx-auto h-9 w-9 animate-pulse sm:h-10 sm:w-10 rounded-full bg-[var(--paper-2)]"
                      />
                    ))
                  ) : (
                    <>
                      {Array.from({ length: startOffset }).map((_, r) => (
                        <div key={`offset-${r}`} className="h-9 sm:h-10" />
                      ))}
                      {Array.from({ length: daysInCurrentMonth }).map((_, r) => {
                        const dayNum = r + 1;
                        const hasSlot = availableDaysInMonth.includes(dayNum);
                        const past = isPastDate(viewMonth.y, viewMonth.m, dayNum);
                        const isAvail = hasSlot && !past;
                        const isSel = dayNum === selectedDay;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            disabled={!isAvail}
                            aria-pressed={isSel}
                            aria-label={dateLabelLong(viewMonth.y, viewMonth.m, dayNum)}
                            onClick={
                              isAvail
                                ? () => {
                                    setSelectedDay(dayNum);
                                    setSelectedSlotTime(null);
                                  }
                                : undefined
                            }
                            className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-[13.5px] sm:h-10 sm:w-10 sm:text-[14px] transition-colors ${
                              isSel
                                ? "border border-[var(--ink)] bg-[var(--ink)] font-semibold text-white"
                                : isAvail
                                ? "border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--brand)] hover:bg-[var(--tint)]"
                                : "cursor-not-allowed border-transparent text-[var(--ink-mute)] opacity-40"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </>
                  )}
                </div>

                {/* Day Slots */}
                {selectedDay && (
                  <div className="mt-5 border-t border-[var(--line-soft)] pt-4">
                    <div className="mb-1 text-[13px] font-semibold text-[var(--ink-soft)]">
                      {dateLabelLong(viewMonth.y, viewMonth.m, selectedDay)}
                    </div>
                    {availableSlots === null ? (
                      <p className="mt-2 text-[13.5px] text-[var(--ink-soft)]">
                        Finding open times…
                      </p>
                    ) : activeDaySlots.length === 0 ? (
                      <p className="mt-2 text-[13.5px] text-[var(--ink-soft)]">
                        No open times on this day — please try another.
                      </p>
                    ) : (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeDaySlots.map((slot) => {
                          const isSlotSel = selectedSlotTime === slot.startTime;
                          return (
                            <button
                              key={slot.startTime}
                              type="button"
                              aria-pressed={isSlotSel}
                              onClick={() => setSelectedSlotTime(slot.startTime)}
                              className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
                                isSlotSel
                                  ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                                  : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--brand)] hover:bg-[var(--tint)]"
                              }`}
                            >
                              {timeLabel(slot.startTime, timezone)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {errorMessage && (
                  <p role="alert" className="mt-4 text-[13px] text-red-600">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-auto flex justify-end pt-6">
                  <button
                    type="button"
                    disabled={!selectedSlotTime}
                    onClick={() => {
                      setErrorMessage("");
                      setStep(2);
                    }}
                    className={BTN_CONTINUE}
                  >
                    <span>Continue</span>
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              /* ================= STEP 2: YOUR DETAILS ================= */
              <>
                <h3 className="h-mega mt-6 border-t border-[var(--line)] pt-5 text-[clamp(1.6rem,2.4vw,1.85rem)] text-[var(--ink)]">
                  Who should we prep for?
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--ink-soft)]">
                  A few seconds — so we arrive prepared for your team.
                  {selectedSlotTime && selectedSlotParts && (
                    <span className="mt-1 block text-[13px] text-[var(--ink-mute)]">
                      {dateLabelLong(
                        selectedSlotParts.y,
                        selectedSlotParts.m,
                        selectedSlotParts.d
                      )}{" "}
                      · {timeLabel(selectedSlotTime, timezone)}
                    </span>
                  )}
                </p>

                <div className="mt-6 space-y-3">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    aria-label="Full name"
                    className={INPUT_CLASS}
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Work email"
                    aria-label="Work email"
                    className={INPUT_CLASS}
                  />
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company / General Contractor"
                    aria-label="Company or firm"
                    className={INPUT_CLASS}
                  />
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={BTN_BACK}
                  >
                    <ArrowLeft size={14} strokeWidth={2} /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!canContinueDetails || submitting}
                    onClick={handleDetailsSubmit}
                    className={BTN_CONTINUE}
                  >
                    <span>Continue</span>
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </>
            ) : (
              /* ================= STEP 3: WHAT TO SEE ================= */
              <>
                <h3 className="h-mega mt-6 border-t border-[var(--line)] pt-5 text-[clamp(1.6rem,2.4vw,1.85rem)] text-[var(--ink)]">
                  What do you want to see?
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--ink-soft)]">
                  Select any that apply — pick as many as you like.
                </p>

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {modules.map((m) => {
                    const isChecked = selectedModules.has(m.label);
                    return (
                      <button
                        key={m.pageNo}
                        type="button"
                        onClick={() => toggleModule(m.label)}
                        aria-pressed={isChecked}
                        className={`flex items-center gap-3 rounded-[6px] border px-3.5 py-2.5 text-left transition-colors ${
                          isChecked
                            ? "border-[var(--brand)] bg-[var(--tint)]"
                            : "border-[var(--line-soft)] hover:border-[var(--ink)]"
                        }`}
                      >
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-[4px] border ${
                            isChecked
                              ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                              : "border-[var(--ink-mute)]"
                          }`}
                        >
                          {isChecked && <Check size={13} strokeWidth={3} />}
                        </span>
                        <span className="text-[13.5px] font-medium text-[var(--ink)]">
                          {m.label}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setHasCustomRequest((prev) => !prev)}
                    aria-pressed={hasCustomRequest}
                    className={`flex items-center gap-3 rounded-[6px] border px-3.5 py-2.5 text-left transition-colors sm:col-span-2 ${
                      hasCustomRequest
                        ? "border-[var(--brand)] bg-[var(--tint)]"
                        : "border-dashed border-[var(--ink-mute)] hover:border-[var(--ink)]"
                    }`}
                  >
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-[4px] border ${
                        hasCustomRequest
                          ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                          : "border-[var(--ink-mute)]"
                      }`}
                    >
                      {hasCustomRequest ? (
                        <Check size={13} strokeWidth={3} />
                      ) : (
                        <Plus size={13} strokeWidth={3} />
                      )}
                    </span>
                    <span className="text-[13.5px] font-medium text-[var(--ink)]">
                      I have something else in mind
                    </span>
                  </button>
                </div>

                {hasCustomRequest && (
                  <textarea
                    rows={3}
                    value={customRequestText}
                    onChange={(e) => setCustomRequestText(e.target.value)}
                    aria-label="Anything else you want to see"
                    placeholder="Tell us what you're trying to solve…"
                    className={`mt-3 ${INPUT_CLASS}`}
                  />
                )}

                {errorMessage && (
                  <p role="alert" className="mt-4 text-[13px] text-red-600">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={BTN_BACK}
                  >
                    <ArrowLeft size={14} strokeWidth={2} /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!canContinueModules || submitting}
                    onClick={handleBookDemo}
                    className={BTN_CONTINUE}
                  >
                    <span>{submitting ? "Booking…" : "Book demo"}</span>
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
