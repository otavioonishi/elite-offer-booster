import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Sparkles } from "lucide-react";
import { NeonButton } from "./ui/NeonButton";
import previewVideo from "@/assets/preview.mp4.asset.json";

export function LockedVideo({ onUnlock }: { onUnlock: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => setOpen(true)}
        className="group relative mx-auto block w-full max-w-md overflow-hidden rounded-3xl border border-white/10"
      >
        <video
          src={previewVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2">
          <div className="glass-strong rounded-full p-3 group-hover:animate-pulse-glow">
            <Lock className="h-6 w-6 text-neon-pink" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">
            Prévia exclusiva
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-md rounded-3xl p-8 text-center"
            >
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">Conteúdo Bloqueado</h3>
              <p className="mb-6 text-muted-foreground">
                Este conteúdo é exclusivo para membros VIP. Desbloqueie o acesso completo agora e veja tudo sem restrições.
              </p>
              <NeonButton onClick={() => { setOpen(false); onUnlock(); }} className="w-full">
                <Sparkles className="h-5 w-5" /> Desbloquear Agora
              </NeonButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
