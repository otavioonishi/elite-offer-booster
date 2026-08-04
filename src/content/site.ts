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

    cta: "DESBLOQUEAR AGORA",

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
        id: "gratis",
        name: "Grátis",
        amount: 0,
        original: "R$ 0,00",
        current: "R$ 0",
        description: "Entre no grupo gratuito do WhatsApp",
      },
      {
        id: "basico",
        name: "Básico",
        amount: 17.0,
        original: "R$ 97,00",
        current: "R$ 17,00",
        description: "Acesso básico ao conteúdo",
      },
      {
        id: "vip",
        name: "Normal",
        amount: 27.0,
        original: "R$ 197,00",
        current: "R$ 27,00",
        description: "Acesso VIP completo",
      },
      {
        id: "master",
        name: "VIP Vitalício",
        amount: 99.0,
        original: "R$ 397,00",
        current: "R$ 99,00",
        description: "Acesso VIP vitalício completo",
      },
    ],


    floatingCta: "Desbloquear Acesso VIP",
  },
} as const;
