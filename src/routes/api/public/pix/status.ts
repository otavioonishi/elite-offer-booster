import { createFileRoute } from "@tanstack/react-router";

const MISTICPAY_BASE = "https://api.misticpay.com/api";

export const Route = createFileRoute("/api/public/pix/status")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const id = process.env["MISTICPAY_CLIENT_ID"];
        const secret = process.env["MISTICPAY_CLIENT_SECRET"];
        if (!id || !secret) {
          return Response.json({ error: "Pagamento indisponível no momento." }, { status: 503 });
        }

        const body = (await request.json().catch(() => ({}))) as { transactionId?: string };
        if (!body.transactionId) {
          return Response.json({ error: "transactionId obrigatório" }, { status: 400 });
        }

        try {
          const res = await fetch(`${MISTICPAY_BASE}/transactions/check`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ transactionId: body.transactionId }),
          });
          const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
          return Response.json(json, { status: res.ok ? 200 : res.status });
        } catch {
          return Response.json({ error: "Não foi possível verificar o pagamento." }, { status: 502 });
        }
      },
    },
  },
});
