import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

type GateSession = { unlocked?: boolean; admin?: boolean };

const passwordSchema = z.object({ password: z.string().min(1).max(200) });
const filenameSchema = z.object({
  filename: z.string().trim().min(1).max(180),
  adminToken: z.string().min(1).max(300),
});
const videoSchema = z.object({
  title: z.string().trim().min(1).max(120),
  path: z.string().regex(/^[a-f0-9-]{36}-[a-zA-Z0-9._-]{1,180}$/),
  adminToken: z.string().min(1).max(300),
});
const pathSchema = z.object({
  path: z.string().regex(/^[a-f0-9-]{36}-[a-zA-Z0-9._-]{1,180}$/),
  adminToken: z.string().min(1).max(300),
});
const idSchema = z.object({ id: z.string().uuid(), adminToken: z.string().min(1).max(300) });
const sessionStateSchema = z.object({ adminToken: z.string().max(300).optional() });

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "vip-gate",
    maxAge: 60 * 60 * 24 * 30,
    cookie: {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

const FALLBACK_TOKEN_SECRET = "vip-area-admin-token-secret-2026";

function tokenSecret() {
  return process.env["SESSION_SECRET"] || FALLBACK_TOKEN_SECRET;
}

function createAdminToken() {
  const secret = tokenSecret();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const signature = createHmac("sha256", secret).update(String(expiresAt)).digest("hex");
  return `${expiresAt}.${signature}`;
}

function isValidAdminToken(token?: string) {
  const secret = tokenSecret();
  if (!token) return false;
  const [expiresAtText, signature] = token.split(".");
  const expiresAt = Number(expiresAtText);
  if (!expiresAtText || !signature || !Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = createHmac("sha256", secret).update(expiresAtText).digest("hex");
  const givenBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return givenBuffer.length === expectedBuffer.length && timingSafeEqual(givenBuffer, expectedBuffer);
}

export const unlockArea = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => passwordSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["SITE_PASSWORD"];
    if (!expected || !matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ ...session.data, unlocked: true });
    return { ok: true as const };
  });

const ADMIN_PASSWORD_FIXED = "13vidente@";

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => passwordSchema.parse(data))
  .handler(async ({ data }) => {
    const given = data.password.trim().toLowerCase();
    if (!matches(given, ADMIN_PASSWORD_FIXED)) return { ok: false as const };
    return { ok: true as const, adminToken: createAdminToken() };
  });

export const getSessionState = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => sessionStateSchema.parse(data))
  .handler(async ({ data }) => ({ unlocked: true, admin: isValidAdminToken(data.adminToken) }));

export const listVideos = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("videos")
    .select("id, title, storage_path, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Não foi possível carregar os vídeos");

  const videos = await Promise.all(
    (data ?? []).map(async (v) => {
      const { data: signed, error: signedError } = await supabaseAdmin.storage
        .from("conteudo")
        .createSignedUrl(v.storage_path, 60 * 60 * 4);
      if (signedError || !signed?.signedUrl) return null;
      return { id: v.id, title: v.title, url: signed.signedUrl };
    }),
  );
  return { locked: false as const, videos: videos.filter((video) => video !== null) };
});

export const createUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => filenameSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isValidAdminToken(data.adminToken)) return { ok: false as const, error: "unauthorized" as const };

    const safe = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-180);
    const path = `${crypto.randomUUID()}-${safe}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("conteudo")
      .createSignedUploadUrl(path);
    if (error || !signed) throw new Error("Falha ao preparar o envio");
    return { ok: true as const, path, token: signed.token };
  });

export const saveVideo = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => videoSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isValidAdminToken(data.adminToken)) return { ok: false as const, error: "unauthorized" as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("videos")
      .insert({ title: data.title, storage_path: data.path });
    if (error) {
      await supabaseAdmin.storage.from("conteudo").remove([data.path]);
      throw new Error("Não foi possível publicar o vídeo");
    }
    return { ok: true as const };
  });

export const discardUpload = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => pathSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isValidAdminToken(data.adminToken)) return { ok: false as const, error: "unauthorized" as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("conteudo").remove([data.path]);
    if (error) throw new Error("Não foi possível limpar o envio anterior");
    return { ok: true as const };
  });

export const deleteVideo = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isValidAdminToken(data.adminToken)) return { ok: false as const, error: "unauthorized" as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error: findError } = await supabaseAdmin
      .from("videos")
      .select("storage_path")
      .eq("id", data.id)
      .maybeSingle();
    if (findError || !row) throw new Error("Vídeo não encontrado");
    const { error: deleteError } = await supabaseAdmin.from("videos").delete().eq("id", data.id);
    if (deleteError) throw new Error("Não foi possível excluir o vídeo");
    await supabaseAdmin.storage.from("conteudo").remove([row.storage_path]);
    return { ok: true as const };
  });
