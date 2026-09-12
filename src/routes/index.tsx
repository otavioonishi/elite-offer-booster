import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ExternalLink, Eye, Copy, Check, Flame } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  openTelegram,
  openTelegramWeb,
  trackEvent,
  captureUtms,
  withUtms,
  TELEGRAM_HANDLE,
} from "@/lib/telegram";
import { plans, CHECKOUT_UNAVAILABLE_MESSAGE } from "@/config/checkout";
import heroImage from "@/assets/hero-new.png";
// Para trocar a imagem da prévia, basta substituir o arquivo abaixo:
import previewImage from "@/assets/previe.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Fer da Roça — Fala comigo ou garanta seu acesso VIP" },
      {
        name: "description",
        content:
          "Fala comigo no Telegram ou continue por aqui: veja a prévia e escolha seu acesso VIP mensal ou vitalício.",
      },
      { property: "og:title", content: "Fer da Roça — Fala comigo ou garanta seu acesso VIP" },
      {
        property: "og:description",
        content: "Fala comigo no Telegram ou escolha seu acesso VIP direto por aqui.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const [showFallback, setShowFallback] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const previewRef = useRef<HTMLElement | null>(null);
  const plansRef = useRef<HTMLElement | null>(null);

  const go = () => openTelegram(() => setShowFallback(true));

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const scrollTo = (el: HTMLElement | null) => el?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    captureUtms();
    trackEvent("site_view");
  }, []);

  // prévia vista + CTA fixo depois de rolar
  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackEvent("preview_view");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContinue = () => {
    trackEvent("continue_on_site_click");
    scrollTo(previewRef.current);
  };

  const handlePlan = (plan: (typeof plans)[number]) => {
    trackEvent(plan.id === "monthly" ? "monthly_plan_click" : "lifetime_plan_click");
    if (!plan.url) {
      showToast(CHECKOUT_UNAVAILABLE_MESSAGE);
      return;
    }
    trackEvent("checkout_open", { plan: plan.id });
    window.location.href = withUtms(plan.url);
  };

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText(TELEGRAM_HANDLE);
      showToast("Usuário copiado ❤️");
    } catch {
      showToast("Copie manualmente: " + TELEGRAM_HANDLE);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center px-4 pb-32 pt-8">
      {/* fundo quente e suave */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[50vh] w-[60vh] -translate-x-1/2 rounded-full bg-[oklch(0.72_0.08_60_/_0.18)] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full bg-neon-pink/10 blur-[120px]" />
      </div>

      {/* ============ PRIMEIRA DOBRA ============ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <img
          src={heroImage}
          alt="Fernanda"
          width={768}
          height={1365}
          fetchPriority="high"
          decoding="async"
          className="aspect-[4/5] w-full select-none rounded-[2rem] object-cover object-top shadow-2xl"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-5 max-w-md text-center text-3xl font-black leading-tight sm:text-4xl"
      >
        Quer me conhecer melhor? 👀❤️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-2 max-w-sm text-center text-base text-muted-foreground"
      >
        Escolha como você quer continuar.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-5 w-full max-w-sm"
      >
        <NeonButton size="xl" onClick={go} className="w-full py-5 text-lg">
          <Heart className="h-5 w-5 fill-current" /> FALAR COM A FER
        </NeonButton>
      </motion.div>

      <div className="mt-4 w-full max-w-sm text-center">
        <p className="text-sm font-semibold">Telegram não abriu? Sem problema ❤️</p>
        <button
          onClick={handleContinue}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white/5 px-5 py-4 text-sm font-bold uppercase tracking-wide backdrop-blur transition hover:bg-white/10"
        >
          <Eye className="h-4 w-4" /> Continuar por aqui
        </button>
      </div>

      {showFallback && (
        <div className="glass mt-4 w-full max-w-sm rounded-2xl p-4 text-center">
          <p className="text-sm font-semibold">Não abriu o Telegram?</p>
          <button
            onClick={openTelegramWeb}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold uppercase tracking-wide"
          >
            <ExternalLink className="h-4 w-4" /> Abrir Telegram
          </button>
        </div>
      )}

      {/* ============ PRÉVIA ============ */}
      <section ref={previewRef} id="previa" className="mt-16 w-full max-w-sm scroll-mt-6">
        <h2 className="text-center text-2xl font-black leading-tight">
          Só um gostinho do meu lado mais reservado… 👀❤️
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Gostou do que viu? Escolha seu acesso abaixo.
        </p>
        <motion.img
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={previewImage}
          alt="Prévia da Fernanda"
          loading="lazy"
          decoding="async"
          className="mt-5 aspect-[4/5] w-full select-none rounded-[2rem] object-cover shadow-2xl"
        />
      </section>

      {/* ============ PLANOS ============ */}
      <section ref={plansRef} id="planos" className="mt-14 w-full max-w-sm scroll-mt-6">
        <h2 className="text-center text-2xl font-black">Escolha seu acesso</h2>
        <div className="mt-5 flex flex-col gap-4">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`glass relative rounded-3xl p-6 text-center ${
                plan.highlight ? "border border-neon-pink/40 shadow-lg" : "border border-white/10"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon-pink/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  <Flame className="mr-1 inline h-3 w-3" />
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-black">{plan.title}</h3>
              <p className="mt-2 text-4xl font-black gradient-text">{plan.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.text}</p>
              <NeonButton onClick={() => handlePlan(plan)} className="mt-5 w-full py-4">
                {plan.cta}
              </NeonButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ TELEGRAM / FALLBACK ============ */}
      <section className="mt-14 w-full max-w-sm text-center">
        <p className="text-sm font-semibold">Prefere falar comigo primeiro? ❤️</p>
        <button
          onClick={go}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white/5 px-5 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white/10"
        >
          <ExternalLink className="h-4 w-4" /> Abrir Telegram
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Se não abrir, procure{" "}
          <span className="font-semibold text-foreground">{TELEGRAM_HANDLE}</span> no Telegram e
          aperte START.
        </p>
        <button
          onClick={copyHandle}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-xs font-bold uppercase tracking-wide"
        >
          <Copy className="h-4 w-4" /> Copiar {TELEGRAM_HANDLE}
        </button>
      </section>

      {/* ============ CTA FIXO ============ */}
      {showStickyCta && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-background via-background/90 to-transparent p-3"
        >
          <div className="mx-auto max-w-sm">
            <button
              onClick={() => scrollTo(plansRef.current)}
              className="btn-neon flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider"
            >
              <Heart className="h-5 w-5 fill-current" /> Ver os planos
            </button>
          </div>
        </motion.div>
      )}

      {/* ============ TOAST ============ */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass fixed bottom-24 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl px-4 py-3 text-center text-sm font-semibold shadow-xl"
        >
          <Check className="mr-1 inline h-4 w-4 text-emerald-400" />
          {toast}
        </motion.div>
      )}
    </main>
  );
}
