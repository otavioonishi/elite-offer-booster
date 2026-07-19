import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const MISTICPAY_BASE = "https://api.misticpay.com/api";
const CI = process.env.MISTICPAY_CLIENT_ID;
const CS = process.env.MISTICPAY_CLIENT_SECRET;

function misticHeaders() {
  return {
    ci: CI,
    cs: CS,
    "Content-Type": "application/json",
  };
}

app.post("/api/create-pix", async (req, res) => {
  try {
    const { payerName, payerDocument, amount, description } = req.body;

    if (!payerName || !payerDocument || !amount) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const transactionId = `checkout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const response = await fetch(`${MISTICPAY_BASE}/transactions/create`, {
      method: "POST",
      headers: misticHeaders(),
      body: JSON.stringify({
        amount,
        payerName,
        payerDocument: payerDocument.replace(/\D/g, ""),
        transactionId,
        description: description || "Acesso VIP - Mentoria",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
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

    const data = await response.json();
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
