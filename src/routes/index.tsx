import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import { useState } from "react";
import { NeonButton } from "@/components/ui/NeonButton";
import { openTelegram, openTelegramWeb } from "@/lib/telegram";
import heroImage from "@/assets/hero-new.png";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Fer da Roça — Fala comigo no Telegram" },
      {
        name: "description",
        content:
          "Quer me conhecer melhor? Toque no botão e venha conversar comigo no Telegram agora mesmo.",
      },
      { property: "og:title", content: "Fer da Roça — Fala comigo no Telegram" },
      {
        property: "og:description",
        content: "Vem conversar comigo no Telegram. É só tocar no botão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const [showFallback, setShowFallback] = useState(false);

  const go = () => openTelegram(() => setShowFallback(true));

  return (
    <main className="relative flex min-h-screen flex-col items-center px-4 pb-32 pt-8 sm:justify-center">
      {/* fundo quente e suave */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[50vh] w-[60vh] -translate-x-1/2 rounded-full bg-[oklch(0.72_0.08_60_/_0.18)] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full bg-neon-pink/10 blur-[120px]" />
      </div>

      {/* Foto da Fernanda */}
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
          className="aspect-[3/4] w-full select-none rounded-[2rem] object-cover object-top shadow-2xl"
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 max-w-md text-center text-3xl font-black leading-tight sm:text-4xl"
      >
        Quer me conhecer melhor? 👀❤️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-3 max-w-sm text-center text-base text-muted-foreground"
      >
        Vem conversar comigo no Telegram.
      </motion.p>

      {/* CTA principal */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 w-full max-w-sm"
      >
        <NeonButton size="xl" onClick={go} className="w-full py-6 text-lg">
          <Heart className="h-5 w-5 fill-current" /> FALAR COM A FER
        </NeonButton>
      </motion.div>

      {/* Alternativa */}
      <div className="mt-6 w-full max-w-sm text-center">
        {showFallback ? (
          <div className="glass rounded-2xl p-4">
            <p className="text-sm font-semibold">Não abriu o Telegram?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Toque abaixo ou procure @ferdarocabot no Telegram.
            </p>
            <button
              onClick={openTelegramWeb}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold uppercase tracking-wide"
            >
              <ExternalLink className="h-4 w-4" /> Abrir Telegram
            </button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Ou procure <span className="font-semibold text-foreground">@ferdarocabot</span> no
            Telegram e aperte START ❤️
          </p>
        )}
      </div>

      {/* Botão fixo no rodapé */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-background via-background/90 to-transparent p-3">
        <div className="mx-auto max-w-sm">
          <button
            onClick={go}
            className="btn-neon animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider"
          >
            <Heart className="h-5 w-5 fill-current" /> Falar com a Fer
          </button>
        </div>
      </div>
    </main>
  );
}
