import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const jpegOpts = { quality: 97, chromaSubsampling: "4:4:4" };

// Module definitions with low visual clutter (clean, spacious, clutter score < 4)
const MODULE_PAGES = [
  {
    page: 5,
    title: "Crew & Resources",
    activeNav: "Crew & Resources",
    eyebrow: "CREW SCHEDULING & UNION COMPLIANCE",
    event: "EVT-001 | Winning Festival",
    badge: "Active Production",
    stats: [
      { label: "Crew Positions", val: "86 / 104", note: "83% filled", color: "#1454ea" },
      { label: "Turnaround Rest", val: "100%", note: "0 union infractions", color: "#10b981" },
      { label: "Overtime Risk", val: "+2.4 hrs", note: "Within contingency", color: "#f59e0b" }
    ],
    mainTitle: "Department Call Sheet & Dispatch",
    mainItems: [
      {
        title: "Stage Management & Show Call",
        meta: "Call 08:00 · 4 / 4 Checked In",
        lead: "Lead: Marcus Vance",
        status: "Confirmed",
        statusColor: "#10b981"
      },
      {
        title: "Rigging & Truss Crew (IATSE Local 16)",
        meta: "Call 08:30 · 12 / 12 Checked In",
        lead: "Lead: Sarah Chen (Head Rigger)",
        status: "On Site",
        statusColor: "#10b981"
      },
      {
        title: "Audio Engineering & Dante Splits",
        meta: "Call 09:00 · 8 / 8 Checked In",
        lead: "Lead: Liam Torres (A1)",
        status: "On Site",
        statusColor: "#10b981"
      },
      {
        title: "Lighting Programming & DMX Focus",
        meta: "Call 09:30 · 10 / 10 Checked In",
        lead: "Lead: Maya Lin (L1)",
        status: "En Route",
        statusColor: "#3b82f6"
      }
    ],
    sideTitle: "Union Compliance Guardrails",
    sideItems: [
      { label: "Meal Penalty Window", val: "5-Hour Rule Protected", desc: "Next mandated meal window at 13:30" },
      { label: "Rest Turnaround", val: "8 Hours Continuous", desc: "All overnight calls validated" }
    ],
    actionText: "Publish Digital Callsheet"
  },
  {
    page: 6,
    title: "Vendors & Logistics",
    activeNav: "Vendors & Logistics",
    eyebrow: "DOCK SCHEDULING & FREIGHT INBOUND",
    event: "EVT-001 | Winning Festival",
    badge: "Dock Flow Active",
    stats: [
      { label: "Inbound Freight", val: "14 Trucks", note: "8 unloaded · 6 en route", color: "#1454ea" },
      { label: "Dock Utilization", val: "68%", note: "Optimal staging pace", color: "#10b981" },
      { label: "Schedule Conflicts", val: "0 Alerts", note: "AI re-routed Dock B", color: "#10b981" }
    ],
    mainTitle: "Loading Dock & Staging Windows",
    mainItems: [
      {
        title: "Rigging Motors & Structural Truss",
        meta: "08:00 – 09:30 · Dock A · Truck #1",
        lead: "Vendor: Premier Truss Co.",
        status: "Staged & Cleared",
        statusColor: "#10b981"
      },
      {
        title: "Main Stage Audio & Line Array Distro",
        meta: "09:30 – 11:00 · Dock A · Truck #2",
        lead: "Vendor: Soundcraft Live Systems",
        status: "Unloading (45m left)",
        statusColor: "#3b82f6"
      },
      {
        title: "High-Resolution LED Video Wall Panels",
        meta: "11:00 – 12:30 · Dock B · Truck #4",
        lead: "Vendor: Lumen Visual Freight",
        status: "In Transit (ETA 10:45)",
        statusColor: "#f59e0b"
      },
      {
        title: "Artist Backline & Stage Monitoring",
        meta: "13:00 – 14:15 · Dock C · Truck #5",
        lead: "Vendor: TourReady Backline",
        status: "Scheduled",
        statusColor: "#64748b"
      }
    ],
    sideTitle: "Dock Flow Optimization",
    sideItems: [
      { label: "Dock B Conflict Resolution", val: "Resolved +30m Stagger", desc: "Separated video freight from power generator drops" },
      { label: "Marshalling Yard Status", val: "4 Bays Available", desc: "Zero truck queue on perimeter avenue" }
    ],
    actionText: "Open Dock Dispatcher"
  },
  {
    page: 7,
    title: "Show Operations",
    activeNav: "Show Operations",
    eyebrow: "RUN-OF-SHOW & LIVE CUE CALLING",
    event: "EVT-001 | Winning Festival",
    badge: "Live Show Running",
    stats: [
      { label: "Show Master Clock", val: "19:42:15", note: "Act II in progress", color: "#1454ea" },
      { label: "Venue Curfew Margin", val: "+18 Mins", note: "Hard curfew: 23:00", color: "#10b981" },
      { label: "Active Segment", val: "Song 4", note: "\"The Horizon\" (04:30)", color: "#8b5cf6" }
    ],
    mainTitle: "Live Run-of-Show Sequence",
    mainItems: [
      {
        title: "Cue 14 · Headliner Intro Video & Timecode",
        meta: "19:25:00 · Duration 02:00 · Audio / Video",
        lead: "Called by: Stage Manager",
        status: "Executed Clean",
        statusColor: "#10b981"
      },
      {
        title: "Cue 15 · Opening Track & Pyro Strobe",
        meta: "19:27:00 · Duration 03:45 · Full Production",
        lead: "Called by: Stage Manager",
        status: "Executed Clean",
        statusColor: "#10b981"
      },
      {
        title: "Cue 16 · Song 4 – The Horizon (Extended Outro)",
        meta: "19:39:30 · Duration 04:30 · Audio / Lighting",
        lead: "Active Segment",
        status: "LIVE ON STAGE",
        statusColor: "#1454ea"
      },
      {
        title: "Cue 17 · Acoustic Interlude & Stage B Pivot",
        meta: "19:44:00 · Duration 05:00 · Stagehands / FOH",
        lead: "Standby Called",
        status: "Standing By",
        statusColor: "#f59e0b"
      }
    ],
    sideTitle: "Curfew & Delay Mitigation",
    sideItems: [
      { label: "Curfew Protection Engine", val: "Protected (22:42 ETA)", desc: "18-minute safe buffer before municipal fine threshold" },
      { label: "Dynamic Recalculation", val: "Live Auto-Pacing", desc: "Artist chat ran +90s; talk segment adjusted automatically" }
    ],
    actionText: "Advance to Cue 17"
  },
  {
    page: 8,
    title: "Safety & Compliance",
    activeNav: "Safety & Compliance",
    eyebrow: "STRUCTURAL AUDITS & WEATHER CONTINGENCY",
    event: "EVT-001 | Winning Festival",
    badge: "Safety Cleared",
    stats: [
      { label: "Peak Wind Velocity", val: "14 mph", note: "Limit: 35 mph (ANSI E1.21)", color: "#10b981" },
      { label: "AHJ Permits", val: "6 / 6", note: "100% municipal sign-off", color: "#10b981" },
      { label: "Pre-Show Audits", val: "Passed", note: "Doors cleared for ingress", color: "#1454ea" }
    ],
    mainTitle: "Pre-Show Inspection Sign-Offs",
    mainItems: [
      {
        title: "Temporary Stage Roof & PE Stamped Load Calc",
        meta: "Audited 07:45 · Structural Engineer Sign-off",
        lead: "Inspector: J. Gallagher, PE",
        status: "Certified & Signed",
        statusColor: "#10b981"
      },
      {
        title: "Ground Support Ballast & Anchor Verification",
        meta: "Audited 08:30 · 12,000 kg Water Ballast Confirmed",
        lead: "Lead Rigger: Sarah Chen",
        status: "Verified",
        statusColor: "#10b981"
      },
      {
        title: "Generator Grounding & Temporary Power Distro",
        meta: "Audited 09:15 · GFCI & Neutral Bond Tested",
        lead: "Master Electrician: K. Patel",
        status: "Passed Inspection",
        statusColor: "#10b981"
      },
      {
        title: "Emergency Egress & Crowd Corridors 1–6",
        meta: "Audited 10:00 · 20ft Clear Perimeter Verified",
        lead: "Fire Marshal: Capt. R. Hayes",
        status: "Permit Granted",
        statusColor: "#10b981"
      }
    ],
    sideTitle: "Live Environmental Telemetry",
    sideItems: [
      { label: "Anemometer Live Sensor", val: "14 mph Gusting 18 mph", desc: "Stage left top mast sensor connected via LoRaWAN" },
      { label: "Operational Action Level", val: "Level 1: Normal", desc: "Action plan triggers standby only at sustained 28+ mph" }
    ],
    actionText: "Export AHJ Audit Packet"
  },
  {
    page: 9,
    title: "Settlement & Closeout",
    activeNav: "Settlement & Closeout",
    eyebrow: "POST-SHOW FINANCIAL SETTLEMENT",
    event: "EVT-001 | Winning Festival",
    badge: "Ready to Settle",
    stats: [
      { label: "Production Budget", val: "$420,000", note: "Original contracted cap", color: "#64748b" },
      { label: "Actual Spend", val: "$405,200", note: "-$14,800 under budget", color: "#10b981" },
      { label: "Operational Margin", val: "$54,800", note: "22.8% net closing margin", color: "#1454ea" }
    ],
    mainTitle: "Department Cost Reconciliation",
    mainItems: [
      {
        title: "Audio & Intercom Backline Package",
        meta: "Contract: $85,000 · Actual: $81,200",
        lead: "Department: Audio Engineering",
        status: "-$3,800 (Favorable)",
        statusColor: "#10b981"
      },
      {
        title: "Lighting Fixtures & Generator Power",
        meta: "Contract: $72,000 · Actual: $70,400",
        lead: "Department: Lighting & Power",
        status: "-$1,600 (Favorable)",
        statusColor: "#10b981"
      },
      {
        title: "Rigging Labor & Union Stagehands (OT Validated)",
        meta: "Contract: $110,000 · Actual: $112,400",
        lead: "Department: IATSE Local Crew",
        status: "+$2,400 (Billable OT)",
        statusColor: "#3b82f6"
      },
      {
        title: "Heavy Haul Freight & Dock Logistics",
        meta: "Contract: $64,000 · Actual: $62,000",
        lead: "Department: Logistics & Fleet",
        status: "-$2,000 (Favorable)",
        statusColor: "#10b981"
      }
    ],
    sideTitle: "Closeout Reconciliation",
    sideItems: [
      { label: "Overtime Audit Backup", val: "2.4 hrs Validated", desc: "Digital timecard stamps matched against venue curfew" },
      { label: "Promotor Settlement Ready", val: "Full Documentation Attached", desc: "All 18 vendor invoices reconciled with zero discrepancies" }
    ],
    actionText: "Finalize & Sign Settlement"
  }
];

