import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { listVideos, unlockArea } from "@/lib/conteudo.functions";

export const Route = createFileRoute("/area")({
  component: AreaPage,
  head: () => ({
    meta: [
      { title: "Área de Conteúdo — Acesso Liberado" },
      { name: "description", content: "Área privada de conteúdo. Digite a senha recebida para assistir aos vídeos liberados." },
      { property: "og:title", content: "Área de Conteúdo" },
      { property: "og:description", content: "Área privada com os vídeos liberados para membros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Video = { id: string; title: string; url: string };

function AreaPage() {
  const load = useServerFn(listVideos);
  const unlock = useServerFn(unlockArea);
  const [videos, setVideos] = useState<Video[]>([]);
  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const res = await load({});
    setLocked(res.locked);
    setVideos(res.videos);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await unlock({ data: { password } });
    if (res.ok) {
      setError(false);
      await refresh();
    } else setError(true);
  }

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center text-muted-foreground">Carregando…</main>;
  }

  if (locked) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <form onSubmit={onSubmit} className="glass-strong w-full max-w-sm rounded-3xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-black">Área de Conteúdo</h1>
          <p className="mb-6 text-sm text-muted-foreground">Digite a senha que você recebeu para liberar os vídeos.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            className="mb-3 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center outline-none focus:border-white/30"
          />
          {error && <p className="mb-3 text-sm text-neon-pink">Senha incorreta</p>}
          <NeonButton type="submit" className="w-full">Entrar</NeonButton>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-14">
      <h1 className="mb-8 text-center text-3xl font-black sm:text-4xl">Seu <span className="gradient-text">conteúdo</span></h1>
      {videos.length === 0 && (
        <p className="text-center text-muted-foreground">Nenhum vídeo publicado ainda. Volte em breve.</p>
      )}
      <div className="grid gap-8 sm:grid-cols-2">
        {videos.map((v) => (
          <div key={v.id} className="glass rounded-3xl p-4">
            <video src={v.url} controls playsInline className="w-full rounded-2xl" />
            <p className="mt-3 text-center font-bold">{v.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
