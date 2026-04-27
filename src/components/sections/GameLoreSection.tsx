import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

interface GameLore {
  id: string;
  era: string;
  name: string;
  origin: string;
  history: string;
  rules: string[];
}

const LORE: GameLore[] = [
  {
    id: "roulette",
    era: "1655 · Париж",
    name: "Рулетка",
    origin: "Блез Паскаль, Франция",
    history:
      "Колесо с числами появилось как побочный продукт попыток Паскаля построить вечный двигатель. К XVIII веку игра приобрела современный вид с одним «нулём». Американская версия с двойным «00» появилась в Новом Орлеане в 1800-х и до сих пор увеличивает преимущество казино почти вдвое.",
    rules: [
      "Колесо содержит 37 секторов: числа 1–36 и один «0» (европейская версия).",
      "Игрок ставит на конкретное число, цвет, чёт/нечёт, дюжину или ряд до запуска шарика.",
      "Выплата за прямую ставку на число — 35 к 1, при том что вероятность 1 к 37.",
      "Когда выпадает «0», все ставки на равные шансы (красное/чёрное и т. п.) либо проигрывают, либо «садятся в тюрьму» (правило La Partage).",
    ],
  },
  {
    id: "blackjack",
    era: "1700 · Франция",
    name: "Блэкджек",
    origin: "Vingt-et-Un, французские салоны",
    history:
      "Прародитель блэкджека — французская «Двадцать одно» XVIII века. В США игра завоевала популярность в начале XX века, когда казино стали платить бонус 10:1 за комбинацию туза пик и чёрного валета — отсюда и название «black jack». Бонус давно отменили, но имя осталось.",
    rules: [
      "Цель — собрать руку, сумма очков которой ближе к 21, чем у дилера, но не превышает 21.",
      "Туз стоит 1 или 11, картинки — 10, остальные — по номиналу.",
      "Игрок может «Hit» (взять карту), «Stand» (остановиться), «Double» (удвоить) или «Split» (разделить пару).",
      "Дилер обязан брать карту до 16 включительно и останавливаться на 17.",
      "Натуральный блэкджек (туз + 10) выплачивается 3:2 (или 6:5 в худших версиях правил).",
    ],
  },
  {
    id: "slots",
    era: "1895 · Сан-Франциско",
    name: "Слоты",
    origin: "Liberty Bell, Чарльз Фей",
    history:
      "Первый механический слот «Liberty Bell» собрал автомеханик Чарльз Фей в своей мастерской. Три барабана, пять символов, выплата в виде сигар или напитков — закон запрещал денежные призы. Электронные слоты появились в 1963 году, видео-слоты — в 1976, онлайн-слоты — в 1996.",
    rules: [
      "Барабаны вращаются независимо; результат определяется RNG ещё до анимации.",
      "Выигрышные комбинации формируются на «линиях выплат» — от 1 до 1024 в современных слотах.",
      "Заявленный RTP рассчитан на миллионах симуляций; короткая сессия может радикально отклоняться от среднего.",
      "Бонусные раунды и фриспины уже учтены в общем RTP — они не «дополнительный» выигрыш.",
    ],
  },
  {
    id: "poker",
    era: "1820 · Новый Орлеан",
    name: "Покер",
    origin: "Речные пароходы Миссисипи",
    history:
      "Покер сложился из французской Poque и немецкой Pochen, попав в Новый Орлеан в начале XIX века. На речных пароходах игра разошлась по всей Америке. Texas Hold’em — самый популярный сегодня вариант — родился в начале XX века в городке Робстаун, штат Техас, и стал известен после WSOP 1970 года.",
    rules: [
      "Каждому игроку раздаются две закрытые карты; пять общих карт открываются в три этапа: флоп, тёрн, ривер.",
      "Цель — собрать лучшую пятикарточную комбинацию из своих и общих карт.",
      "Иерархия рук: пара → две пары → сет → стрит → флэш → фулл-хаус → каре → стрит-флэш → роял-флэш.",
      "В каждом круге торгов игрок может сбросить карты, уравнять ставку или повысить.",
      "Покер — единственная игра в казино, где соперник не казино, а другие игроки; заведение берёт комиссию (рейк).",
    ],
  },
  {
    id: "baccarat",
    era: "1490 · Италия",
    name: "Баккара",
    origin: "Феличе Фалгуэрейн",
    history:
      "Игра пришла из Италии (от слова «baccara» — «ноль»), затем попала во Францию, где стала любимым развлечением аристократии. До сих пор — главная игра азиатских казино: на баккару приходится около 88% игрового дохода казино Макао.",
    rules: [
      "На столе только три ставки: «Player», «Banker» или «Tie» (ничья).",
      "Игрок и Banker получают по две карты; цель — рука с суммой ближе к 9.",
      "Десятки и картинки стоят 0; туз — 1; остальные карты — по номиналу. Если сумма превышает 9, отбрасывается первая цифра (15 → 5).",
      "Третья карта берётся по строгому регламенту, а не по решению игрока — стратегии в баккаре нет.",
      "Ставка на Banker облагается 5% комиссией с выигрыша из-за её небольшого статистического преимущества.",
    ],
  },
];

