/**
 * Dashboard shell — the ONE edit point for the app chrome (sidebar + topbar) that
 * DashboardShell.tsx draws around a cropped dashboard screenshot: geometry,
 * colours, type, nav items and topbar icons all live here.
 *
 * Every number is in SOURCE pixels of the 1024x576 screenshots; the shell is
 * drawn on that canvas and scaled as a whole, so nothing here is responsive.
 * scripts/crop-shell.mjs reads `source`, `content` and `avatar` from this file —
 * keep those three as plain numeric literals on one line each.
 */
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  FileText,
  HardHat,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  SlidersHorizontal,
  Wrench,
  Users,
  Truck,
  PlayCircle,
  ShieldCheck,
  Receipt,
  type LucideIcon,
} from "lucide-react";

export const SHELL = {
  /** Size of the original screenshot = the design canvas. */
  source: { w: 1024, h: 576 },
  /** Sidebar is x 0..sidebarW, then a `divider`-wide line. */
  sidebarW: 157,
  /** Topbar is y 0..topbarH, then a `divider`-tall line. */
  topbarH: 56,
  divider: 1,
  /** Rectangle of the screenshot that is kept as an image (public/assets/shell/p<N>.jpg). */
  content: { x: 160, y: 58, w: 864, h: 518 },
  /** Square avatar crop (taken from p1), shown as a circle in the topbar. */
  avatar: { x: 967, y: 11, size: 35 },
  avatarSrc: "/assets/shell/avatar.jpg",
  topbarSrc: "/assets/shell/topbar.png",
  searchPlaceholder: "Search events, shows, tasks, or people",
  /** Left edge + baseline of the wordmark and the page title. */
  wordmark: { x: 18, y: 35 },
  title: { x: 178, y: 35 },
  /** Nav rows: centre of row i is firstCy + pitch * i; label baseline = centre + baseline. */
  nav: {
    firstCy: 84,
    pitch: 34.5,
    iconCx: 26,
    iconSize: 14,
    stroke: 1.5,
    strokeActive: 1.75,
    labelX: 41,
    baseline: 3.5,
  },
  /** Highlight behind the active nav row, centred on the row. */
  pill: { x: 8, w: 141, h: 28, r: 7 },
  search: {
    x: 431,
    y: 12,
    w: 324,
    h: 32,
    r: 8,
    border: 1,
    icon: {
      cx: 448,
      cy: 28,
      size: 13,
      stroke: 1.4,
      src: "/assets/shell-icons/search.svg" as string | undefined,
    },
    placeholder: { x: 465, y: 32 },
  },
  topbarIcon: { size: 17, stroke: 1.5 },
  type: {
    wordmark: { size: 15.5, weight: 700, sx: 0.98 },
    title: { size: 14.5, weight: 600, sx: 0.98 },
    nav: { size: 10.8, weight: 450, sx: 0.96 },
    navActive: { size: 10.8, weight: 600, sx: 0.96 },
    placeholder: { size: 10.5, weight: 400, sx: 0.98 },
  },
  color: {
    header: "#ffffff",
    sidebarFrom: "#ffffff",
    sidebarTo: "#ffffff",
    seam: "#ffffff",
    divider: "#eceef2",
    wordmark: "#05070e",
    title: "#05070e",
    nav: "#334155",
    navActive: "#1454ea",
    pill: "#ebf2ff",
    searchBorder: "#e2e8f0",
    searchIcon: "#64748b",
    placeholder: "#64748b",
    topbarIcon: "#334155",
  },
} as const;

export type ShellNavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  iconSrc?: string;
  scale?: number;
};

const SRC_SCALE = 0.88;

export const SHELL_NAV: ShellNavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "intake", label: "Event Intake", icon: FileText },
  { key: "planning", label: "Production Planning", icon: CalendarDays },
  { key: "technical", label: "Technical Production", icon: Wrench },
  { key: "crew", label: "Crew & Resources", icon: Users },
  { key: "logistics", label: "Vendors & Logistics", icon: Truck },
  { key: "show-ops", label: "Show Operations", icon: PlayCircle },
  { key: "safety", label: "Safety & Compliance", icon: ShieldCheck },
  { key: "settlement", label: "Settlement & Closeout", icon: Receipt },
];

export const SHELL_TOPBAR_ICONS: { key: "mail" | "chat" | "alerts"; cx: number; cy: number }[] = [
  { key: "mail", cx: 856, cy: 28 },
  { key: "chat", cx: 896, cy: 28 },
  { key: "alerts", cx: 936, cy: 28 },
];

/** Shell props for screenshot page `page`: highlights the nav item whose label is `title`. */
export const shellFor = (page: number, title: string) => ({
  active: SHELL_NAV.find((n) => n.label.toLowerCase() === title.toLowerCase())?.key ?? "",
  title,
  contentSrc: `/assets/shell/p${page}.jpg`,
});
