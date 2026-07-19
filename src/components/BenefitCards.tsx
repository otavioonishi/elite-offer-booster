import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Monitor, ShieldCheck, Headphones } from "lucide-react";
import { benefits } from "@/content/benefits";

const icons = { Sparkles, RefreshCw, Monitor, ShieldCheck, Headphones } as const;

export function BenefitCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {benefits.map((b, i) => {
        const Icon = icons[b.icon as keyof typeof icons];
        return (
          <motion.article
            key={b.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass group relative overflow-hidden rounded-3xl p-6"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink shadow-lg">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
