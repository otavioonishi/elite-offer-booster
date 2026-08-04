import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Zap, CreditCard, Copy, CheckCircle2 } from "lucide-react";
import { NeonButton } from "./ui/NeonButton";
import { siteContent } from "@/content/site";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const TELEGRAM_LINK = "https://t.me/+X7bYcV9ObZ85YmFh";
const WHATSAPP_LINK = "https://chat.whatsapp.com/Bu4dargEdHZ71suoIKZclT";


type PixData = {
  transactionId: string;
  qrCodeBase64: string;
  copyPaste: string;
};

type Plan = (typeof siteContent.sales.plans)[number];

export function Checkout() {
  const [step, setStep] = useState<"plan" | "form" | "pix" | "paid">("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pix, setPix] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const plans = siteContent.sales.plans;

  const handleSelectPlan = (plan: Plan) => {
    if (plan.amount === 0) {
      window.location.href = WHATSAPP_LINK;
      return;
    }
    setSelectedPlan(plan);
    setStep("form");
  };


  const handleCreatePix = async () => {
    setError(null);

    if (!selectedPlan) {
      setError("Selecione um plano antes de continuar.");
      return;
    }

    const cleanDoc = document.replace(/\D/g, "");
    if (!name.trim() || cleanDoc.length !== 11) {
      setError("Preencha nome completo e um CPF válido (11 dígitos).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/create-pix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payerName: name,
          payerDocument: cleanDoc,
          amount: selectedPlan.amount,
          description: `${selectedPlan.name} - Mentoria`,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Não foi possível gerar o PIX. Tente novamente.");
        setLoading(false);
        return;
      }

      setPix({
        transactionId: json.data.transactionId,
        qrCodeBase64: json.data.qrCodeBase64,
        copyPaste: json.data.copyPaste,
      });
      setStep("pix");
    } catch (err) {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Verifica o pagamento a cada 5 segundos
  useEffect(() => {
    if (step !== "pix" || !pix) return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/api/check-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId: pix.transactionId }),
        });
        const json = await res.json();
        if (json?.transaction?.transactionState === "COMPLETO") {
          setStep("paid");
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // silencioso — tenta de novo no próximo ciclo
      }
    }, 5000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [step, pix]);

  // Redireciona pro Telegram assim que o pagamento é confirmado
  useEffect(() => {
    if (step !== "paid") return;

    const timer = setTimeout(() => {
      window.location.href = TELEGRAM_LINK;
    }, 2500); // 2.5s pra mostrar a mensagem de sucesso antes de redirecionar

    return () => clearTimeout(timer);
  }, [step]);

  const handleCopy = () => {
    if (!pix) return;
    navigator.clipboard.writeText(pix.copyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="checkout" className="py-20">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-pink/10" />
          <div className="relative">
            {step === "plan" && (
              <>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
                  <Zap className="h-3 w-3" /> Oferta por tempo limitado
                </div>
                <h3 className="mb-2 text-2xl sm:text-3xl font-black">Escolha seu plano</h3>
                <p className="mb-6 text-sm text-muted-foreground">Pagamento único • Sem mensalidade</p>

                <div className="flex flex-col gap-4">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-neon-purple hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-black">{plan.name}</h4>
                          <p className="text-xs text-muted-foreground">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs text-muted-foreground line-through">
                            {plan.original}
                          </span>
                          <span className="block text-2xl font-black gradient-text">
                            {plan.current}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === "form" && selectedPlan && (
              <>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
                  <Zap className="h-3 w-3" /> Oferta por tempo limitado
                </div>
                <h3 className="mb-2 text-2xl sm:text-3xl font-black">{selectedPlan.name}</h3>
                <p className="mb-6 text-sm text-muted-foreground">Pagamento único • Sem mensalidade</p>

                <div className="mb-6 flex flex-col items-center">
                  <span className="text-sm text-muted-foreground line-through">
                    De {selectedPlan.original}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black gradient-text">
                      {selectedPlan.current}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("plan")}
                  className="mb-4 text-xs text-muted-foreground underline hover:text-white"
                >
                  Trocar plano
                </button>

                <div className="mb-4 flex flex-col gap-3 text-left">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-neon-purple"
                  />
                  <input
                    type="text"
                    placeholder="CPF (somente números)"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    maxLength={14}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-neon-purple"
                  />
                </div>

                {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

                <NeonButton
                  size="xl"
                  onClick={handleCreatePix}
                  disabled={loading}
                  className="w-full"
                >
                  <Lock className="h-5 w-5" /> {loading ? "Gerando PIX..." : siteContent.sales.ctaPrimary}
                </NeonButton>
              </>
            )}

            {step === "pix" && pix && selectedPlan && (
              <>
                <h3 className="mb-2 text-2xl font-black">Escaneie o QR Code para pagar</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Valor: <strong className="gradient-text">R$ {selectedPlan.amount.toFixed(2)}</strong>
                </p>

                <img
                  src={pix.qrCodeBase64}
                  alt="QR Code PIX"
                  className="mx-auto mb-6 h-56 w-56 rounded-xl bg-white p-2"
                />

                <button
                  onClick={handleCopy}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado!" : "Copiar código Pix"}
                </button>

                <p className="text-xs text-muted-foreground animate-pulse">
                  Aguardando confirmação do pagamento...
                </p>
              </>
            )}

            {step === "paid" && (
              <>
                <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-400" />
                <h3 className="mb-2 text-2xl font-black">Pagamento confirmado!</h3>
                <p className="text-sm text-muted-foreground">
                  Seu acesso VIP foi liberado. Você será redirecionado para o Telegram em instantes...
                </p>
              </>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Compra 100% segura</span>
              <span className="inline-flex items-center gap-1"><CreditCard className="h-4 w-4 text-sky-400" /> Pix</span>
              <span className="inline-flex items-center gap-1"><Zap className="h-4 w-4 text-yellow-400" /> Acesso imediato</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}