import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { _ as CircleDot, i as Star, r as Users, s as ShieldCheck, t as Zap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NeonButton-CynO-VBe.js
var import_jsx_runtime = require_jsx_runtime();
var siteContent = {
	brand: {
		name: "VIP ACCESS",
		tagline: "Conteúdo Exclusivo"
	},
	home: {
		headline: "SEU CONTEUDO JÁ DISPONÍVEL",
		subheadline: `





  `,
		cta: "DESBLOQUEAR AGORA",
		stats: {
			online: 2847,
			members: "18.4k",
			rating: "4.9"
		},
		badges: [
			"Acesso Imediato",
			"Pagamento 100% Seguro",
			"Acesso Vitalício"
		]
	},
	sales: {
		headline: "Desbloqueie seu acesso premium.",
		subheadline: "Assinatura vitalícia, atualizações frequentes, acesso imediato aos grupos disponíveis e pagamento seguro.",
		ctaPrimary: "DESBLOQUEAR AGORA",
		plans: [{
			id: "vip",
			name: "VIP Completo",
			amount: 27,
			original: "R$ 197,00",
			current: "R$ 27,00",
			description: "Acesso VIP vitalício completo"
		}, {
			id: "master",
			name: "VIP Master",
			amount: 99.9,
			original: "R$ 397,00",
			current: "R$ 99,90",
			description: "Acesso VIP Master completo"
		}],
		floatingCta: "Desbloquear Acesso VIP"
	}
};
function SocialProof() {
	const s = siteContent.home.stats;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass flex items-center gap-2 rounded-full px-3 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "h-3 w-3 animate-pulse text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-400",
							children: s.online.toLocaleString("pt-BR")
						}), " online agora"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass flex items-center gap-2 rounded-full px-3 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: [s.members, " membros"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass flex items-center gap-2 rounded-full px-3 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-yellow-400 text-yellow-400" }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: s.rating
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs",
			children: siteContent.home.badges.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass flex items-center gap-1.5 rounded-full px-3 py-1 text-muted-foreground",
				children: [
					i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3 text-neon-pink" }),
					i === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3 text-emerald-400" }),
					i === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-yellow-400" }),
					b
				]
			}, b))
		})]
	});
}
function NeonButton({ children, size = "lg", className = "", ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		whileTap: { scale: .97 },
		className: `btn-neon inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wider animate-pulse-glow ${{
			md: "px-6 py-3 text-sm",
			lg: "px-8 py-4 text-base",
			xl: "px-10 py-5 text-lg"
		}[size]} ${className}`,
		...rest,
		children
	});
}
//#endregion
export { SocialProof as n, siteContent as r, NeonButton as t };
