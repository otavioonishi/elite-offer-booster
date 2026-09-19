import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, Flame, Heart, Play, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeonButton } from "@/components/ui/NeonButton";
import { captureUtms, openTelegram, openTelegramWeb, TELEGRAM_HANDLE, trackEvent, withUtms } from "@/lib/telegram";
import { CHECKOUT_UNAVAILABLE_MESSAGE, plans } from "@/config/checkout";
import heroImage from "@/assets/hero-new.png";

// Cole aqui o endereço do vídeo quando ele estiver hospedado.
const PREVIEW_VIDEO_URL = "";

type Plan = (typeof plans)[number];

const styles = `
@keyframes fdr-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
@keyframes fdr-rise { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: none; } }
.fdr-pulse { animation: fdr-pulse 2s ease-out infinite; }
.fdr-rise { animation: fdr-rise .35s ease-out both; }
@media (prefers-reduced-motion: reduce) { .fdr-pulse, .fdr-rise { animation: none; } }
`;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [
    { title: "Fernanda da Roça · Seu acesso" },
    { name: "description", content: "Veja uma prévia e escolha seu acesso básico ou VIP." },
    { property: "og:title", content: "Fernanda da Roça · Seu acesso" },
    { property: "og:description", content: "Veja uma prévia e escolha seu acesso." },
    { property: "og:type", content: "website" },
  ] }),
});

