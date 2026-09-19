import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, Send, X } from "lucide-react";
import { API_URL, CHECKOUT_UNAVAILABLE_MESSAGE, plans } from "@/config/checkout";
import { openTelegram, trackEvent } from "@/lib/telegram";

type Plan = (typeof plans)[number];

type PixData = { transactionId: string; qrCode: string; copyPaste: string };

type Props = { plan: Plan; onClose: () => void };

const POLL_MS = 8000;
const EXPIRES_MS = 30 * 60 * 1000;

export function maskCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function isValidCpf(value: string) {
  const cpf = value.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (const t of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += Number(cpf[i]) * (t + 1 - i);
    const digit = ((sum * 10) % 11) % 10;
    if (digit !== Number(cpf[t])) return false;
  }
  return true;
}

export function PixCheckout({ plan, onClose }: Props) {
  const [step, setStep] = useState<"form" | "pix" | "done">("form");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [expired, setExpired] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pix, setPix] = useState<PixData | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const createPix = useCallback(async () => {
    setError(null);
    setFailed(false);
    setExpired(false);
    if (name.trim().length < 3) { setError("Informe seu nome completo."); return; }
    if (!isValidCpf(cpf)) { setError("CPF inválido."); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/fernanda/create-pix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          payerName: name.trim(),
          payerDocument: cpf.replace(/\D/g, ""),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json?.error || CHECKOUT_UNAVAILABLE_MESSAGE);
        return;
      }
      const d = json?.data ?? {};
      const raw: string = d.qrCodeBase64 || "";
      const qrCode = raw ? (raw.startsWith("data:") ? raw : `data:image/png;base64,${raw}`) : d.qrcodeUrl || "";
      if (!d.transactionId || (!qrCode && !d.copyPaste)) {
        setError(CHECKOUT_UNAVAILABLE_MESSAGE);
        return;
      }
      setPix({ transactionId: d.transactionId, qrCode, copyPaste: d.copyPaste ?? "" });
      startedAt.current = Date.now();
      setStep("pix");
      trackEvent("pix_created", { plan: plan.id });
    } catch {
      setError(CHECKOUT_UNAVAILABLE_MESSAGE);
    } finally {
      setLoading(false);
    }
  }, [cpf, name, plan.id]);

  // Consulta o pagamento a cada 8s, para em 30 minutos.
  useEffect(() => {
    if (step !== "pix" || !pix) return;
    let active = true;
    const timer = window.setInterval(async () => {
      if (Date.now() - startedAt.current > EXPIRES_MS) {
        if (active) { setExpired(true); window.clearInterval(timer); }
        return;
      }
      try {
        const res = await fetch(`${API_URL}/api/check-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId: pix.transactionId }),
        });
        const json = await res.json().catch(() => ({}));
        const state = json?.transaction?.transactionState;
        if (!active) return;
        if (state === "COMPLETO") {
          setStep("done");
          trackEvent("payment_confirmed", { plan: plan.id });
          window.clearInterval(timer);
        } else if (state === "FALHA") {
          setFailed(true);
          window.clearInterval(timer);
        }
      } catch {
        /* tenta de novo no próximo ciclo */
      }
    }, POLL_MS);
    return () => { active = false; window.clearInterval(timer); };
  }, [step, pix, plan.id]);

  const copy = async () => {
    if (!pix?.copyPaste) return;
    try {
      await navigator.clipboard.writeText(pix.copyPaste);
      setCopied(true);
      trackEvent("pix_copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Não foi possível copiar. Selecione o código manualmente.");
    }
  };

  const restart = () => { setPix(null); setStep("form"); setFailed(false); setExpired(false); };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={`Pagamento ${plan.title}`}>
      <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="fdr-rise relative w-full max-w-md rounded-t-3xl border border-border bg-card p-5 pb-8 shadow-2xl sm:rounded-3xl" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {step === "form" && (
          <>
            <h2 className="pr-10 text-xl font-black">{plan.title}</h2>
            <p className="mt-1 text-2xl font-black text-neon-pink">{plan.price}</p>

            <label className="mt-5 block text-sm font-semibold" htmlFor="pix-name">Nome completo</label>
            <input
              id="pix-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
            />

            <label className="mt-4 block text-sm font-semibold" htmlFor="pix-cpf">CPF</label>
            <input
              id="pix-cpf"
              inputMode="numeric"
              autoComplete="off"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              placeholder="000.000.000-00"
              className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
            />
            <p className="mt-2 text-xs text-muted-foreground">Usamos seu CPF apenas para gerar o PIX.</p>

            {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}

            <button
              type="button"
              onClick={() => void createPix()}
              disabled={loading}
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-neon-pink text-base font-black text-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
              {loading ? "Gerando PIX..." : "Gerar PIX"}
            </button>
          </>
        )}

        {step === "pix" && pix && (
          <>
            <h2 className="pr-10 text-xl font-black">Pague com PIX</h2>
            <p className="mt-1 text-sm text-muted-foreground">{plan.title} · <strong className="text-foreground">{plan.price}</strong></p>

            {pix.qrCode && (
              <img src={pix.qrCode} alt="QR Code do PIX" className="mx-auto mt-4 h-56 w-56 rounded-xl bg-white p-2" />
            )}

            <button
              type="button"
              onClick={() => void copy()}
              className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-neon-pink text-base font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
            >
              {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
              {copied ? "Copiado!" : "Copiar código PIX"}
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">No app do seu banco, escolha PIX e depois Pix Copia e Cola.</p>

            {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}

            {expired ? (
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold">O PIX expirou</p>
                <button type="button" onClick={restart} className="mt-2 min-h-12 w-full rounded-full border border-border text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink">Gerar novo PIX</button>
              </div>
            ) : failed ? (
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-red-400">O pagamento não foi concluído.</p>
                <button type="button" onClick={restart} className="mt-2 min-h-12 w-full rounded-full border border-border text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink">Tentar de novo</button>
              </div>
            ) : (
              <p role="status" aria-live="polite" className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Aguardando pagamento...
              </p>
            )}
          </>
        )}

        {step === "done" && (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15">
              <Check className="h-8 w-8 text-emerald-400" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl font-black">Pagamento confirmado</h2>
            <p className="mt-1 text-sm text-muted-foreground">Seu acesso foi liberado.</p>
            <button
              type="button"
              onClick={() => openTelegram()}
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-neon-pink text-base font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink"
            >
              <Send className="h-5 w-5" aria-hidden="true" />Falar no Telegram
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
