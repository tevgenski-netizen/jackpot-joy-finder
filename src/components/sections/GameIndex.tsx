import { Reveal } from "@/components/Reveal";
import slotsImg from "@/assets/game-slots.jpg";
import blackjackImg from "@/assets/game-blackjack.jpg";
import rouletteImg from "@/assets/game-roulette.jpg";
import pokerImg from "@/assets/game-poker.jpg";
import baccaratImg from "@/assets/game-baccarat.jpg";

interface Game {
  id: string;
  name: string;
  subtitle: string;
  rtp: string;
  edge: string;
  volatility: string;
  skill: string;
  desc: string;
  image: string;
}

const GAMES: Game[] = [
  {
    id: "slots",
    name: "Видеослоты",
    subtitle: "Гл. 01 · Слоты",
    rtp: "92–98%",
    edge: "2.0–8.0%",
    volatility: "Низкая → Экстремальная",
    skill: "0%",
    desc: "Полностью случайный исход на основе RNG. Стратегия сводится к выбору слотов с подтверждённым RTP выше 96% и контролю банка. Любые «системы спинов» — миф.",
    image: slotsImg,
  },
  {
    id: "blackjack",
    name: "Блэкджек",
    subtitle: "Гл. 02 · Карты",
    rtp: "99.50%",
    edge: "0.50%",
    volatility: "Низкая",
    skill: "Высокая",
    desc: "Самая «честная» игра в казино при базовой стратегии. Каждое решение имеет математически оптимальный ход. Подсчёт карт даёт игроку преимущество в живых играх.",
    image: blackjackImg,
  },
  {
    id: "roulette",
    name: "Европейская рулетка",
    subtitle: "Гл. 03 · Колесо",
    rtp: "97.30%",
    edge: "2.70%",
    volatility: "Регулируемая",
    skill: "0%",
    desc: "Только 37 секторов против 38 в американской версии. Избегайте корзины из 5 номеров — её преимущество казино 7.89%. Системы Мартингейл и Д'Аламбера статистически проигрывают.",
    image: rouletteImg,
  },
  {
    id: "poker",
    name: "Видеопокер",
    subtitle: "Гл. 04 · Карты",
    rtp: "99.54%",
    edge: "0.46%",
    volatility: "Средняя",
    skill: "Высокая",
    desc: "Jacks or Better в варианте 9/6 — лучшее EV среди электронных игр. Оптимальная стратегия требует запоминания около 40 правил для пятикарточной комбинации.",
    image: pokerImg,
  },
  {
    id: "baccarat",
    name: "Баккара",
    subtitle: "Гл. 05 · Карты",
    rtp: "98.94%",
    edge: "1.06%",
    volatility: "Низкая",
    skill: "0%",
    desc: "Ставка на «Banker» — лучшая в игре, несмотря на 5% комиссию. Ставка на «Tie» имеет преимущество казино 14.4% — никогда не делайте её, какую бы статистику стола вам ни показывали.",
    image: baccaratImg,
  },
];

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
              <article className="group relative h-full bg-onyx p-8 transition-colors duration-300 hover:bg-charcoal">
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
                    className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-75"
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

                <div className="absolute inset-x-0 bottom-0 h-px bg-brass scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}

          {/* CTA tile */}
          <Reveal delay={GAMES.length * 80}>
            <div className="flex h-full flex-col justify-between bg-onyx p-8">
              <div>
                <div className="eyebrow">§ далее</div>
                <h3 className="mt-6 font-display text-[28px] leading-tight text-silk">
                  Крэпс, Sic Bo, Pai Gow и ещё 12 игр в полной библиотеке.
                </h3>
              </div>
              <a
                href="#platforms"
                className="mt-8 inline-flex items-center gap-2 border-b border-brass pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-brass hover:text-silk hover:border-silk transition-colors"
              >
                Открыть индекс →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
