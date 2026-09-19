import { createFileRoute } from "@tanstack/react-router";

const MISTICPAY_BASE = "https://api.misticpay.com/api";

// O valor de cada plano fica AQUI, no servidor. Nunca vem do navegador.
const PLANS: Record<string, { amount: number; description: string }> = {
  basic: { amount: 7.9, description: "Fernanda da Roça - Acesso" },
  vip: { amount: 17.93, description: "Fernanda da Roça - Acesso VIP" },
};

function isValidCpf(value: unknown) {
  const cpf = String(value ?? "").replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (const t of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += Number(cpf[i]) * (t + 1 - i);
    const digit = ((sum * 10) % 11) % 10;
    if (digit !== Number(cpf[t])) return false;
  }
  return true;
}

export const Route = createFileRoute("/api/public/pix/create")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const id = process.env["MISTICPAY_CLIENT_ID"];
        const secret = process.env["MISTICPAY_CLIENT_SECRET"];
        if (!id || !secret) {
          return Response.json({ error: "Pagamento indisponível no momento." }, { status: 503 });
        }

        const body = (await request.json().catch(() => ({}))) as {
          planId?: string;
          payerName?: string;
          payerDocument?: string;
        };

        const plan = body.planId ? PLANS[body.planId] : undefined;
        if (!plan) return Response.json({ error: "Plano inválido" }, { status: 400 });
        const payerName = String(body.payerName ?? "").trim();
        if (payerName.length < 3) return Response.json({ error: "Informe seu nome completo" }, { status: 400 });
        if (!isValidCpf(body.payerDocument)) return Response.json({ error: "CPF inválido" }, { status: 400 });

        const transactionId = `fer-${body.planId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        try {
          const res = await fetch(`${MISTICPAY_BASE}/transactions/create`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: plan.amount,
              payerName,
              payerDocument: String(body.payerDocument).replace(/\D/g, ""),
              transactionId,
              description: plan.description,
            }),
          });

          const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
          if (!res.ok) {
            const message = (json?.["message"] as string) || (json?.["error"] as string) || "Não foi possível gerar o PIX.";
            return Response.json({ error: message }, { status: res.status });
          }

          const data = ((json?.["data"] as Record<string, unknown>) ?? json) as Record<string, unknown>;
          return Response.json({
            data: {
              transactionId: (data["transactionId"] as string) ?? transactionId,
              qrCodeBase64: data["qrCodeBase64"] ?? "",
              qrcodeUrl: data["qrcodeUrl"] ?? "",
              copyPaste: data["copyPaste"] ?? data["pixCopiaECola"] ?? "",
            },
          });
        } catch {
          return Response.json({ error: "Não foi possível gerar o PIX. Tente novamente." }, { status: 502 });
        }
      },
    },
  },
});
