"use client";
import { motion } from "framer-motion";

interface Props { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "outline"; className?: string; }
export default function Button({ children, onClick, variant = "primary", className = "" }: Props) {
  const b = "inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer";
  const v = { primary: "bg-[#f97316] text-white hover:bg-[#ea580c] hover:shadow-lg hover:shadow-amber-200", outline: "border border-[#1a1a1a]/20 text-[#1a1a1a] hover:border-[#f97316] hover:text-[#f97316]" };
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={b + " " + v[variant] + " " + className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
