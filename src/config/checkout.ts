/**
 * ============================================================
 *  CONFIGURAÇÃO DO CHECKOUT PIX
 * ============================================================
 *
 *  O PIX é gerado pelo servidor no Render (elite-offer-booster-server).
 *  A chave da MisticPay fica só lá, nunca neste site.
 *  O valor de cada plano é definido no servidor; aqui o preço
 *  serve só para mostrar na tela.
 */
export const API_URL = "https://elite-offer-booster-server.onrender.com";

export const CREATE_PIX_URL = `${API_URL}/api/fernanda/create-pix`;
export const CHECK_PIX_URL = `${API_URL}/api/check-status`;

export const CHECKOUT_UNAVAILABLE_MESSAGE =
  "Pagamento indisponível no momento. Tente novamente em instantes ❤️";

export const plans = [
  {
    id: "basic" as const,
    title: "Acesso",
    price: "R$ 7,90",
    text: "Acesso básico.",
    highlight: false,
    badge: null as string | null,
  },
  {
    id: "vip" as const,
    title: "Acesso VIP",
    price: "R$ 17,93",
    text: "Acesso VIP.",
    highlight: true,
    badge: "Recomendado" as string | null,
  },
];
