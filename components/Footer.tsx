export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} PlatePal AI. All rights reserved.</p>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#demo" className="transition hover:text-white">
            Demo
          </a>
          <a href="mailto:hello@menumaverick.ai" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
