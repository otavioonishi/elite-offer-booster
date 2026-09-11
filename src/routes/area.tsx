import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { listVideos } from "@/lib/conteudo.functions";
import VideoCard from "@/components/VideoCard";

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

function Skeletons() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="glass rounded-3xl p-3 sm:p-4">
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted/50" />
          <div className="mx-auto mt-3 h-4 w-1/2 animate-pulse rounded bg-muted/50" />
        </div>
      ))}
    </div>
  );
}

function AreaPage() {
  const load = useServerFn(listVideos);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = useCallback(() => {
    setLoading(true);
    setError("");
    load({})
      .then((res) => setVideos(res.videos))
      .catch(() => setError("Não foi possível carregar os vídeos agora."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black sm:text-4xl">
          Seu <span className="gradient-text">conteúdo</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Assista quando quiser. O link é o seu acesso — guarde-o.
        </p>
        {!loading && !error && videos.length > 0 && (
          <p className="mt-2 text-sm font-semibold">
            {videos.length} {videos.length === 1 ? "vídeo liberado" : "vídeos liberados"}
          </p>
        )}
      </header>

      {loading && <Skeletons />}

      {!loading && error && (
        <div className="glass mx-auto max-w-md rounded-3xl p-6 text-center">
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={fetchVideos}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-bold"
          >
            <RefreshCw className="h-4 w-4" /> Tentar de novo
          </button>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="glass mx-auto max-w-md rounded-3xl p-6 text-center">
          <p className="font-bold">Nenhum vídeo publicado ainda</p>
          <p className="mt-1 text-sm text-muted-foreground">Volte em breve — o conteúdo aparece aqui automaticamente.</p>
          <button
            onClick={fetchVideos}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-bold"
          >
            <RefreshCw className="h-4 w-4" /> Atualizar
          </button>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <VideoCard key={v.id} title={v.title} url={v.url} />
          ))}
        </div>
      )}
    </main>
  );
}
