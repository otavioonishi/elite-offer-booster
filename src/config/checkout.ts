/**
 * ============================================================
 *  CONFIGURAÇÃO DO CHECKOUT PIX
 * ============================================================
 *
 *  API_URL -> endereço do servidor que gera o PIX.
 *  Troque pelo endereço real do seu servidor.
 */
export const API_URL = "https://SEU-SERVIDOR.onrender.com";

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
