import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b hairline">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-display text-[22px] tracking-tight text-silk">
            Casino<span className="text-brass">·</span>Audit
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#games" className="font-mono text-[12px] uppercase tracking-[0.12em] text-ash hover:text-silk transition-colors">
            Игры
          </a>
          <a href="#math" className="font-mono text-[12px] uppercase tracking-[0.12em] text-ash hover:text-silk transition-colors">
            Математика
          </a>
          <a href="#platforms" className="font-mono text-[12px] uppercase tracking-[0.12em] text-ash hover:text-silk transition-colors">
            Платформы
          </a>
          <a href="#guides" className="font-mono text-[12px] uppercase tracking-[0.12em] text-ash hover:text-silk transition-colors">
            Гайды
          </a>
        </nav>
        <a
          href="#platforms"
          className="border border-brass/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brass hover:bg-brass hover:text-onyx transition-colors"
        >
          Рейтинг
        </a>
      </div>
    </header>
  );
}
