/**
 * Crop the CONTENT area out of a dashboard screenshot so DashboardShell.tsx can
 * draw the sidebar + topbar as real markup around it.
 *
 * node scripts/crop-shell.mjs # page 1
 * node scripts/crop-shell.mjs 2 3 # pages 2 and 3
 * node scripts/crop-shell.mjs all # every public/assets/p<N>.{jpg,jpeg,webp,png}
 * node scripts/crop-shell.mjs all --out <dir> # dry run into another directory
 *
 * Writes public/assets/shell/p<N>.jpg and, once, public/assets/shell/avatar.jpg
 * (taken from p1; pass --avatar to re-cut it). The originals are never modified.
 * The outputs live in the shell/ subfolder on purpose: scripts/check.mjs counts
 * the loose images in public/assets as sub-industry photos, and these are not.
 * The crop rectangles come from lib/shell.ts — edit them there, not here.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "public", "assets");
const shell = readFileSync(join(root, "lib", "shell.ts"), "utf8");

const nums = (re, what) => {
  const m = shell.match(re);
  if (!m) throw new Error(`lib/shell.ts: could not read ${what}`);
  return m.slice(1).map(Number);
};

const [srcW, srcH] = nums(/source:\s*\{\s*w:\s*(\d+),\s*h:\s*(\d+)\s*\}/, "source");
const [left, top, width, height] = nums(/content:\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+),\s*w:\s*(\d+),\s*h:\s*(\d+)\s*\}/, "content");
const [avX, avY, avSize] = nums(/avatar:\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+),\s*size:\s*(\d+)\s*\}/, "avatar");

// Near-lossless re-encode: full chroma, so the flat seam colours and thin card
// borders survive the second JPEG pass without visible ringing.
const jpeg = { quality: 97, chromaSubsampling: "4:4:4" };

const args = process.argv.slice(2);
const forceAvatar = args.includes("--avatar");
const outAt = args.indexOf("--out");
if (outAt !== -1 && (!args[outAt + 1] || args[outAt + 1].startsWith("--")))
  throw new Error("--out needs a directory");
const outDir = outAt === -1 ? join(assets, "shell") : resolve(args[outAt + 1]);
const wanted = args.filter((a, i) => !a.startsWith("--") && (outAt === -1 || i !== outAt + 1));

mkdirSync(outDir, { recursive: true });

// The dashboard for page N is the first of p<N>.png / .jpg / .jpeg / .webp that exists.
const EXTS = ["png", "jpg", "jpeg", "webp"];
const sourceOf = (n) => EXTS.map((e) => join(assets, `p${n}.${e}`)).find(existsSync);

const pages = wanted.includes("all")
  ? [...new Set(readdirSync(assets).map((f) => f.match(/^p(\d+)\.(jpe?g|webp|png)$/i)?.[1]).filter(Boolean).map(Number))].sort((a, b) => a - b)
  : (wanted.length ? wanted : ["1"]).map(Number);

for (const n of pages) {
  const src = Number.isInteger(n) ? sourceOf(n) : undefined;
  if (!src) {
    console.error(`✗ p${n}.{${EXTS.join(",")}} not found in public/assets — skipped`);
    process.exitCode = 1;
    continue;
  }
  const meta = await sharp(src).metadata();
  if (meta.width !== srcW || meta.height !== srcH) {
    console.error(`✗ p${n} is ${meta.width}x${meta.height}, expected ${srcW}x${srcH} — skipped`);
    process.exitCode = 1;
    continue;
  }
  await sharp(src).extract({ left, top, width, height }).jpeg(jpeg).toFile(join(outDir, `p${n}.jpg`));
  console.log(`✓ shell/p${n}.jpg ${width}x${height} @ (${left},${top})`);
}

const avatarOut = join(outDir, "avatar.jpg");
const p1 = sourceOf(1);
if ((forceAvatar || !existsSync(avatarOut)) && p1) {
  await sharp(p1).extract({ left: avX, top: avY, width: avSize, height: avSize }).jpeg(jpeg).toFile(avatarOut);
  console.log(`✓ shell/avatar.jpg ${avSize}x${avSize} @ (${avX},${avY})`);
}
