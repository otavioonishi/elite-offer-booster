import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="glass rounded-2xl p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-pink font-bold text-white">
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm">{t.name}</span>
                {t.verified && <BadgeCheck className="h-4 w-4 text-sky-400" />}
              </div>
              <span className="text-xs text-muted-foreground">{t.location}</span>
            </div>
          </div>
          <div className="mb-2 flex">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
        </motion.div>
      ))}
    </div>
  );
}
