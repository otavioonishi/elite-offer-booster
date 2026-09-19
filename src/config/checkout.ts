/**
 * ============================================================
 *  CONFIGURAÇÃO DO CHECKOUT PIX
 * ============================================================
 *
 *  O PIX é gerado pelo próprio site (rotas /api/public/pix/*),
 *  por isso não é preciso servidor externo.
 */
export const CREATE_PIX_URL = "/api/public/pix/create";
export const CHECK_PIX_URL = "/api/public/pix/status";

export const CHECKOUT_UNAVAILABLE_MESSAGE =
  "Esse acesso está sendo atualizado. Tente novamente em instantes ❤️";

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
    badge: "Recomendado",
  },
];
