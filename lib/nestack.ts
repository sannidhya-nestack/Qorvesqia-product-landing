/* Nestack API — the single hard-coded base + typed fetch helpers used by every
   client- and server-side section that talks to the platform. The `www.` host
   returns Access-Control-Allow-Origin directly; the apex 307-redirects and
   loses the header, so browser fetches abort. Never make this an env var. */

export const NESTACK_API = "https://www.nestack.ai";

export type Module = { pageNo: number; label: string };
export type Slot = { startTime: string; spotsLeft: number | null };
type PriceResp = { priceUsd?: number; currency?: string; period?: string };

const DEFAULT_PRICE_USD = 200;

export async function getModules(insubId: string): Promise<Module[]> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-modules/${insubId}`);
    if (!res.ok) return [];
    const d = (await res.json()) as { modules?: Module[] };
    return d.modules ?? [];
  } catch {
    return [];
  }
}

export async function getPrice(insubId: string): Promise<number> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-price/${insubId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return DEFAULT_PRICE_USD;
    const d = (await res.json()) as PriceResp;
    return Number(d.priceUsd) > 0 ? Number(d.priceUsd) : DEFAULT_PRICE_USD;
  } catch {
    return DEFAULT_PRICE_USD;
  }
}

export async function getAvailability(timezone: string): Promise<Slot[]> {
  try {
    const res = await fetch(
      `${NESTACK_API}/api/product-demo/availability?timezone=${encodeURIComponent(timezone)}`,
    );
    if (!res.ok) return [];
    const d = (await res.json()) as { slots?: Slot[] };
    return d.slots ?? [];
  } catch {
    return [];
  }
}

export async function createDraft(payload: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-demo/draft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = (await res.json()) as { sessionToken?: string };
    return d.sessionToken ?? null;
  } catch {
    return null;
  }
}

export async function updateDraft(payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch(`${NESTACK_API}/api/product-demo/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* best-effort — never block the visitor on a tracking write */
  }
}

export async function book(
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string; status: number }> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-demo/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    return { ok: !!(res.ok && d.ok), error: d.error, status: res.status };
  } catch (e) {
    return { ok: false, error: (e as Error).message, status: 0 };
  }
}
