/**
 * ============================================================
 *  LINKS DE PAGAMENTO — COLE AQUI OS LINKS DOS SEUS CHECKOUTS
 * ============================================================
 *
 *  MONTHLY_CHECKOUT_URL  -> link do plano VIP MENSAL (R$ 19,90)
 *  LIFETIME_CHECKOUT_URL -> link do plano VIP VITALÍCIO (R$ 59,90)
 *
 *  Exemplo:
 *  export const MONTHLY_CHECKOUT_URL = "https://pay.exemplo.com/mensal";
 *
 *  Enquanto ficarem vazios (""), o botão mostra uma mensagem amigável
 *  em vez de dar erro.
 */
export const MONTHLY_CHECKOUT_URL = "";
export const LIFETIME_CHECKOUT_URL = "";

export const CHECKOUT_UNAVAILABLE_MESSAGE =
  "Esse acesso está sendo atualizado. Tente novamente em instantes ❤️";

export const plans = [
  {
    id: "monthly" as const,
    title: "🌾 VIP MENSAL",
    price: "R$ 19,90",
    text: "Acesso mensal ao VIP.",
    cta: "QUERO O VIP MENSAL ❤️",
    url: MONTHLY_CHECKOUT_URL,
    highlight: false,
    badge: null as string | null,
  },
  {
    id: "lifetime" as const,
    title: "❤️ VIP VITALÍCIO",
    price: "R$ 59,90",
    text: "Pagamento único. Acesso vitalício.",
    cta: "QUERO ACESSO VITALÍCIO 🔥",
    url: LIFETIME_CHECKOUT_URL,
    highlight: true,
    badge: "MAIS VANTAJOSO",
  },
];
