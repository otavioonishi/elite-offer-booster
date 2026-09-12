export const TELEGRAM_BOT = "ferdarocabot";
export const TELEGRAM_WEB = "https://t.me/ferdarocabot?start=tiktok";
export const TELEGRAM_DEEPLINK = "tg://resolve?domain=ferdarocabot&start=tiktok";

type EventName =
  | "telegram_cta_click"
  | "telegram_deeplink_attempt"
  | "telegram_fallback_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires the event into any analytics already present, always keeps a local count. */
export function trackEvent(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    const payload = { ...params, ...getUtmParams() };
    window.gtag?.("event", name, payload);
    window.dataLayer?.push({ event: name, ...payload });
    window.fbq?.("trackCustom", name, payload);

    const key = "fer_events";
    const raw = window.localStorage.getItem(key);
    const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
    counts[name] = (counts[name] ?? 0) + 1;
    window.localStorage.setItem(key, JSON.stringify(counts));
  } catch {
    /* analytics must never break the flow */
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  try {
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key.startsWith("utm_") || key === "ref" || key === "src") out[key] = value;
    });
  } catch {
    /* ignore */
  }
  return out;
}

let opening = false;

/**
 * Tries the native Telegram app first, then falls back to the web link
 * if we are still visible after a short delay. Never loops.
 */
export function openTelegram(onFallbackVisible?: () => void) {
  if (typeof window === "undefined" || opening) return;
  opening = true;

  trackEvent("telegram_cta_click");

  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  let left = false;

  const onHide = () => {
    if (document.visibilityState === "hidden") left = true;
  };
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("pagehide", onHide);

  const cleanup = () => {
    document.removeEventListener("visibilitychange", onHide);
    window.removeEventListener("pagehide", onHide);
    opening = false;
  };

  if (isMobile) {
    trackEvent("telegram_deeplink_attempt");
    try {
      window.location.href = TELEGRAM_DEEPLINK;
    } catch {
      /* ignore */
    }
    window.setTimeout(() => {
      if (!left && document.visibilityState === "visible") {
        onFallbackVisible?.();
        window.location.href = TELEGRAM_WEB;
      }
      cleanup();
    }, 1200);
    return;
  }

  window.open(TELEGRAM_WEB, "_blank", "noopener,noreferrer");
  onFallbackVisible?.();
  cleanup();
}

export function openTelegramWeb() {
  trackEvent("telegram_fallback_click");
  if (typeof window === "undefined") return;
  window.location.href = TELEGRAM_WEB;
}
