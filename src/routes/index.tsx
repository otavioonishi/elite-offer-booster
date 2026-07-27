import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/content/site";
import { SocialProof } from "@/components/SocialProof";
import { NeonButton } from "@/components/ui/NeonButton";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "VIP Access — Conteúdo Exclusivo para Poucos" },
      { name: "description", content: "Entre no círculo restrito. Acesso VIP a conteúdo premium exclusivo. Milhares de membros. Acesso imediato e discreto." },
      { property: "og:title", content: "VIP Access — Conteúdo Exclusivo" },
      { property: "og:description", content: "O acesso que ninguém quer que você tenha. Entre agora no círculo restrito." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const navigate = useNavigate();
  const c = siteContent.home;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-neon-pink/15 blur-[120px]" />
      </div>

      {/* Badge / tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-pink" />
        {siteContent.brand.tagline}
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8 w-full max-w-md aspect-[9/16]"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-neon-purple to-neon-pink blur-3xl opacity-40" />
        <img
          src={heroAsset.url}
          alt="Preview exclusivo"
          className="w-full h-full object-cover rounded-[2rem] shadow-2xl pointer-events-none select-none"
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3 max-w-2xl text-center text-3xl font-black leading-tight sm:text-5xl"
      >
        {c.headline.split(" ").slice(0, -3).join(" ")}{" "}
        <span className="gradient-text">
          {c.headline.split(" ").slice(-3).join(" ")}
        </span>
      </motion.h1>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <NeonButton size="xl" onClick={() => navigate({ to: "/vip" })}>
          {c.cta} <ArrowRight className="h-5 w-5" />
        </NeonButton>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <SocialProof />
      </motion.div>
    </main>
  );
}