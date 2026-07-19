import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/content/faq";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="glass overflow-hidden rounded-2xl"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-semibold">{f.q}</span>
              {isOpen ? <Minus className="h-5 w-5 shrink-0 text-neon-pink" /> : <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
