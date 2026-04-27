import { Reveal } from "@/components/Reveal";

const GUIDES = [
  {
    n: "01",
    t: "Базовая стратегия блэкджека за 30 минут",
    d: "Полная таблица решений для одноколодной и шестиколодной игры. Снижает преимущество казино с 2% до 0.5%.",
    time: "30 мин чтения",
  },
  {
    n: "02",
    t: "Как читать условия бонуса",
    d: "Разбор формулы вейджера, максимальной ставки во время отыгрыша и игр-исключений. Почему «100% до €1000» часто хуже отсутствия бонуса.",
    time: "12 мин чтения",
  },
  {
    n: "03",
    t: "Управление банком: правило 1%",
    d: "Размер сессии, размер ставки, точки выхода. Превращает разовый «слив» в управляемую серию ограниченных рисков.",
    time: "18 мин чтения",
  },
  {
    n: "04",
    t: "Видеопокер: какие машины дают +EV",
    d: "Идентификация выплатных таблиц 9/6, 8/5 и 7/5. Где встречаются positive expected value автоматы и почему они почти исчезли.",
    time: "22 мин чтения",
  },
];

export function Guides() {
  return (
    <section id="guides" className="border-t hairline bg-onyx py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="eyebrow">§ 04 · Учебная программа</div>
              <h2 className="mt-4 font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[56px]">
                Гайды для тех, кто играет на дистанции.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-3">
              <p className="text-[17px] leading-[1.65] text-ash max-w-[58ch]">
                Четыре материала, которые решают 80% типичных ошибок начинающего игрока.
                Без воды, без партнёрских вставок, без обещаний выигрыша.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border hairline bg-white/5 md:grid-cols-2">
          {GUIDES.map((g, i) => (
            <Reveal key={g.n} delay={i * 80}>
              <article className="group h-full bg-onyx p-8 transition-colors duration-300 hover:bg-charcoal md:p-12">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[42px] leading-none tabular-nums text-brass/40 transition-colors group-hover:text-brass">
                    {g.n}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
                    {g.time}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[26px] leading-[1.15] text-silk md:text-[30px]">
                  {g.t}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-ash">{g.d}</p>
                <div className="mt-8 inline-flex items-center gap-2 border-b border-transparent pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-brass transition-all group-hover:border-brass">
                  Читать материал →
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
