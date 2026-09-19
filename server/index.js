import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// CORS: defina ALLOWED_ORIGINS (sites separados por vírgula) para liberar só os seus.
// Se não definir, continua liberado para todos, como antes.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
app.use(cors(allowedOrigins.length ? { origin: allowedOrigins } : undefined));
app.use(express.json());

const MISTICPAY_BASE = "https://api.misticpay.com/api";
// Agora guardam a chave de acesso nova: pk_... (ID) e sk_... (segredo).
const CLIENT_ID = process.env.MISTICPAY_CLIENT_ID;
const CLIENT_SECRET = process.env.MISTICPAY_CLIENT_SECRET;

// Autenticação nova (Basic). Os headers ci/cs deixam de funcionar em 30/09/2026.
function misticHeaders() {
  const token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

// Planos da página da Fernanda. O valor é definido AQUI, nunca vem do navegador.
const FERNANDA_PLANS = {
  basic: { amount: 7.9, description: "Fernanda da Roça - Acesso" },
  vip: { amount: 17.93, description: "Fernanda da Roça - Acesso VIP" },
};

function isValidCpf(value) {
  const cpf = String(value || "").replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (const t of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += Number(cpf[i]) * (t + 1 - i);
    const digit = ((sum * 10) % 11) % 10;
    if (digit !== Number(cpf[t])) return false;
  }
  return true;
}

async function createPix({ payerName, payerDocument, amount, description, prefix }) {
  const transactionId = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const response = await fetch(`${MISTICPAY_BASE}/transactions/create`, {
    method: "POST",
    headers: misticHeaders(),
    body: JSON.stringify({
      amount,
      payerName,
      payerDocument: String(payerDocument).replace(/\D/g, ""),
      transactionId,
      description,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("Erro da MisticPay:", response.status, JSON.stringify(data));
  }
  return { ok: response.ok, status: response.status, data };
}

// Endpoint antigo (mentoria). Comportamento mantido.
app.post("/api/create-pix", async (req, res) => {
  try {
    const { payerName, payerDocument, amount, description } = req.body;

    if (!payerName || !payerDocument || !amount) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const result = await createPix({
      payerName,
      payerDocument,
      amount,
      description: description || "Acesso VIP - Mentoria",
      prefix: "checkout",
    });

    return result.ok ? res.json(result.data) : res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar transacao PIX" });
  }
});

// Endpoint novo (página da Fernanda). Recebe o plano, não o valor.
app.post("/api/fernanda/create-pix", async (req, res) => {
  try {
    const { planId, payerName, payerDocument } = req.body;

    if (!Object.hasOwn(FERNANDA_PLANS, planId)) {
      return res.status(400).json({ error: "Plano inválido" });
    }
    if (typeof payerName !== "string" || payerName.trim().length < 3) {
      return res.status(400).json({ error: "Informe seu nome completo" });
    }
    if (!isValidCpf(payerDocument)) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    const plan = FERNANDA_PLANS[planId];
    const result = await createPix({
      payerName: payerName.trim(),
      payerDocument,
      amount: plan.amount,
      description: plan.description,
      prefix: `fernanda-${planId}`,
    });

    return result.ok ? res.json(result.data) : res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar transacao PIX" });
  }
});

app.post("/api/check-status", async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ error: "transactionId obrigatorio" });
    }

    const response = await fetch(`${MISTICPAY_BASE}/transactions/check`, {
      method: "POST",
      headers: misticHeaders(),
      body: JSON.stringify({ transactionId }),
    });

    const data = await response.json().catch(() => ({}));
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao verificar transacao" });
  }
});

app.post("/api/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
