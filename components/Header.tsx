"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur supports-[backdrop-filter]:glass-panel border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand text-lg font-semibold">
            🍽️
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight">PlatePal AI</p>
            <p className="text-xs text-slate-300">Understand menus instantly</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#demo"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-glow"
        >
          Try Now
        </motion.a>
      </div>
    </header>
  );
}
