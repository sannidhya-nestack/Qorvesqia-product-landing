/* Config-driven data for the DYNAMIC Compliance + Products sections. Both
   components render null when their array is empty. Values inlined here as
   literals — never fetched at runtime. */

export type ComplianceItem = { code: string; name: string; note: string };
export type ProductItem = {
  name: string;
  blurb: string;
  image?: string;
  tags?: string[];
};

export const COMPLIANCE: ComplianceItem[] = [
  {
    code: "ANSI E1.21",
    name: "Entertainment Technology — Temporary Ground-Supported Overhead Structures",
    note: "Qorvesqia AI evaluates ballast weights, structural wind-action thresholds, and outdoor weather telemetry to enforce mandatory wind-reduction and evacuation protocols.",
  },
  {
    code: "ANSI E1.6-1 to E1.6-4",
    name: "Entertainment Technology — Powered Hoist Systems & Rigging Safety",
    note: "Calculates bridle vector angles, hoist load distribution, and minimum 5:1/8:1 design safety factors across all suspended truss lines and video walls.",
  },
  {
    code: "NFPA 70 (Arts 520 & 525)",
    name: "National Electrical Code — Theaters, Carnivals & Temporary Installations",
    note: "Verifies portable 3-phase distribution feeder sizing (4/0 Cam-Lok), generator grounding, and phase load balancing (under 15% delta) before energization.",
  },
  {
    code: "OSHA 1926 & NFPA 701",
    name: "Jobsite Safety, Fall Protection & Scenic Flame Retardancy",
    note: "Audits high-rigger 100% tie-off compliance, LOTO sign-offs on main disconnects, and maintains valid AHJ flame-spread test certificates for all stage drapery.",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    name: "ANSI E1.21 Environmental Weather & Wind Sensor",
    blurb:
      "A ruggedized, high-precision wireless anemometer and barometric sensor clamped to the highest truss apex that streams live 3-second peak wind gust and ambient data directly into your Safety risk dashboard — alerting production heads before action thresholds are reached.",
    image: "/assets/product-cure-sensor.svg",
    tags: ["ANSI E1.21 Safety", "Wind Action Thresholds", "Outdoor Festivals"],
  },
  {
    name: "Digital In-Line 3-Phase Cam-Lok Power Telemetry Gateway",
    blurb:
      "An intelligent in-line monitoring interface placed between temporary generator drops and main distribution racks that captures per-phase current draw, voltage drop, and neutral harmonic distortion over Bluetooth — preventing generator overloads and breaker trips during showtime.",
    image: "/assets/product-laser-meter.svg",
    tags: ["NFPA 70 Compliance", "Power Balancing", "Live Show Operations"],
  },
];
