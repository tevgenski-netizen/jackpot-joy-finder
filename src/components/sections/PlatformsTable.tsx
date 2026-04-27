import { Reveal, CountUp } from "@/components/Reveal";

interface Platform {
  name: string;
  license: string;
  withdrawal: string;
  rtp: number;
  bonus: string;
  rating: string;
}

const PLATFORMS: Platform[] = [
  { name: "Aurum House", license: "MGA / Malta", withdrawal: "< 6h", rtp: 96.82, bonus: "100% / W×35", rating: "A" },
  { name: "Verdant Club", license: "UKGC / UK", withdrawal: "< 12h", rtp: 96.41, bonus: "Cashback 10%", rating: "A" },
  { name: "Onyx & Ivory", license: "Curaçao 8048", withdrawal: "< 24h", rtp: 95.93, bonus: "150% / W×40", rating: "B+" },
  { name: "Mahogany Lounge", license: "MGA / Malta", withdrawal: "< 8h", rtp: 96.27, bonus: "Без бонусов", rating: "A−" },
  { name: "Brass Anchor", license: "Kahnawake", withdrawal: "< 48h", rtp: 95.10, bonus: "200% / W×45", rating: "B" },
  { name: "Salon Rouge", license: "Gibraltar", withdrawal: "< 6h", rtp: 96.65, bonus: "FS×100 / W×30", rating: "A" },
];

const ratingColor: Record<string, string> = {
  A: "text-brass",
  "A−": "text-brass",
  "A-": "text-brass",
  "B+": "text-silk",
  B: "text-ash",
};

export function PlatformsTable() {
  return (
    <section id="platforms" className="border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="eyebrow">§ 03 · Верифицированные платформы</div>
              <h2 className="mt-4 font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[56px]">
                Аудит, не реклама.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-3">
              <p className="text-[17px] leading-[1.65] text-ash max-w-[58ch]">
                Каждая платформа протестирована командой из 4 аудиторов на отдельных
                банкроллах в течение минимум 90 дней. RTP замерен на дистанции более
                50 000 рук. Никаких партнёрских ссылок — только проверяемые цифры.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 overflow-x-auto border hairline">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b hairline bg-charcoal/40">
                  <th className="px-6 py-5 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Платформа
                  </th>
                  <th className="px-6 py-5 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Лицензия
                  </th>
                  <th className="px-6 py-5 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Вывод
                  </th>
                  <th className="px-6 py-5 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Verified RTP
                  </th>
                  <th className="px-6 py-5 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Бонус / Вейджер
                  </th>
                  <th className="px-6 py-5 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Класс
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => (
                  <tr key={p.name} className="border-b hairline last:border-0 transition-colors hover:bg-charcoal/40">
                    <td className="px-6 py-6 font-display text-[22px] text-silk">{p.name}</td>
                    <td className="px-6 py-6 font-mono text-[12px] text-ash">{p.license}</td>
                    <td className="px-6 py-6 text-right font-mono text-[12px] tabular-nums text-silk">
                      {p.withdrawal}
                    </td>
                    <td className="px-6 py-6 text-right font-mono text-[14px] tabular-nums text-brass">
                      <CountUp to={p.rtp} decimals={2} suffix="%" />
                    </td>
                    <td className="px-6 py-6 font-mono text-[12px] text-ash">{p.bonus}</td>
                    <td className={`px-6 py-6 text-right font-display text-[22px] tabular-nums ${ratingColor[p.rating] ?? "text-silk"}`}>
                      {p.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-[60ch] font-mono text-[11px] leading-[1.7] text-ash">
            Класс A — задержки выплат не зафиксированы, RTP в пределах 0.3% от заявленного,
            прозрачные условия отыгрыша. Полный методологический отчёт публикуется
            ежеквартально.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
