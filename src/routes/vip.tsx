import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { siteContent } from "@/content/site";
import { LockedVideo } from "@/components/LockedVideo";
import { BenefitCards } from "@/components/BenefitCards";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Checkout } from "@/components/Checkout";
import { FloatingCTA } from "@/components/FloatingCTA";
import { NeonButton } from "@/components/ui/NeonButton";
import { SocialProof } from "@/components/SocialProof";

export const Route = createFileRoute("/vip")({
  component: VipPage,
  head: () => ({
    meta: [
      { title: "Desbloqueie o Acesso VIP — Conteúdo Exclusivo" },
      { name: "description", content: "Acesso vitalício ao acervo premium. Mais de 2500 conteúdos exclusivos, atualizações semanais, 100% anônimo. Desbloqueie agora." },
      { property: "og:title", content: "Desbloqueie o Acesso VIP" },
      { property: "og:description", content: "Acervo premium exclusivo. Acesso vitalício com garantia de 7 dias." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/vip" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/vip" }],
  }),
});

function VipPage() {
  const s = siteContent.sales;
  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden pb-28">
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-12 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[60vh] w-[80vh] -translate-x-1/2 rounded-full bg-neon-purple/25 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3 text-neon-pink" /> Acesso Restrito
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-3xl font-black leading-tight sm:text-5xl md:text-6xl"
          >
            {s.headline.split(".")[0]}. <span className="gradient-text">{s.headline.split(".").slice(1).join(".").trim()}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-muted-foreground"
          >
            {s.subheadline}
          </motion.p>
          <div className="mb-8 flex justify-center">
            <NeonButton size="xl" onClick={scrollToCheckout}>
              <Lock className="h-5 w-5" /> {s.ctaPrimary}
            </NeonButton>
          </div>
          <SocialProof />
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl sm:text-4xl font-black">Prévia do acervo</h2>
            <p className="text-sm text-muted-foreground">Toque no vídeo para desbloquear</p>
          </div>
          <LockedVideo onUnlock={scrollToCheckout} />
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl sm:text-4xl font-black">O que você <span className="gradient-text">recebe</span></h2>
            <p className="text-sm text-muted-foreground">Tudo isso com pagamento único e acesso vitalício</p>
          </div>
          <BenefitCards />
        </div>
      </section>

      {/* Why choose */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl sm:text-4xl font-black">Por que escolher <span className="gradient-text">este acesso</span></h2>
          </div>
          <WhyChoose />
        </div>
      </section>

      {/* Repeat CTA */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <NeonButton size="xl" onClick={scrollToCheckout}>
            <Lock className="h-5 w-5" /> Quero Desbloquear Agora
          </NeonButton>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl sm:text-4xl font-black">Mais de <span className="gradient-text">18.000 membros</span> satisfeitos</h2>
            <p className="text-sm text-muted-foreground">Avaliações reais de quem já desbloqueou</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Checkout */}
      <Checkout />

      {/* FAQ */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl sm:text-4xl font-black">Perguntas <span className="gradient-text">frequentes</span></h2>
          </div>
          <FAQ />
        </div>
      </section>

      <FloatingCTA />
    </main>
  );
}
