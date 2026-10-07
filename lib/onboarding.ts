/* Config for the Onboarding section (below Pricing). The three FIXED base fees
   ($1,000 / $2,500 / $5,000) are STARTING prices — the trailing "+" signals we
   scope the final one-time once we understand the client's environment. Tiers
   are cumulative: Plus opens "Everything in Essential, plus:", Enterprise opens
   "Everything in Plus, plus:". */

export const ONBOARDING_FEES = {
  essential: "$1,000+",
  plus: "$2,500+",
  enterprise: "$5,000+",
} as const;

export type OnboardingTier = {
  key: "Essential" | "Plus" | "Enterprise";
  fee: string;
  featured: boolean;
  opener: string | null;
  features: string[];
};

export const ONBOARDING = {
  description:
    "A structured white-glove onboarding that gets your event production and technical operations teams running Qorvesqia AI before your next production cycle — we ingest your historical artist riders, venue specification packs, and AVL inventory catalogs, configure your IATSE union labor rate rules, and connect every module from brief intake through live cue calling and financial settlement. The fees below are starting points: final onboarding is scoped based on your active tour legs, rental database integrations, and fleet volume.",
  essential: {
    key: "Essential",
    fee: ONBOARDING_FEES.essential,
    featured: false,
    opener: null,
    features: [
      "Kickoff call and rollout plan scoped to your production managers and technical directors",
      "Workspace provisioning and admin account setup for your production company",
      "Ingestion and tuning of representative artist riders, venue packs, and technical specs",
      "Rider parsing engine configured to your standard AVL catalog and staging assemblies",
      "Production Command Dashboard, Readiness Index, and AI Risk Queue configured",
      "Roles and permissions established for PMs, TDs, stage managers, and crew coordinators",
      "Live-readiness rehearsal simulation on an active upcoming production before go-live",
      "Onboarding handbook, show-caller quickstart guide, and digital call sheet templates",
    ],
  } satisfies OnboardingTier,
  plus: {
    key: "Plus",
    fee: ONBOARDING_FEES.plus,
    featured: true,
    opener: "Everything in Essential, plus:",
    features: [
      "Guided migration of historical production records, rate sheets, and vendor directories",
      "Two integrations — Vectorworks Spotlight, Flex Rental Solutions, or your accounting ERP",
      "Custom union labor rules, meal penalty thresholds, and turnaround rest alarms configured",
      "Vendor & Logistics pipeline wired to your preferred sub-rental suppliers and freight carriers",
      "Live interactive training for production managers, TDs, and stage managers with recordings",
      "Dedicated live production solutions specialist assigned throughout the rollout",
    ],
  } satisfies OnboardingTier,
  enterprise: {
    key: "Enterprise",
    fee: ONBOARDING_FEES.enterprise,
    featured: false,
    opener: "Everything in Plus, plus:",
    features: [
      "Tailored multi-division rollout across touring entities, festival branches, and venue departments",
      "Bespoke integrations, custom REST/GraphQL APIs, and corporate SSO/SAML configuration",
      "Bulk AVL inventory history, serial numbers, and equipment maintenance record migration",
      "Role-based training tracks for executive producers, technical directors, stage managers, and crew coordinators",
      "Compliance audit-trail configuration for ANSI E1.21, ANSI E1.6-1 rigging, and OSHA safety standards",
      "Named enterprise rollout manager with a committed SLA and go-live milestone schedule",
    ],
  } satisfies OnboardingTier,
  deployment: {
    cloud: {
      label: "Cloud (SaaS)",
      note: "Runs in Nestack's secure managed cloud — the fastest path to deployment. We provision your workspace and your production and technical teams are running Qorvesqia AI the same week, with automatic model updates and cloud scaling handled for you.",
    },
    private: {
      label: "Private / self-hosted",
      note: "The identical platform deployed inside your own dedicated infrastructure — your AWS/Azure cloud, VPC, or on-premises environment — for live entertainment producers and touring agencies that require proprietary rate sheets, artist contracts, and show financials to remain entirely in-house.",
    },
  },
};
