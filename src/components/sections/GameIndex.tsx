import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { GAMES } from "@/data/games";

export function GameIndex() {
  return (
    <section id="games" className="border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="eyebrow">§ 01 · Индекс игр</div>
              <h2 className="mt-4 font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[56px]">
                Пять дисциплин риска.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 md:pt-3">
              <p className="text-[17px] leading-[1.65] text-ash max-w-[58ch]">
                Перед тем, как сделать первую ставку, изучите математическое ожидание выбранной игры.
                Разница между блэкджеком и рулеткой — это разница между потерей €0.50 и €2.70 на каждые
                поставленные €100 в долгой перспективе.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border hairline bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g, i) => (
            <Reveal key={g.id} delay={i * 80}>
              <Link
                to="/games/$gameId"
                params={{ gameId: g.id }}
                className="group relative block h-full bg-onyx p-8 transition-colors duration-300 hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              >
                <article>
                  <div className="flex items-start justify-between border-b hairline pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                      {g.subtitle}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-ash">
                      RTP {g.rtp}
                    </span>
                  </div>

                  <div className="mt-6 aspect-[4/3] overflow-hidden border hairline">
                    <img
                      src={g.image}
                      alt={`${g.name} — макроизображение`}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:brightness-75 group-hover:scale-[1.02]"
                    />
                  </div>

                  <h3 className="mt-6 font-display text-[28px] leading-tight text-silk">
                    {g.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-ash">{g.desc}</p>

                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t hairline pt-5 font-mono text-[12px]">
                    <div>
                      <dt className="text-ash uppercase tracking-[0.1em] text-[10px]">Edge</dt>
                      <dd className="mt-1 text-silk tabular-nums">{g.edge}</dd>
                    </div>
                    <div>
                      <dt className="text-ash uppercase tracking-[0.1em] text-[10px]">Skill</dt>
                      <dd className="mt-1 text-silk">{g.skill}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-ash uppercase tracking-[0.1em] text-[10px]">Дисперсия</dt>
                      <dd className="mt-1 text-silk">{g.volatility}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-center justify-between border-t hairline pt-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass">
                      Полный обзор
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-[14px] text-brass transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </article>

                <div className="absolute inset-x-0 bottom-0 h-px bg-brass scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
