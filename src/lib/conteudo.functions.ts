import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type GateSession = { unlocked?: boolean; admin?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "vip-gate",
    maxAge: 60 * 60 * 24 * 30,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const unlockArea = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["SITE_PASSWORD"];
    if (!expected || !matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ ...session.data, unlocked: true });
    return { ok: true as const };
  });

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected || !matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ ...session.data, admin: true, unlocked: true });
    return { ok: true as const };
  });

export const getSessionState = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  return { unlocked: !!session.data.unlocked, admin: !!session.data.admin };
});

export const listVideos = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data } = await supabaseAdmin
    .from("videos")
    .select("id, title, storage_path, created_at")
    .order("created_at", { ascending: false });

  const videos = await Promise.all(
    (data ?? []).map(async (v) => {
      const signed = await supabaseAdmin.storage
        .from("conteudo")
        .createSignedUrl(v.storage_path, 60 * 60 * 4);
      return { id: v.id, title: v.title, url: signed.data?.signedUrl ?? "" };
    }),
  );
  return { locked: false as const, videos };
});

export const createUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((data: { filename: string }) => data)
  .handler(async ({ data }) => {
    const session = await useSession<GateSession>(sessionConfig());
    if (!session.data.admin) throw new Error("Não autorizado");

    const safe = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safe}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("conteudo")
      .createSignedUploadUrl(path);
    if (error || !signed) throw new Error("Falha ao preparar o envio");
    return { path, token: signed.token };
  });

export const saveVideo = createServerFn({ method: "POST" })
  .inputValidator((data: { title: string; path: string }) => data)
  .handler(async ({ data }) => {
    const session = await useSession<GateSession>(sessionConfig());
    if (!session.data.admin) throw new Error("Não autorizado");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("videos")
      .insert({ title: data.title, storage_path: data.path });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteVideo = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const session = await useSession<GateSession>(sessionConfig());
    if (!session.data.admin) throw new Error("Não autorizado");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("videos")
      .select("storage_path")
      .eq("id", data.id)
      .maybeSingle();
    if (row) await supabaseAdmin.storage.from("conteudo").remove([row.storage_path]);
    await supabaseAdmin.from("videos").delete().eq("id", data.id);
    return { ok: true as const };
  });
