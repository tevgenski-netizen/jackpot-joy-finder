import heroImg from "@/assets/hero-roulette.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 pt-20 pb-32 md:grid-cols-12 md:px-10 md:pt-28 md:pb-40">
        {/* Left — copy */}
        <div className="md:col-span-6 md:pt-8">
          <div className="eyebrow animate-hero" style={{ animationDelay: "0ms" }}>
            Обзоры и стратегии казино · 2025
          </div>

          <h1
            className="mt-6 font-display text-[44px] leading-[1.02] tracking-[-0.02em] text-silk md:text-[72px] animate-hero"
            style={{ animationDelay: "150ms" }}
          >
            Играйте с умом.
            <br />
            <span className="italic text-ash">Честные обзоры,</span>
            <br />
            математика игр и реальный RTP.
          </h1>

          <p
            className="mt-8 max-w-[46ch] text-[17px] leading-[1.65] text-ash animate-hero"
            style={{ animationDelay: "350ms" }}
          >
            Мы анализируем математическое ожидание, дисперсию и условия отыгрыша,
            а не продаём вам бонусы-пустышки. Никаких партнёрских звёздочек —
            только проверяемые цифры.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-hero" style={{ animationDelay: "550ms" }}>
            <a
              href="#math"
              className="border border-brass bg-brass px-7 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-onyx hover:bg-brass-dim hover:border-brass-dim transition-colors active:scale-[0.98]"
            >
              Изучить стратегии
            </a>
            <a
              href="#games"
              className="border border-white/15 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-silk hover:border-brass hover:text-brass transition-colors active:scale-[0.98]"
            >
              Обзоры игр →
            </a>
          </div>

          {/* trust strip */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t hairline pt-8 animate-hero" style={{ animationDelay: "750ms" }}>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">Игр обозрено</div>
              <div className="mt-2 font-display text-[32px] leading-none text-silk tabular-nums">147</div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">Платформ</div>
              <div className="mt-2 font-display text-[32px] leading-none text-silk tabular-nums">38</div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">RTP-аудит</div>
              <div className="mt-2 font-display text-[32px] leading-none text-brass tabular-nums">96.4%</div>
            </div>
          </div>
        </div>

        {/* Right — hero image + data card */}
        <div className="relative md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden border hairline">
            <img
              src={heroImg}
              alt="Макрофотография ячейки рулеточного колеса с цифрой ноль"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
          </div>

          {/* Q3 Proof Artifact — frosted data card */}
          <div
            className="absolute left-4 bottom-6 w-[88%] max-w-[360px] border border-white/10 bg-charcoal/80 p-6 backdrop-blur-md md:left-[-32px] md:bottom-12 animate-hero"
            style={{ animationDelay: "850ms" }}
          >
            <div className="flex items-center justify-between border-b hairline pb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                Live audit · ID 0042
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-brass" />
            </div>
            <div className="mt-4 font-display text-[22px] leading-tight text-silk">
              Европейская рулетка
            </div>
            <dl className="mt-5 space-y-3 font-mono text-[13px]">
              <div className="flex items-baseline justify-between">
                <dt className="text-ash">RTP</dt>
                <dd className="text-silk tabular-nums">97.30%</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-ash">House Edge</dt>
                <dd className="text-silk tabular-nums">2.70%</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-ash">Дисперсия</dt>
                <dd className="text-silk">Низкая</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-ash">Min ставка</dt>
                <dd className="text-silk tabular-nums">€0.50</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