export function GameLoreSection() {
  return (
    <section id="rules" className="border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="eyebrow">§ 03 · Правила и история</div>
              <h2 className="mt-4 font-display text-[40px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[56px]">
                Откуда взялись игры, в которые мы играем.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-3">
              <p className="text-[17px] leading-[1.65] text-ash max-w-[58ch]">
                Каждая дисциплина прошла путь от салонов и пароходов до электронных столов.
                Краткая летопись, происхождение и точные правила — без воды и без рекламных вставок.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 space-y-24">
          {LORE.map((g, i) => (
            <Reveal key={g.id} delay={60}>
              <article className="grid grid-cols-1 gap-10 border-t hairline pt-12 md:grid-cols-12 md:gap-12">
                {/* Left: index + meta */}
                <div className="md:col-span-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Глава {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 font-display text-[64px] leading-none text-brass/30 tabular-nums md:text-[80px]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <dl className="mt-8 space-y-4 font-mono text-[12px]">
                    <div>
                      <dt className="text-ash uppercase tracking-[0.12em] text-[10px]">Эпоха</dt>
                      <dd className="mt-1 text-silk">{g.era}</dd>
                    </div>
                    <div>
                      <dt className="text-ash uppercase tracking-[0.12em] text-[10px]">Происхождение</dt>
                      <dd className="mt-1 text-silk">{g.origin}</dd>
                    </div>
                  </dl>
                </div>

                {/* Right: history + rules */}
                <div className="md:col-span-8 md:col-start-5">
                  <h3 className="font-display text-[36px] leading-[1.05] text-silk md:text-[48px]">
                    {g.name}
                  </h3>

                  <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div>
                      <div className="eyebrow">История</div>
                      <p className="mt-4 text-[15px] leading-[1.7] text-ash max-w-[42ch]">
                        {g.history}
                      </p>
                    </div>
                    <div>
                      <div className="eyebrow">Правила</div>
                      <ul className="mt-4 space-y-3">
                        {g.rules.map((r, ri) => (
                          <li
                            key={ri}
                            className="flex gap-4 border-l border-brass/30 pl-4 text-[14px] leading-[1.6] text-silk"
                          >
                            <span className="font-mono text-[11px] tabular-nums text-brass mt-[3px] shrink-0">
                              {String(ri + 1).padStart(2, "0")}
                            </span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/games/$gameId"
                    params={{ gameId: g.id }}
                    className="mt-10 inline-flex items-center gap-2 border-b border-brass pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-brass hover:text-silk hover:border-silk transition-colors"
                  >
                    Полный обзор «{g.name}» →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
