import { motion } from "framer-motion";
import { Infinity as InfIcon, Ban, Smartphone, Users } from "lucide-react";
import { whyChoose } from "@/content/benefits";

const icons = { Infinity: InfIcon, Ban, Smartphone, Users } as const;

export function WhyChoose() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {whyChoose.map((item, i) => {
        const Icon = icons[item.icon as keyof typeof icons];
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center"
          >
            <div className="rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 p-3">
              <Icon className="h-6 w-6 text-neon-pink" />
            </div>
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
