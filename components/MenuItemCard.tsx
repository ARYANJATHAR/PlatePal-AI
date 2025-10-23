import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MenuItem } from '../types';
import { generateMenuItemImage } from '../services/geminiService';

const spiceLevels = { 'None': 0, 'Mild': 1, 'Medium': 2, 'Spicy': 3, 'Very Spicy': 4 };
const MAX_SPICE = 4;

const SpiceLevelIndicator: React.FC<{ level: keyof typeof spiceLevels }> = ({ level }) => {
    const levelValue = spiceLevels[level] ?? 0;
    if (levelValue === 0) return null;

    return (
        <div className="flex items-center gap-1" title={`Spice Level: ${level}`}>
            {[...Array(MAX_SPICE)].map((_, i) => (
                <span key={i} className={`text-lg ${i < levelValue ? 'text-red-500' : 'text-slate-500'}`}>
                    🌶️
                </span>
            ))}
        </div>
    );
};

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        const fetchImage = async () => {
            setIsLoadingImage(true);
            const generatedUrl = await generateMenuItemImage(item.translatedName);
            if (isMounted) {
                setImageUrl(generatedUrl);
                setIsLoadingImage(false);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, [item.translatedName]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass-panel group cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-brand/10 transition-all hover:border-brand/30 hover:shadow-brand/20"
        >
            <div className="w-full h-48 bg-white/5 flex items-center justify-center overflow-hidden">
                {isLoadingImage ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-brand/50 border-t-brand rounded-full"
                    />
                ) : (
                    <img src={imageUrl} alt={item.translatedName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                )}
            </div>
            <div className="p-6 flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.originalName}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.translatedName}</h3>
                
                <p className="mt-3 text-sm text-slate-300 line-clamp-2">{item.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <SpiceLevelIndicator level={item.spiceLevel} />
                    <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-sm font-semibold text-brand"
                    >
                        ↓
                    </motion.span>
                </div>

                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-slate-300">{item.description}</p>
                        
                        {item.pairingSuggestion && (
                          <div className="rounded-lg border border-brand/20 bg-brand/10 p-3">
                            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand">Pairs Well With</h4>
                            <p className="mt-1 text-sm text-slate-300">{item.pairingSuggestion}</p>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                            {item.dietaryNotes.length > 0 && (
                                <div>
                                    <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-200 mb-2">Dietary Notes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.dietaryNotes.map((note, i) => (
                                            <span key={i} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                ✓ {note}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {item.allergens.length > 0 && (
                                <div>
                                    <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-200 mb-2">⚠️ Potential Allergens</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.allergens.map((allergen, i) => (
                                            <span key={i} className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                                {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};