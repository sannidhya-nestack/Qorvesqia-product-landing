import { useId } from "react";
import Image from "next/image";
import { Search, type LucideIcon } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { SHELL, SHELL_NAV, SHELL_TOPBAR_ICONS } from "@/lib/shell";

export type ShellProps = {
  /** `key` of the highlighted item in SHELL_NAV (lib/shell.ts). */
  active: string;
  /** Page title shown in the topbar. */
  title: string;
  /** The cropped content image written by scripts/crop-shell.mjs (public/assets/shell/p<N>.jpg). */
  contentSrc: string;
};

type DashboardShellProps = ShellProps & { priority?: boolean; sizes?: string; unoptimized?: boolean };

const { source: S, sidebarW, topbarH, divider, content: C, avatar: A, color } = SHELL;

// The content crop is ~84% of the plate, and the plate tops out near 1135 CSS px.
const DEFAULT_SIZES = "(min-width: 1024px) 950px, 84vw";
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

// Geometry + type of the drawn chrome, in source px — all edited in lib/shell.ts.
const { nav: NAV, pill: PILL, search: SEARCH, type: TYPE } = SHELL;

/** A line of text whose left edge / baseline sit at (x, y) on the canvas. */
function Txt({
  x,
  y,
  type,
  fill,
  children,
}: {
  x: number;
  y: number;
  type: keyof typeof TYPE;
  fill: string;
  children: string;
}) {
  const t = TYPE[type];
  return (
    <text
      transform={`translate(${x} ${y}) scale(${t.sx} 1)`}
      fontSize={t.size}
      fontWeight={t.weight}
      fill={fill}
    >
      {children}
    </text>
  );
}

/** One icon centred on (cx, cy): a lucide glyph, or a dropped-in SVG file used as an alpha mask. */
function ShellIcon({
  icon: Icon,
  iconSrc,
  cx,
  cy,
  size,
  stroke,
  maskId,
}: {
  icon: LucideIcon;
  iconSrc?: string;
  cx: number;
  cy: number;
  size: number;
  stroke: number;
  maskId: string;
}) {
  const x = cx - size / 2;
  const y = cy - size / 2;
  if (iconSrc) {
    return (
      <>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={x}
          y={y}
          width={size}
          height={size}
          style={{ maskType: "alpha" }}
        >
          <image
            href={iconSrc}
            x={x}
            y={y}
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid meet"
          />
        </mask>
        <rect
          x={x}
          y={y}
          width={size}
          height={size}
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
      </>
    );
  }
  return <Icon x={x} y={y} size={size} strokeWidth={stroke} />;
}

/**
 * The dashboard screenshot rebuilt as a composite: the app chrome (sidebar +
 * topbar) is live vector markup, the content area is the cropped screenshot.
 *
 * The chrome is drawn on the screenshot's own 1024x576 canvas inside an inline
 * SVG, so the browser scales it as one unit — a pixel-proportional replica at any
 * width, server-rendered (no JS, no layout shift), and its text is never touched
 * by minimum-font-size clamping. Purely decorative: hidden from assistive tech
 * and transparent to the pointer, so the plate's click-to-zoom still works.
 */