function Home() {
  const [toast, setToast] = useState<string | null>(null);
  const [telegramFallback, setTelegramFallback] = useState(false);
  const [showSticky, setShowSticky] = useState(true);
  const plansRef = useRef<HTMLElement | null>(null);

  // Plano em destaque (VIP). Não depende mais da posição no array.
  const vipPlan: Plan | undefined = plans.find((p) => p.highlight) ?? plans[plans.length - 1];

  useEffect(() => { captureUtms(); trackEvent("site_view"); }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Esconde a barra fixa quando os planos já estão na tela.
  useEffect(() => {
    const el = plansRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showToast = (message: string) => setToast(message);

  const handlePlan = (plan: Plan) => {
    trackEvent(plan.id === "monthly" ? "monthly_plan_click" : "lifetime_plan_click");
    if (!plan.url) { showToast(CHECKOUT_UNAVAILABLE_MESSAGE); return; }
    trackEvent("checkout_open", { plan: plan.id });
    window.location.href = withUtms(plan.url);
  };

  const copyHandle = async () => {
    try { await navigator.clipboard.writeText(TELEGRAM_HANDLE); showToast("Usuário copiado"); }
    catch { showToast(`Procure por ${TELEGRAM_HANDLE} no Telegram`); }
  };

  const hasVideo = Boolean(PREVIEW_VIDEO_URL);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background px-3 pb-32 pt-3 text-foreground sm:px-5 sm:pt-8">
      <style>{styles}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-neon-pink/15 to-transparent" />

      <div className="relative mx-auto w-full max-w-md">
        <header className="flex items-center justify-between px-1 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-neon-pink/60 bg-neon-pink/10 font-serif text-xl italic text-neon-pink">F</span>
            <span className="text-base font-bold tracking-tight">Fernanda da Roça</span>
          </div>
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-bold">+18</span>
        </header>

        <section className="relative h-[68svh] max-h-[720px] min-h-[440px] w-full overflow-hidden rounded-3xl border border-border bg-black">
          {hasVideo ? (
            <video src={PREVIEW_VIDEO_URL} poster={heroImage} controls playsInline preload="metadata" controlsList="nodownload" className="h-full w-full object-cover" aria-label="Vídeo de prévia da Fernanda" />
          ) : (
            <>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.15), rgba(0,0,0,.75)), url(${heroImage})` }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <span aria-hidden="true" className="fdr-pulse absolute inset-0 rounded-full bg-neon-pink/60" />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/40 bg-black/40 backdrop-blur">
                    <Play className="ml-1 h-8 w-8 fill-white text-white" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-5 text-xl font-bold">Sua prévia vem aí</p>
                <p className="mt-1 max-w-[220px] text-sm text-white/80">Enquanto isso, veja uma prévia no Telegram.</p>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pr-24 pt-16">
                <p className="text-lg font-black leading-tight">Fernanda da Roça</p>
                <p className="mt-0.5 text-sm text-white/80">Veja a prévia e escolha seu acesso.</p>
              </div>
            </>
          )}

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-neon-pink" />Prévia
          </span>

          <a
            href="https://t.me/ferdarocabot?start=tiktok"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("telegram_cta_click")}
            className={`absolute right-3 z-10 flex w-[76px] flex-col items-center gap-1.5 rounded-xl text-center text-[11px] font-semibold leading-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink ${hasVideo ? "bottom-16" : "bottom-5"}`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-neon-pink text-white shadow-lg">
              <Send className="h-5 w-5" aria-hidden="true" />
            </span>
            Prévia no Telegram
          </a>
        </section>

        <section ref={plansRef} className="mt-7">
          <h1 className="text-[28px] font-black leading-[1.1] tracking-tight">Fique mais um pouco comigo</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">Escolha seu acesso para assistir aqui.</p>

          <div className="mt-6 flex flex-col gap-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => handlePlan(plan)}
                className={`relative isolate w-full rounded-2xl border p-4 text-left transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink ${plan.highlight ? "border-neon-pink bg-neon-pink/10" : "border-border bg-card/60 hover:border-neon-pink/60"}`}
              >
                {plan.highlight && <span aria-hidden="true" className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-neon-pink/20 blur-xl" />}
                {plan.badge && (
                  <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-neon-pink px-3 py-1 text-xs font-black text-white shadow-md">
                    <Flame className="mr-1 h-3.5 w-3.5" aria-hidden="true" />{plan.badge}
                  </span>
                )}
                <span className="flex items-center justify-between gap-4">
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-base font-bold">
                      {plan.title.replace(/^[^A-ZÀ-Ú]*/, "")}
                      <Heart className="h-4 w-4 shrink-0 text-neon-pink" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{plan.text}</span>
                  </span>
                  <span className="shrink-0 text-2xl font-black">{plan.price}</span>
                </span>
              </button>
            ))}
          </div>

          {vipPlan && (
            <NeonButton type="button" onClick={() => handlePlan(vipPlan)} className="mt-5 w-full py-4 text-base">
              Quero meu acesso VIP
            </NeonButton>
          )}
          <p className="mt-3 text-center text-xs text-muted-foreground">Conteúdo exclusivo para maiores de 18 anos.</p>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-card/40 p-4 text-center">
          <p className="text-sm font-semibold">Prefere conversar antes?</p>
          <button
            type="button"
            onClick={() => openTelegram(() => setTelegramFallback(true))}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-semibold transition hover:border-neon-pink/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
          >
            <Send className="h-4 w-4" aria-hidden="true" />Falar comigo no Telegram
          </button>
          {telegramFallback && (
            <button
              type="button"
              onClick={openTelegramWeb}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border px-4 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />Abrir Telegram pelo navegador
            </button>
          )}
          <button
            type="button"
            onClick={() => void copyHandle()}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />Copiar {TELEGRAM_HANDLE}
          </button>
        </section>
      </div>

      {showSticky && vipPlan && (
        <div className="fdr-rise fixed inset-x-0 bottom-0 z-40" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="mx-auto max-w-md bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-3 pt-8">
            <NeonButton type="button" onClick={() => handlePlan(vipPlan)} className="w-full py-4 text-base">
              Quero meu acesso VIP
            </NeonButton>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" aria-live="polite" className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-border bg-card px-4 py-3 text-center text-sm shadow-xl">
          <Check className="mr-1 inline h-4 w-4 text-emerald-400" aria-hidden="true" />{toast}
        </div>
      )}
    </main>
  );
}
