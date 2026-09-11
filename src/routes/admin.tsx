import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Upload, Trash2, FolderOpen, Send } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { supabase } from "@/integrations/supabase/client";
import {
  createUploadUrl,
  deleteVideo,
  getSessionState,
  listVideos,
  saveVideo,
  unlockAdmin,
} from "@/lib/conteudo.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Painel de Envio de Vídeos" },
      { name: "description", content: "Painel privado para enviar e organizar os vídeos da área de conteúdo." },
      { property: "og:title", content: "Painel de Envio" },
      { property: "og:description", content: "Painel privado de envio de vídeos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Video = { id: string; title: string; url: string };

function AdminPage() {
  const login = useServerFn(unlockAdmin);
  const state = useServerFn(getSessionState);
  const load = useServerFn(listVideos);
  const makeUrl = useServerFn(createUploadUrl);
  const save = useServerFn(saveVideo);
  const remove = useServerFn(deleteVideo);

  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const refresh = async () => setVideos((await load({})).videos);

  useEffect(() => {
    state({}).then(async (s) => {
      setIsAdmin(s.admin);
      if (s.admin) await refresh();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await login({ data: { password } });
    if (res.ok) {
      setIsAdmin(true);
      setError("");
      await refresh();
    } else setError("Senha incorreta");
  }

  async function onSendFile() {
    if (!file) return setStatus("Escolha um arquivo primeiro.");
    try {
      setSending(true);
      setStatus("Enviando arquivo…");
      const { path, token } = await makeUrl({ data: { filename: file.name } });
      const { error: upErr } = await supabase.storage
        .from("conteudo")
        .uploadToSignedUrl(path, token, file);
      if (upErr) throw new Error(upErr.message);
      setUploadedPath(path);
      setStatus("Arquivo enviado! Agora clique em Publicar vídeo.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Erro no envio");
    } finally {
      setSending(false);
    }
  }

  async function onPublish() {
    if (!uploadedPath) return setStatus("Envie o arquivo antes de publicar.");
    if (!title.trim()) return setStatus("Escreva um título.");
    try {
      setSending(true);
      await save({ data: { title: title.trim(), path: uploadedPath } });
      setTitle("");
      setFile(null);
      setUploadedPath(null);
      setStatus("Vídeo publicado na área do cliente!");
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Erro ao publicar");
    } finally {
      setSending(false);
    }
  }


  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <form onSubmit={onLogin} className="glass-strong w-full max-w-sm rounded-3xl p-8 text-center">
          <h1 className="mb-6 text-2xl font-black">Painel privado</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha do painel"
            className="mb-3 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center outline-none focus:border-white/30"
          />
          {error && <p className="mb-3 text-sm text-neon-pink">{error}</p>}
          <NeonButton type="submit" className="w-full">Entrar</NeonButton>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-14">
      <h1 className="mb-8 text-3xl font-black">Enviar <span className="gradient-text">conteúdo</span></h1>

      <div className="glass mb-10 rounded-3xl p-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do vídeo"
          className="mb-4 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 outline-none focus:border-white/30"
        />

        <input
          id="video-file"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setUploadedPath(null);
            setStatus("");
          }}
        />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label
            htmlFor="video-file"
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10"
          >
            <FolderOpen className="h-5 w-5" /> Escolher arquivo
          </label>
          <button
            type="button"
            onClick={onSendFile}
            disabled={!file || sending || !!uploadedPath}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10 disabled:opacity-40"
          >
            <Upload className="h-5 w-5" /> Enviar arquivo
          </button>
        </div>

        <p className="mb-4 truncate text-center text-xs text-muted-foreground">
          {uploadedPath ? "Arquivo enviado ✓" : file ? file.name : "Nenhum arquivo escolhido"}
        </p>

        <NeonButton type="button" onClick={onPublish} className="w-full">
          <Send className="h-5 w-5" /> Publicar vídeo
        </NeonButton>
        {status && <p className="mt-3 text-center text-sm text-muted-foreground">{status}</p>}
      </div>

      <div className="space-y-4">
        {videos.map((v) => (
          <div key={v.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-4">
            <span className="font-bold">{v.title}</span>
            <button
              onClick={async () => { await remove({ data: { id: v.id } }); await refresh(); }}
              className="text-muted-foreground hover:text-neon-pink"
              aria-label="Excluir vídeo"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </main>

  );
}
