import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}

export function NeonButton({ children, size = "lg", className = "", ...rest }: Props) {
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`btn-neon inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wider animate-pulse-glow ${sizes[size]} ${className}`}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
