import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MenuUploaderProps {
  onProcess: (file: File) => void;
}

type UploadState = "idle" | "uploading" | "processing" | "complete";

const progressStages: Record<UploadState, { label: string; progress: number }> = {
  idle: { label: "Ready to scan", progress: 0 },
  uploading: { label: "Uploading menu photo", progress: 35 },
  processing: { label: "Analyzing dishes with PlatePal AI", progress: 72 },
  complete: { label: "Translations ready", progress: 100 }
};

export const MenuUploader: React.FC<MenuUploaderProps> = ({ onProcess }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [state, setState] = useState<UploadState>("idle");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    setFileName(file.name);
    setState("uploading");

    setTimeout(() => setState("processing"), 900);
    setTimeout(() => {
      setState("complete");
      onProcess(file);
    }, 2200);
  };

  return (
    <section
      id="demo"
      className="border-b border-white/5 bg-gradient-to-b from-surface via-surface/80 to-surface/95 py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-lg shadow-brand/10">
          <span className="text-xs uppercase tracking-[0.3em] text-brand">Upload or scan</span>
          <h2 className="mt-4 text-3xl font-semibold text-white">Turn menus into clarity</h2>
          <p className="mt-3 text-sm text-slate-300">
            Drag & drop a photo or PDF, or capture a new image using your camera. PlatePal AI keeps
            your scans private and processes them instantly.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <div className="rounded-2xl border border-dashed border-white/20 bg-surface/70 p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-sm text-slate-200">
                Drop your menu here or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="underline decoration-brand/60 decoration-2 underline-offset-4 transition hover:decoration-brand"
                >
                  browse files
                </button>
              </p>
              {fileName && (
                <p className="mt-3 text-xs text-slate-300">
                  Selected file: <span className="font-medium text-white">{fileName}</span>
                </p>
              )}
            </div>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-surface/80 p-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Status</span>
                <span>{progressStages[state].progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  key={state}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressStages[state].progress}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-brand to-brand-accent"
                />
              </div>
              <p className="text-sm text-slate-200">{progressStages[state].label}</p>
              <ul className="text-xs text-slate-400">
                <li>• Smart glare & handwriting clean-up</li>
                <li>• Automatic language detection</li>
                <li>• Secure: Images delete post-translation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="glass-panel flex-1 rounded-3xl p-6 text-sm text-slate-200">
            <h3 className="text-lg font-semibold text-white">How it works</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-brand">1.</span> Capture or upload a menu.
              </li>
              <li>
                <span className="font-semibold text-brand">2.</span> PlatePal AI translates each
                section, detecting categories automatically.
              </li>
              <li>
                <span className="font-semibold text-brand">3.</span> Tap any dish to read
                explanations, cultural notes, and allergen alerts.
              </li>
            </ol>
            <p className="mt-6 rounded-2xl border border-brand/30 bg-brand/10 p-4 text-xs text-brand">
              Tip: For best results, ensure menu text is clear and well-lit.
            </p>
          </div>
          <div className="glass-panel rounded-3xl border border-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Privacy & trust</p>
            <p className="mt-2 text-sm text-slate-300">
              PlatePal AI uses on-device pre-processing to anonymize data. Images are encrypted and
              automatically deleted once your translations are delivered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};