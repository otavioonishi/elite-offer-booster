import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { x as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SocialProof, r as siteContent, t as NeonButton } from "./NeonButton-CynO-VBe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DRMXoayD.js
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-CvsEaNAv.jpg";
function Home() {
	const navigate = useNavigate();
	const c = siteContent.home;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-[45vh] w-[45vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/10 blur-[140px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-neon-pink/15 blur-[120px]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-neon-pink" }), siteContent.brand.tagline]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { duration: .8 },
				className: "relative mb-8 w-full max-w-md aspect-[9/16]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: "Preview exclusivo",
					className: "w-full h-full object-cover rounded-[2rem] shadow-2xl pointer-events-none select-none"
				})
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
				transition: { delay: .2 },
				className: "mb-3 max-w-2xl text-center text-3xl font-black leading-tight sm:text-5xl",
				children: [
					c.headline.split(" ").slice(0, -3).join(" "),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: c.headline.split(" ").slice(-3).join(" ")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .5 },
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NeonButton, {
					size: "xl",
					onClick: () => navigate({ to: "/vip" }),
					children: [
						c.cta,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: .7 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProof, {})
			})
		]
	});
}
//#endregion
export { Home as component };
