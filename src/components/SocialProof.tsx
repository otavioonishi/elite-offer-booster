import { Star, Users, ShieldCheck, Zap, CircleDot } from "lucide-react";
import { siteContent } from "@/content/site";

export function SocialProof() {
  const s = siteContent.home.stats;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <CircleDot className="h-3 w-3 animate-pulse text-emerald-400" />
          <span className="font-semibold"><span className="text-emerald-400">{s.online.toLocaleString("pt-BR")}</span> online agora</span>
        </div>
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="font-semibold">{s.members} membros</span>
        </div>
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          ))}</div>
          <span className="font-semibold">{s.rating}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs">
        {siteContent.home.badges.map((b, i) => (
          <div key={b} className="glass flex items-center gap-1.5 rounded-full px-3 py-1 text-muted-foreground">
            {i === 0 && <Zap className="h-3 w-3 text-neon-pink" />}
            {i === 1 && <ShieldCheck className="h-3 w-3 text-emerald-400" />}
            {i === 2 && <Star className="h-3 w-3 text-yellow-400" />}
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
