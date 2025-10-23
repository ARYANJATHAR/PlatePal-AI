
import React from 'react';
import { motion } from 'framer-motion';
import type { MenuItem } from '../types';
import { MenuItemCard } from './MenuItemCard';

interface ResultsDisplayProps {
  menuItems: MenuItem[];
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ menuItems, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-6xl px-4"
    >
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand">Results</span>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Your Translated Menu
          </h2>
          <p className="mt-2 text-slate-300">
            Showing {menuItems.length} {menuItems.length === 1 ? 'item' : 'items'} from your menu
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand/90"
        >
          Scan Another Menu
        </motion.button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item, index) => (
          <MenuItemCard key={index} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
};