import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { siteContent } from "@/content/site";

export function FloatingCTA({ targetId = "checkout" }: { targetId?: string }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4"
    >
      <div className="mx-auto max-w-2xl">
        <a
          href={`#${targetId}`}
          className="btn-neon animate-pulse-glow flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider sm:text-base"
        >
          <Lock className="h-5 w-5" />
          {siteContent.sales.floatingCta}
        </a>
      </div>
    </motion.div>
  );
}
