// Central content configuration - edit everything here
export const siteContent = {
  brand: {
    name: "VIP ACCESS",
    tagline: "Conteúdo Exclusivo",
  },

  home: {
    headline: "SEU CONTEUDO JÁ DISPONÍVEL",

    subheadline: `





  `,

    stats: {
      online: 2847,
      members: "18.4k",
      rating: "4.9",
    },

    badges: [
      "Acesso Imediato",
      "Pagamento 100% Seguro",
      "Acesso Vitalício",
    ],
  },

  sales: {
    headline: "Desbloqueie seu acesso premium.",

    subheadline:
      "Assinatura vitalícia, atualizações frequentes, acesso imediato aos grupos disponíveis e pagamento seguro.",

    ctaPrimary: "DESBLOQUEAR AGORA",

    plans: [
      {
        id: "basico",
        name: "VIP Básico",
        amount: 9.99,
        original: "R$ 47,00",
        current: "R$ 9,99",
        description: "Acesso ao conteúdo básico",
      },
      {
        id: "vip",
        name: "VIP Completo",
        amount: 27.0,
        original: "R$ 197,00",
        current: "R$ 27,00",
        description: "Acesso VIP vitalício completo",
      },
    ],

    floatingCta: "Desbloquear Acesso VIP",
  },
} as const;
