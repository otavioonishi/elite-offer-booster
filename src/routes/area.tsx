import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { listVideos } from "@/lib/conteudo.functions";

export const Route = createFileRoute("/area")({
  component: AreaPage,
  head: () => ({
    meta: [
      { title: "Área de Conteúdo — Acesso Liberado" },
      { name: "description", content: "Área de conteúdo com os vídeos liberados para quem recebeu o link." },
      { property: "og:title", content: "Área de Conteúdo" },
      { property: "og:description", content: "Vídeos liberados para membros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Video = { id: string; title: string; url: string };

function AreaPage() {
  const load = useServerFn(listVideos);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load({})
      .then((res) => setVideos(res.videos))
      .catch(() => setError("Não foi possível carregar os vídeos agora."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center text-muted-foreground">Carregando…</main>;
  }

  if (error) {
    return <main className="flex min-h-screen items-center justify-center px-4 text-center text-muted-foreground">{error}</main>;
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
