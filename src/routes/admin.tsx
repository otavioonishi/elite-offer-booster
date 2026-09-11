import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Upload, Trash2, FolderOpen, Send, LoaderCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  createUploadUrl,
  deleteVideo,
  discardUpload,
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
const MAX_FILE_SIZE = 200 * 1024 * 1024;

function AdminPage() {
  const login = useServerFn(unlockAdmin);
  const state = useServerFn(getSessionState);
  const load = useServerFn(listVideos);
  const makeUrl = useServerFn(createUploadUrl);
  const save = useServerFn(saveVideo);
  const remove = useServerFn(deleteVideo);

  const discard = useServerFn(discardUpload);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);


  const handleAuthError = (err: unknown, fallback: string) => {
    const message = err instanceof Error ? err.message : fallback;
    if (message.toLowerCase().includes("autorizado")) {
      setIsAdmin(false);
      setError("Sua sessão expirou. Entre novamente.");
      return "Sua sessão expirou. Entre novamente.";
    }
    return fallback;
  };

  const refresh = async () => {
    try {
      setLoadingVideos(true);
      setVideos((await load({})).videos);
    } catch {
      setStatus("Não foi possível atualizar a lista de vídeos.");
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    state({})
      .then(async (s) => {
        setIsAdmin(s.admin);
        if (s.admin) await refresh();
      })
      .catch(() => setIsAdmin(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return setError("Digite a senha do painel.");
    try {
      setSending(true);
      const res = await login({ data: { password } });
      if (!res.ok) return setError("Senha incorreta.");
      setIsAdmin(true);
      setPassword("");
      setError("");
      await refresh();
    } catch {
      setError("Não foi possível entrar agora. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  async function onChooseFile(selected: File | null) {
    if (!selected) return;
    if (!selected.type.startsWith("video/")) {
      setFile(null);
      return setStatus("Escolha um arquivo de vídeo.");
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFile(null);
      return setStatus("O vídeo deve ter no máximo 200 MB.");
    }
    if (uploadedPath) {
      try { await discard({ data: { path: uploadedPath } }); } catch { /* arquivo temporário expira sem publicação */ }
    }
    setFile(selected);
    setUploadedPath(null);
    setStatus("Arquivo escolhido. Agora clique em Enviar arquivo.");
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
      setStatus(handleAuthError(err, "Não foi possível enviar o arquivo. Tente novamente."));
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
      setStatus(handleAuthError(err, "Não foi possível publicar o vídeo. Tente novamente."));
    } finally {
      setSending(false);
    }
  }

  async function onDelete(video: Video) {
    if (!window.confirm(`Excluir “${video.title}”?`)) return;
    try {
      setDeletingId(video.id);
      setStatus("");
      await remove({ data: { id: video.id } });
      setVideos((current) => current.filter((item) => item.id !== video.id));
      setStatus("Vídeo excluído.");
    } catch (err) {
      setStatus(handleAuthError(err, "Não foi possível excluir o vídeo."));
    } finally {
      setDeletingId(null);
    }
  }

  if (isAdmin === null) {
    return <main className="flex min-h-screen items-center justify-center"><LoaderCircle className="h-7 w-7 animate-spin text-muted-foreground" aria-label="Carregando painel" /></main>;
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
          <NeonButton type="submit" disabled={sending} className="w-full">
            {sending && <LoaderCircle className="h-5 w-5 animate-spin" />} Entrar
          </NeonButton>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-14">
      <header className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black">Enviar <span className="gradient-text">conteúdo</span></h1>
        <Button type="button" variant="outline" size="icon" onClick={refresh} disabled={loadingVideos} aria-label="Atualizar vídeos" title="Atualizar vídeos">
          <RefreshCw className={loadingVideos ? "animate-spin" : ""} />
        </Button>
      </header>

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
          disabled={sending}
          onChange={(e) => void onChooseFile(e.target.files?.[0] ?? null)}
        />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label
            htmlFor="video-file"
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10"
          >
            <FolderOpen className="h-5 w-5" /> Escolher arquivo
          </label>
          <Button
            type="button"
            onClick={onSendFile}
            disabled={!file || sending || !!uploadedPath}
            variant="outline"
            className="h-auto flex-1 rounded-full px-5 py-3 font-bold"
          >
            {sending && !uploadedPath ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />} Enviar arquivo
          </Button>
        </div>

        <p className="mb-4 truncate text-center text-xs text-muted-foreground">
          {uploadedPath ? "Arquivo enviado ✓" : file ? file.name : "Nenhum arquivo escolhido"}
        </p>

        <NeonButton type="button" onClick={onPublish} disabled={!uploadedPath || sending} className="w-full">
          {sending && uploadedPath ? <LoaderCircle className="h-5 w-5 animate-spin" /> : uploadedPath ? <CheckCircle2 className="h-5 w-5" /> : <Send className="h-5 w-5" />} Publicar vídeo
        </NeonButton>
        {status && <p className="mt-3 text-center text-sm text-muted-foreground">{status}</p>}
      </div>

      <div className="space-y-4">
        {!loadingVideos && videos.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">Nenhum vídeo publicado.</p>}
        {videos.map((v) => (
          <div key={v.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-4">
            <span className="font-bold">{v.title}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={deletingId === v.id}
              onClick={() => void onDelete(v)}
              aria-label="Excluir vídeo"
            >
              {deletingId === v.id ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
            </Button>
          </div>
        ))}
      </div>
    </main>

  );
}
