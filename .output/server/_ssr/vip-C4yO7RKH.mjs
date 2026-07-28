import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { a as Sparkles, b as BadgeCheck, c as RefreshCw, d as Minus, f as Lock, g as Copy, h as CreditCard, i as Star, l as Plus, m as Headphones, n as X, o as Smartphone, p as Infinity$1, r as Users, s as ShieldCheck, t as Zap, u as Monitor, v as CircleCheck, y as Ban } from "../_libs/lucide-react.mjs";
import { n as SocialProof, r as siteContent, t as NeonButton } from "./NeonButton-CynO-VBe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vip-C4yO7RKH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var preview_mp4_asset_default = {
	version: 1,
	asset_id: "0c7b5e53-2a84-454c-a114-39adc8b9f0d2",
	project_id: "aa9acf86-15f3-4a8a-8d62-1f4211de1507",
	url: "/__l5e/assets-v1/0c7b5e53-2a84-454c-a114-39adc8b9f0d2/preview.mp4",
	r2_key: "a/v1/aa9acf86-15f3-4a8a-8d62-1f4211de1507/0c7b5e53-2a84-454c-a114-39adc8b9f0d2/preview.mp4",
	original_filename: "preview.mp4",
	size: 1037041,
	content_type: "video/mp4",
	created_at: "2026-07-27T17:29:50Z"
};
function LockedVideo({ onUnlock }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		initial: {
			opacity: 0,
			y: 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		onClick: () => setOpen(true),
		className: "group relative mx-auto block w-full max-w-md overflow-hidden rounded-3xl border border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: preview_mp4_asset_default.url,
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				preload: "metadata",
				className: "h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass-strong rounded-full p-3 group-hover:animate-pulse-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-neon-pink" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-widest text-white/80",
					children: "Prévia exclusiva"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .9,
				y: 20
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .9,
				y: 20
			},
			onClick: (e) => e.stopPropagation(),
			className: "glass-strong relative w-full max-w-md rounded-3xl p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					className: "absolute right-4 top-4 text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-8 w-8 text-white" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-2xl font-bold",
					children: "Conteúdo Bloqueado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 text-muted-foreground",
					children: "Este conteúdo é exclusivo para membros VIP. Desbloqueie o acesso completo agora e veja tudo sem restrições."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NeonButton, {
					onClick: () => {
						setOpen(false);
						onUnlock();
					},
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }), " Desbloquear Agora"]
				})
			]
		})
	}) })] });
}
var benefits = [
	{
		id: 1,
		title: "Acervo Premium Completo",
		description: "Mais de 2.500 conteúdos exclusivos organizados por categoria. Acesso vitalício sem mensalidade.",
		icon: "Sparkles"
	},
	{
		id: 2,
		title: "Atualizações Semanais",
		description: "Novo conteúdo toda semana. Você nunca fica sem novidade e sempre tem algo novo para explorar.",
		icon: "RefreshCw"
	},
	{
		id: 3,
		title: "Qualidade 4K Ultra HD",
		description: "Máxima qualidade em todas as telas. Assista onde e quando quiser sem perda de nitidez.",
		icon: "Monitor"
	},
	{
		id: 4,
		title: "100% Anônimo e Discreto",
		description: "Sua privacidade é sagrada. Cobrança discreta e nenhum dado compartilhado com terceiros.",
		icon: "ShieldCheck"
	},
	{
		id: 5,
		title: "Suporte VIP 24/7",
		description: "Atendimento exclusivo por WhatsApp. Tire dúvidas e receba recomendações personalizadas.",
		icon: "Headphones"
	}
];
var whyChoose = [
	{
		title: "Acesso Vitalício",
		description: "Pague uma vez, acesse para sempre.",
		icon: "Infinity"
	},
	{
		title: "Sem Anúncios",
		description: "Experiência limpa e sem interrupções.",
		icon: "Ban"
	},
	{
		title: "Multi-Dispositivo",
		description: "Celular, tablet, computador e TV.",
		icon: "Smartphone"
	},
	{
		title: "Comunidade Exclusiva",
		description: "Grupo VIP com membros verificados.",
		icon: "Users"
	}
];
var icons$1 = {
	Sparkles,
	RefreshCw,
	Monitor,
	ShieldCheck,
	Headphones
};
function BenefitCards() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: benefits.map((b, i) => {
			const Icon = icons$1[b.icon];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-50px"
				},
				transition: { delay: i * .08 },
				whileHover: { y: -4 },
				className: "glass group relative overflow-hidden rounded-3xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-lg font-bold",
							children: b.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: b.description
						})
					]
				})]
			}, b.id);
		})
	});
}
var icons = {
	Infinity: Infinity$1,
	Ban,
	Smartphone,
	Users
};
function WhyChoose() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
		children: whyChoose.map((item, i) => {
			const Icon = icons[item.icon];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .9
				},
				whileInView: {
					opacity: 1,
					scale: 1
				},
				viewport: { once: true },
				transition: { delay: i * .08 },
				className: "glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-neon-pink" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: item.description
					})
				]
			}, item.title);
		})
	});
}
var testimonials = [
	{
		name: "Rafael M.",
		location: "São Paulo, SP",
		rating: 5,
		text: "Melhor investimento que fiz. O conteúdo é muito superior ao que eu esperava. Vale cada centavo.",
		verified: true
	},
	{
		name: "Lucas P.",
		location: "Rio de Janeiro, RJ",
		rating: 5,
		text: "Acesso liberado em menos de 1 minuto. Qualidade insana e atualizações constantes. Recomendo demais.",
		verified: true
	},
	{
		name: "Bruno S.",
		location: "Belo Horizonte, MG",
		rating: 5,
		text: "Já testei várias plataformas e nenhuma chega perto. Discrição total e suporte excelente.",
		verified: true
	},
	{
		name: "Diego R.",
		location: "Curitiba, PR",
		rating: 5,
		text: "Paguei uma vez e tenho acesso vitalício. Sem pegadinha, sem mensalidade. Cumpriu tudo que prometeu.",
		verified: true
	},
	{
		name: "Thiago A.",
		location: "Porto Alegre, RS",
		rating: 5,
		text: "Conteúdo exclusivo de verdade. Muito acima da média do mercado. Estou impressionado.",
		verified: true
	},
	{
		name: "Gabriel F.",
		location: "Brasília, DF",
		rating: 5,
		text: "Suporte VIP resolveu minha dúvida em 2 minutos. Experiência premium do início ao fim.",
		verified: true
	}
];
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: testimonials.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { delay: i * .06 },
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-pink font-bold text-white",
						children: t.name.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-sm",
							children: t.name
						}), t.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-sky-400" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: t.location
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex",
					children: Array.from({ length: t.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-yellow-400 text-yellow-400" }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground leading-relaxed",
					children: [
						"\"",
						t.text,
						"\""
					]
				})
			]
		}, t.name))
	});
}
var faqs = [
	{
		q: "Como funciona o acesso?",
		a: "Após a confirmação do pagamento, você recebe imediatamente seu login e senha por email. O acesso é vitalício e liberado em até 2 minutos."
	},
	{
		q: "O pagamento é seguro?",
		a: "Sim. Utilizamos gateways de pagamento certificados com criptografia SSL 256 bits. Aceitamos Pix, cartão de crédito e boleto. Cobrança discreta na fatura."
	},
	{
		q: "Preciso pagar mensalidade?",
		a: "Não. Você paga apenas uma vez e tem acesso vitalício a todo o acervo, incluindo todas as atualizações futuras."
	},
	{
		q: "Funciona no celular?",
		a: "Sim, a plataforma é 100% responsiva. Funciona perfeitamente em celular, tablet, computador e Smart TV."
	},
	{
		q: "É realmente anônimo?",
		a: "Totalmente. Seus dados nunca são compartilhados. A cobrança aparece com um nome discreto na fatura do seu cartão."
	},
	{
		q: "E se eu não gostar?",
		a: "Oferecemos garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu dinheiro sem perguntas."
	}
];
function FAQ() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl space-y-3",
		children: faqs.map((f, i) => {
			const isOpen = open === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { delay: i * .04 },
				className: "glass overflow-hidden rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpen(isOpen ? null : i),
					className: "flex w-full items-center justify-between gap-4 p-5 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: f.q
					}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-5 w-5 shrink-0 text-neon-pink" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 shrink-0 text-muted-foreground" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						height: 0,
						opacity: 0
					},
					animate: {
						height: "auto",
						opacity: 1
					},
					exit: {
						height: 0,
						opacity: 0
					},
					transition: { duration: .25 },
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed",
						children: f.a
					})
				}) })]
			}, f.q);
		})
	});
}
var API_URL = "http://localhost:3001";
var TELEGRAM_LINK = "https://t.me/+X7bYcV9ObZ85YmFh";
function Checkout() {
	const [step, setStep] = (0, import_react.useState)("plan");
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [document, setDocument] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [pix, setPix] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const pollRef = (0, import_react.useRef)(null);
	const plans = siteContent.sales.plans;
	const handleSelectPlan = (plan) => {
		setSelectedPlan(plan);
		setStep("form");
	};
	const handleCreatePix = async () => {
		setError(null);
		if (!selectedPlan) {
			setError("Selecione um plano antes de continuar.");
			return;
		}
		const cleanDoc = document.replace(/\D/g, "");
		if (!name.trim() || cleanDoc.length !== 11) {
			setError("Preencha nome completo e um CPF válido (11 dígitos).");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/api/create-pix`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					payerName: name,
					payerDocument: cleanDoc,
					amount: selectedPlan.amount,
					description: `${selectedPlan.name} - Mentoria`
				})
			});
			const json = await res.json();
			if (!res.ok) {
				setError(json.error || "Não foi possível gerar o PIX. Tente novamente.");
				setLoading(false);
				return;
			}
			setPix({
				transactionId: json.data.transactionId,
				qrCodeBase64: json.data.qrCodeBase64,
				copyPaste: json.data.copyPaste
			});
			setStep("pix");
		} catch (err) {
			setError("Erro de conexão. Verifique sua internet e tente novamente.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (step !== "pix" || !pix) return;
		pollRef.current = setInterval(async () => {
			try {
				if ((await (await fetch(`${API_URL}/api/check-status`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ transactionId: pix.transactionId })
				})).json())?.transaction?.transactionState === "COMPLETO") {
					setStep("paid");
					if (pollRef.current) clearInterval(pollRef.current);
				}
			} catch {}
		}, 5e3);
		return () => {
			if (pollRef.current) clearInterval(pollRef.current);
		};
	}, [step, pix]);
	(0, import_react.useEffect)(() => {
		if (step !== "paid") return;
		const timer = setTimeout(() => {
			window.location.href = TELEGRAM_LINK;
		}, 2500);
		return () => clearTimeout(timer);
	}, [step]);
	const handleCopy = () => {
		if (!pix) return;
		navigator.clipboard.writeText(pix.copyPaste);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "checkout",
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				className: "glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-pink/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						step === "plan" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " Oferta por tempo limitado"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-2xl sm:text-3xl font-black",
								children: "Escolha seu plano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-6 text-sm text-muted-foreground",
								children: "Pagamento único • Sem mensalidade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-4",
								children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleSelectPlan(plan),
									className: "w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-neon-purple hover:bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-lg font-black",
											children: plan.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: plan.description
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-xs text-muted-foreground line-through",
												children: plan.original
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-2xl font-black gradient-text",
												children: plan.current
											})]
										})]
									})
								}, plan.id))
							})
						] }),
						step === "form" && selectedPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " Oferta por tempo limitado"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-2xl sm:text-3xl font-black",
								children: selectedPlan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-6 text-sm text-muted-foreground",
								children: "Pagamento único • Sem mensalidade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex flex-col items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground line-through",
									children: ["De ", selectedPlan.original]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-baseline gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl sm:text-6xl font-black gradient-text",
										children: selectedPlan.current
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStep("plan"),
								className: "mb-4 text-xs text-muted-foreground underline hover:text-white",
								children: "Trocar plano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex flex-col gap-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Nome completo",
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-neon-purple"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "CPF (somente números)",
									value: document,
									onChange: (e) => setDocument(e.target.value),
									maxLength: 14,
									className: "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-neon-purple"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 text-sm text-red-400",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NeonButton, {
								size: "xl",
								onClick: handleCreatePix,
								disabled: loading,
								className: "w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }),
									" ",
									loading ? "Gerando PIX..." : siteContent.sales.ctaPrimary
								]
							})
						] }),
						step === "pix" && pix && selectedPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-2xl font-black",
								children: "Escaneie o QR Code para pagar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-6 text-sm text-muted-foreground",
								children: ["Valor: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "gradient-text",
									children: ["R$ ", selectedPlan.amount.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: pix.qrCodeBase64,
								alt: "QR Code PIX",
								className: "mx-auto mb-6 h-56 w-56 rounded-xl bg-white p-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleCopy,
								className: "mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), copied ? "Copiado!" : "Copiar código Pix"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground animate-pulse",
								children: "Aguardando confirmação do pagamento..."
							})
						] }),
						step === "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto mb-4 h-16 w-16 text-emerald-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-2xl font-black",
								children: "Pagamento confirmado!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Seu acesso VIP foi liberado. Você será redirecionado para o Telegram em instantes..."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-400" }), " Compra 100% segura"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-sky-400" }), " Pix"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-yellow-400" }), " Acesso imediato"]
								})
							]
						})
					]
				})]
			})
		})
	});
}
function FloatingCTA({ targetId = "checkout" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			y: 100,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			delay: 1.2,
			type: "spring",
			stiffness: 200,
			damping: 20
		},
		className: "fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `#${targetId}`,
				className: "btn-neon animate-pulse-glow flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider sm:text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }), siteContent.sales.floatingCta]
			})
		})
	});
}
function VipPage() {
	const s = siteContent.sales;
	const scrollToCheckout = () => {
		document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative overflow-hidden pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative px-4 pt-16 pb-12 sm:pt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 -z-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-0 h-[60vh] w-[80vh] -translate-x-1/2 rounded-full bg-neon-purple/25 blur-[120px]" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: -10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-neon-pink" }), " Acesso Restrito"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "mb-4 text-3xl font-black leading-tight sm:text-5xl md:text-6xl",
							children: [
								s.headline.split(".")[0],
								". ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-text",
									children: s.headline.split(".").slice(1).join(".").trim()
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .2 },
							className: "mx-auto mb-8 max-w-2xl text-muted-foreground",
							children: s.subheadline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NeonButton, {
								size: "xl",
								onClick: scrollToCheckout,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }),
									" ",
									s.ctaPrimary
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProof, {})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-2xl sm:text-4xl font-black",
							children: "Prévia do acervo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Toque no vídeo para desbloquear"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedVideo, { onUnlock: scrollToCheckout })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-2 text-2xl sm:text-4xl font-black",
							children: ["O que você ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "recebe"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Tudo isso com pagamento único e acesso vitalício"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenefitCards, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-2 text-2xl sm:text-4xl font-black",
							children: ["Por que escolher ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "este acesso"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChoose, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NeonButton, {
						size: "xl",
						onClick: scrollToCheckout,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }), " Quero Desbloquear Agora"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-2 text-2xl sm:text-4xl font-black",
							children: [
								"Mais de ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-text",
									children: "18.000 membros"
								}),
								" satisfeitos"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Avaliações reais de quem já desbloqueou"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkout, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-2 text-2xl sm:text-4xl font-black",
							children: ["Perguntas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "frequentes"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingCTA, {})
		]
	});
}
//#endregion
export { VipPage as component };