const NAV_ITEMS = [
  "Dashboard",
  "Event Intake",
  "Production Planning",
  "Technical Production",
  "Crew & Resources",
  "Vendors & Logistics",
  "Show Operations",
  "Safety & Compliance",
  "Settlement & Closeout"
];

function generateHtml(m) {
  const navHtml = NAV_ITEMS.map((item) => {
    const active = item === m.activeNav;
    return `
      <div style="
        display: flex;
        align-items: center;
        padding: 6px 12px;
        margin: 2px 8px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: ${active ? "600" : "450"};
        color: ${active ? "#1454ea" : "#334155"};
        background: ${active ? "#ebf2ff" : "transparent"};
      ">
        <span style="display:inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${active ? "#1454ea" : "#cbd5e1"}; margin-right: 8px;"></span>
        ${item}
      </div>
    `;
  }).join("");

  const statsHtml = m.stats.map((s) => `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; flex: 1; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
      <div style="font-size: 11px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em;">${s.label}</div>
      <div style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 4px;">${s.val}</div>
      <div style="font-size: 11px; font-weight: 500; color: ${s.color}; margin-top: 2px;">${s.note}</div>
    </div>
  `).join("");

  const mainItemsHtml = m.mainItems.map((item, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 8px; background: ${idx % 2 === 0 ? "#f8fafc" : "#ffffff"}; border: 1px solid #f1f5f9; margin-bottom: 8px;">
      <div>
        <div style="font-size: 13px; font-weight: 600; color: #0f172a;">${item.title}</div>
        <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">${item.meta} · <span style="color: #475569;">${item.lead}</span></div>
      </div>
      <div style="padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: ${item.statusColor}; background: ${item.statusColor}15; border: 1px solid ${item.statusColor}30;">
        ${item.status}
      </div>
    </div>
  `).join("");

  const sideItemsHtml = m.sideItems.map((item) => `
    <div style="margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
      <div style="font-size: 10.5px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em;">${item.label}</div>
      <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 2px;">${item.val}</div>
      <div style="font-size: 11px; color: #64748b; margin-top: 3px; line-height: 1.4;">${item.desc}</div>
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      width: 1024px;
      height: 576px;
      overflow: hidden;
      background: #ffffff;
      color: #0f172a;
      display: flex;
    }
    .sidebar {
      width: 157px;
      height: 576px;
      border-right: 1px solid #eceef2;
      background: #ffffff;
      flex-shrink: 0;
      padding-top: 14px;
    }
    .brand {
      padding: 0 16px 16px 16px;
      font-size: 15.5px;
      font-weight: 700;
      color: #05070e;
      letter-spacing: -0.01em;
      border-bottom: 1px solid #eceef2;
    }
    .nav-list {
      padding-top: 12px;
    }
    .main-area {
      flex: 1;
      height: 576px;
      display: flex;
      flex-direction: column;
      background: #fafbfd;
    }
    .topbar {
      height: 56px;
      border-bottom: 1px solid #eceef2;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      flex-shrink: 0;
    }
    .page-title {
      font-size: 14.5px;
      font-weight: 600;
      color: #05070e;
    }
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .search-box {
      width: 320px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-size: 10.5px;
      color: #64748b;
      gap: 8px;
    }
    .topbar-icons {
      display: flex;
      align-items: center;
      gap: 14px;
      color: #334155;
    }
    .content-body {
      padding: 20px 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: hidden;
    }
    .header-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-info h1 {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.01em;
    }
    .header-info p {
      font-size: 11.5px;
      font-weight: 500;
      color: #64748b;
      margin-top: 2px;
    }
    .stats-row {
      display: flex;
      gap: 14px;
    }
    .cards-grid {
      display: flex;
      gap: 16px;
      flex: 1;
    }
    .card-left {
      flex: 1.8;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      display: flex;
      flex-direction: column;
    }
    .card-right {
      flex: 1;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card-heading {
      font-size: 12.5px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .primary-btn {
      background: #1454ea;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 6px;
      border: none;
      text-align: center;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="brand">Qorvesqia AI</div>
    <div class="nav-list">
      ${navHtml}
    </div>
  </aside>

  <!-- Main Area -->
  <main class="main-area">
    <header class="topbar">
      <div class="page-title">${m.title}</div>
      <div class="topbar-right">
        <div class="search-box">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Search events, shows, tasks, or people
        </div>
        <div class="topbar-icons">
          <!-- mail -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M3.5 6.5 L12 13 L20.5 6.5"/></svg>
          <!-- chat -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 3.5h16a2.5 2.5 0 0 1 2.5 2.5v9a2.5 2.5 0 0 1-2.5 2.5h-7.5l-4.2 3.8v-3.8H4A2.5 2.5 0 0 1 1.5 15V6A2.5 2.5 0 0 1 4 3.5z"/></svg>
          <!-- bell -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2.5c-3.6 0-6.2 3-6.2 7.5v3.5L4 16.5v.5h16v-.5l-1.8-3V10c0-4.5-2.6-7.5-6.2-7.5z"/><path d="M10.2 19.5a2 2 0 0 0 3.6 0"/></svg>
        </div>
        <div style="width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #475569;">
          QA
        </div>
      </div>
    </header>

    <div class="content-body">
      <!-- Header Banner -->
      <div class="header-banner">
        <div class="header-info">
          <h1>${m.event}</h1>
          <p>${m.eyebrow}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <div style="padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: #10b981; background: #ecfdf5; border: 1px solid #a7f3d0;">
            ${m.badge}
          </div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        ${statsHtml}
      </div>

      <!-- Main Cards Grid -->
      <div class="cards-grid">
        <div class="card-left">
          <div class="card-heading">${m.mainTitle}</div>
          <div>
            ${mainItemsHtml}
          </div>
        </div>

        <div class="card-right">
          <div>
            <div class="card-heading">${m.sideTitle}</div>
            ${sideItemsHtml}
          </div>
          <div class="primary-btn">${m.actionText}</div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`;
}

async function renderModule(m) {
  const htmlContent = generateHtml(m);
  const tempHtml = join(root, `temp_p${m.page}.html`);
  const outPng = join(root, "public", "assets", `p${m.page}.png`);
  const outJpeg = join(root, "public", "assets", `p${m.page}.jpeg`);
  const outCropJpg = join(root, "public", "assets", "shell", `p${m.page}.jpg`);

  writeFileSync(tempHtml, htmlContent, "utf8");

  try {
    console.log(`Rendering p${m.page} via Edge...`);
    execFileSync(edgePath, [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      `--screenshot=${outPng}`,
      "--window-size=1024,576",
      `file://${tempHtml}`
    ]);

    // Create JPEG version
    await sharp(outPng).jpeg(jpegOpts).toFile(outJpeg);

    // Extract content crop (left: 160, top: 58, width: 864, height: 518)
    await sharp(outPng)
      .extract({ left: 160, top: 58, width: 864, height: 518 })
      .jpeg(jpegOpts)
      .toFile(outCropJpg);

    console.log(`✓ Successfully created clean uncluttered p${m.page} (PNG, JPEG, and shell crop)!`);
  } finally {
    if (existsSync(tempHtml)) unlinkSync(tempHtml);
  }
}

async function run() {
  for (const m of MODULE_PAGES) {
    await renderModule(m);
  }
  console.log("All decluttered modules rendered successfully!");
}

run().catch(console.error);
