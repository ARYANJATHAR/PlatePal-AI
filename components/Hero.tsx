import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  onStartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 hero-gradient opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-20 md:grid-cols-2 md:pb-24 md:pt-24">
        <div className="flex flex-col justify-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200"
          >
            🤖 AI-powered dining companion
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Understand every menu, anywhere in the world.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-slate-200 md:text-lg"
          >
            PlatePal AI instantly translates and explains any menu with cultural insights,
            ingredient breakdowns, and allergen alerts. Perfect for travelers and curious foodies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={onStartClick}
              className="flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand/90"
            >
              Analyze a Menu
            </button>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Explore Features
            </a>
          </motion.div>
          <motion.dl
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-2 gap-6 text-sm text-slate-200 sm:grid-cols-3"
          >
            <div>
              <dt className="uppercase tracking-[0.2em] text-xs text-slate-400">Translations</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">Instant</dd>
              <p className="text-xs text-slate-400">Real-time processing</p>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-xs text-slate-400">Languages</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">100+</dd>
              <p className="text-xs text-slate-400">Global cuisine support</p>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-xs text-slate-400">Allergens</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">24+</dd>
              <p className="text-xs text-slate-400">Safety alerts included</p>
            </div>
          </motion.dl>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="glass-panel relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-brand/10">
            <div className="absolute inset-x-12 top-0 z-10 h-12 rounded-b-full bg-brand/40 blur-3xl" />
            <div className="relative bg-white/5 px-6 pb-6 pt-8">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold uppercase tracking-[0.3em] text-brand">
                  Live preview
                </span>
                <span>Your Menu</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface/90 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/5">
                    <Image
                      src="https://picsum.photos/96/96?random=1"
                      alt="Menu preview"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">Menu Item</p>
                    <p className="text-xs text-slate-300">Instant explanation</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Get detailed information about ingredients, preparation style, and cultural
                  context.
                </p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Allergens detected</span>
                  <span>Translation ready</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 bg-surface/80 px-6 pb-6 pt-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-brand">
                  ✓
                </span>
                <div>
                  <p className="text-white">Instant translation</p>
                  <p>Powered by advanced AI models.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-brand">
                  ♨
                </span>
                <div>
                  <p className="text-white">Cultural insights</p>
                  <p>Learn about dishes and dining customs.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};