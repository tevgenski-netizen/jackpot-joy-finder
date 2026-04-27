import { Reveal } from "@/components/Reveal";

const RISK_DATA = [
  { name: "Блэкджек (баз. стратегия)", rtp: 99.5, vol: 18, edge: 0.5 },
  { name: "Видеопокер 9/6", rtp: 99.54, vol: 38, edge: 0.46 },
  { name: "Баккара · Banker", rtp: 98.94, vol: 25, edge: 1.06 },
  { name: "Европ. рулетка", rtp: 97.3, vol: 50, edge: 2.7 },
  { name: "Слот (топ 10%)", rtp: 96.5, vol: 78, edge: 3.5 },
  { name: "Амер. рулетка", rtp: 94.74, vol: 50, edge: 5.26 },
  { name: "Слот (медиана)", rtp: 92.0, vol: 85, edge: 8.0 },
  { name: "Кено", rtp: 75.0, vol: 92, edge: 25.0 },
];

export function MathSection() {
  return (
    <section id="math" className="relative border-t hairline bg-onyx py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="eyebrow">§ 02 · Математика риска</div>
              <h2 className="mt-4 font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[56px]">
                Что на самом деле значит RTP.
              </h2>
              <p className="mt-8 text-[17px] leading-[1.65] text-ash max-w-[50ch]">
                Return-to-Player — это математическое ожидание возврата ставки в долгой перспективе,
                рассчитанное на миллионах симуляций. RTP 96% означает, что из каждого поставленного
                €1 казино удерживает 4 цента <em className="text-silk not-italic">в среднем</em>.
                В отдельной сессии вы можете выиграть всё или проиграть всё — RTP описывает
                распределение, а не гарантию.
              </p>

              <div className="mt-10 space-y-6 border-l-2 border-brass/40 pl-6">
                <div>
                  <div className="eyebrow">Принцип 1</div>
                  <p className="mt-2 text-silk text-[16px] leading-[1.6]">
                    Высокий RTP сам по себе не делает игру выгодной — учитывайте дисперсию.
                  </p>
                </div>
                <div>
                  <div className="eyebrow">Принцип 2</div>
                  <p className="mt-2 text-silk text-[16px] leading-[1.6]">
                    Долгая дистанция стирает удачу: чем больше рук сыграно, тем точнее результат сходится к RTP.
                  </p>
                </div>
                <div>
                  <div className="eyebrow">Принцип 3</div>
                  <p className="mt-2 text-silk text-[16px] leading-[1.6]">
                    Граница ответственной игры — это лимит времени, а не лимит депозита.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: data viz */}
            <div className="md:col-span-7 md:pl-8">
              <div className="border hairline bg-charcoal/40 p-6 md:p-8">
                <div className="flex items-baseline justify-between border-b hairline pb-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Сравнительный график · RTP vs Дисперсия
                  </div>
                  <div className="font-mono text-[11px] tabular-nums text-ash">N = 10⁸ симуляций</div>
                </div>

                <div className="mt-8 space-y-5">
                  {RISK_DATA.map((r, i) => (
                    <Reveal key={r.name} delay={i * 60}>
                      <div>
                        <div className="flex items-baseline justify-between font-mono text-[12px]">
                          <span className="text-silk">{r.name}</span>
                          <span className="tabular-nums text-ash">
                            <span className="text-brass">{r.rtp.toFixed(2)}%</span>
                            <span className="mx-2 text-ash/40">·</span>
                            edge {r.edge.toFixed(2)}%
                          </span>
                        </div>
                        <div className="relative mt-2 h-[6px] w-full overflow-hidden bg-white/5">
                          <div
                            className="absolute inset-y-0 left-0 bg-brass"
                            style={{
                              width: `${r.rtp}%`,
                              transition: "width 1500ms cubic-bezier(0.16,1,0.3,1)",
                            }}
                          />
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                            Дисперсия
                          </span>
                          <div className="relative h-[2px] flex-1 bg-white/5">
                            <div
                              className="absolute inset-y-0 left-0 bg-ash"
                              style={{ width: `${r.vol}%` }}
                            />
                          </div>
                          <span className="font-mono text-[10px] tabular-nums text-ash">
                            {r.vol}
                          </span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <p className="mt-8 border-t hairline pt-5 font-mono text-[11px] leading-[1.7] text-ash">
                  * Расчёты основаны на оптимальной стратегии для каждой игры.
                  Реальное RTP отдельной сессии может отклоняться от ожидаемого
                  на ±15% даже на дистанции 10 000 рук.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