export default function DashboardShell({
  active,
  title,
  contentSrc,
  priority = false,
  sizes,
  unoptimized = false,
}: DashboardShellProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const bodyTop = topbarH + divider;

  return (
    <div
      aria-hidden
      style={{
        fontFamily: "var(--font-body), Inter, system-ui, sans-serif",
        position: "relative",
        width: "100%",
        aspectRatio: `${S.w} / ${S.h}`,
        background: color.seam,
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <Image
        src={contentSrc}
        alt=""
        width={C.w}
        height={C.h}
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes ?? DEFAULT_SIZES}
        draggable={false}
        style={{
          position: "absolute",
          left: pct(C.x, S.w),
          top: pct(C.y, S.h),
          width: pct(C.w, S.w),
          height: pct(C.h, S.h),
          maxWidth: "none",
        }}
      />
      <svg
        viewBox={`0 0 ${S.w} ${S.h}`}
        focusable="false"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          willChange: "transform",
        }}
      >
        <defs>
          <linearGradient id={`${uid}sb`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color.sidebarFrom} />
            <stop offset="1" stopColor={color.sidebarTo} />
          </linearGradient>
          <clipPath id={`${uid}av`}>
            <circle cx={A.x + A.size / 2} cy={A.y + A.size / 2} r={A.size / 2} />
          </clipPath>
        </defs>

        {/* Surfaces, then the two dividers */}
        <rect x={0} y={0} width={S.w} height={topbarH} fill={color.header} />
        <rect x={0} y={bodyTop} width={sidebarW} height={S.h - bodyTop} fill={`url(#${uid}sb)`} />
        <rect x={0} y={topbarH} width={S.w} height={divider} fill={color.divider} />
        <rect x={sidebarW} y={0} width={divider} height={S.h} fill={color.divider} />

        {/* Sidebar Wordmark */}
        <Txt x={SHELL.wordmark.x} y={SHELL.wordmark.y} type="wordmark" fill={color.wordmark}>
          {PRODUCT.name}
        </Txt>

        {/* Sidebar Nav Items */}
        {SHELL_NAV.map((item, i) => {
          const on = item.key === active;
          const cy = NAV.firstCy + NAV.pitch * i;
          const size = NAV.iconSize * (item.scale ?? 1);
          return (
            <g key={item.key} style={{ color: on ? color.navActive : color.nav }}>
              {on && (
                <rect
                  x={PILL.x}
                  y={cy - PILL.h / 2}
                  width={PILL.w}
                  height={PILL.h}
                  rx={PILL.r}
                  fill={color.pill}
                />
              )}
              <ShellIcon
                icon={item.icon}
                iconSrc={item.iconSrc}
                cx={NAV.iconCx}
                cy={cy}
                size={size}
                stroke={(on ? NAV.strokeActive : NAV.stroke) / (item.scale ?? 1)}
                maskId={`${uid}n${i}`}
              />
              <Txt
                x={NAV.labelX}
                y={cy + NAV.baseline}
                type={on ? "navActive" : "nav"}
                fill="currentColor"
              >
                {item.label}
              </Txt>
            </g>
          );
        })}

        {/* Topbar */}
        <Txt x={SHELL.title.x} y={SHELL.title.y} type="title" fill={color.title}>
          {title}
        </Txt>

        {/* Search bar */}
        <rect
          x={SEARCH.x + SEARCH.border / 2}
          y={SEARCH.y + SEARCH.border / 2}
          width={SEARCH.w - SEARCH.border}
          height={SEARCH.h - SEARCH.border}
          rx={SEARCH.r - SEARCH.border / 2}
          fill={color.header}
          stroke={color.searchBorder}
          strokeWidth={SEARCH.border}
        />
        <g style={{ color: color.searchIcon }}>
          <ShellIcon
            icon={Search}
            iconSrc={SEARCH.icon.src}
            cx={SEARCH.icon.cx}
            cy={SEARCH.icon.cy}
            size={SEARCH.icon.size}
            stroke={SEARCH.icon.stroke}
            maskId={`${uid}s`}
          />
        </g>
        <Txt
          x={SEARCH.placeholder.x}
          y={SEARCH.placeholder.y}
          type="placeholder"
          fill={color.placeholder}
        >
          {SHELL.searchPlaceholder}
        </Txt>

        {/* Topbar action icons */}
        <g style={{ color: color.topbarIcon }}>
          {SHELL_TOPBAR_ICONS.map((t, i) => (
            <ShellIcon
              key={t.key}
              icon={t.icon}
              iconSrc={t.iconSrc}
              cx={t.cx}
              cy={t.cy}
              size={SHELL.topbarIcon.size}
              stroke={SHELL.topbarIcon.stroke}
              maskId={`${uid}t${i}`}
            />
          ))}
        </g>

        {/* Circular avatar */}
        <image
          href={SHELL.avatarSrc}
          x={A.x}
          y={A.y}
          width={A.size}
          height={A.size}
          clipPath={`url(#${uid}av)`}
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}
