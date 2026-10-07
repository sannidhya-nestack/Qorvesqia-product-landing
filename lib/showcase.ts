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
    code: "NFPA 101 & Life Safety",
    name: "Life Safety Code & Crowd Management Compliance",
    note: "Validates venue occupant load capacities, egress corridor clearances, emergency evacuation routes, and certified crowd manager staffing ratios.",
  },
  {
    code: "OSHA 1926 & NFPA 701",
    name: "Jobsite Safety, Fall Protection & Scenic Flame Retardancy",
    note: "Audits high-rigger 100% tie-off compliance, structural harnesses, and maintains valid AHJ flame-spread test certificates for all stage drapery.",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    name: "Dynamic Curfew & Delay Mitigation Engine",
    blurb:
      "An automated real-time timing intelligence engine that dynamically recalculates run-of-show talk segments, changeovers, and encore lengths to guarantee festival headliners never breach strict municipal sound curfews.",
    tags: ["Run-of-Show Intelligence", "Curfew Protection", "Show Operations"],
  },
  {
    name: "Automated Rider Parsing & Inventory Matching Engine",
    blurb:
      "An intelligent document extraction agent that parses multi-page artist technical riders, stage plots, and backline requests — instantly compiling rental manifests and cross-referencing warehouse availability.",
    tags: ["Rider Extraction", "Inventory Matching", "Event Intake"],
  },
];
