import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { GAMES, getGameById, type Game } from "@/data/games";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/games/$gameId")({
  loader: ({ params }) => {
    const game = getGameById(params.gameId);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const game = loaderData?.game;
    if (!game) {
      return {
        meta: [
          { title: "Игра не найдена — Casino·Compendium" },
          { name: "description", content: "Запрошенная игра не найдена в энциклопедии." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${game.name} — правила, история и математика | Casino·Compendium`;
    const desc = `${game.name}: происхождение (${game.origin}), полные правила, RTP ${game.rtp}, преимущество казино ${game.edge}. ${game.desc.slice(0, 100)}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${game.name}, правила ${game.name.toLowerCase()}, история ${game.name.toLowerCase()}, RTP, казино` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: game.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: game.image },
      ],
    };
  },
  component: GamePage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-onyx text-silk">
        <SiteHeader />
        <div className="mx-auto max-w-[800px] px-6 py-32 md:px-10">
          <div className="eyebrow">Ошибка</div>
          <h1 className="mt-4 font-display text-[40px] leading-tight text-silk">
            Не удалось загрузить главу.
          </h1>
          <p className="mt-4 text-ash">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-8 border border-brass px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-brass hover:bg-brass hover:text-onyx transition-colors"
          >
            Попробовать снова
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  },
  notFoundComponent: () => {
    const params = Route.useParams();
    return (
      <div className="min-h-screen bg-onyx text-silk">
        <SiteHeader />
        <div className="mx-auto max-w-[800px] px-6 py-32 md:px-10">
          <div className="eyebrow">404 · Глава не найдена</div>
          <h1 className="mt-4 font-display text-[40px] leading-tight text-silk md:text-[64px]">
            «{params.gameId}» нет в индексе.
          </h1>
          <p className="mt-6 text-[17px] leading-[1.65] text-ash">
            Возможно, мы ещё не добавили эту дисциплину. Вернитесь к индексу и выберите одну из пяти разобранных игр.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 border-b border-brass pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-brass hover:text-silk hover:border-silk transition-colors"
          >
            ← К индексу игр
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  },
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const idx = GAMES.findIndex((g) => g.id === game.id);
  const prev = idx > 0 ? GAMES[idx - 1] : null;
  const next = idx < GAMES.length - 1 ? GAMES[idx + 1] : null;

  return (
    <div className="min-h-screen bg-onyx text-silk">
      <SiteHeader />
      <main>
        <ChapterHero game={game} index={idx} />
        <HistorySection game={game} />
        <RulesSection game={game} />
        <StrategySection game={game} />
        <TermsSection game={game} />
        <ChapterNav prev={prev} next={next} />
      </main>
      <SiteFooter />
    </div>
  );
}

function ChapterHero({ game, index }: { game: Game; index: number }) {
  return (
    <section className="border-t hairline">
      <div className="mx-auto max-w-[1240px] px-6 pt-12 pb-20 md:px-10 md:pt-16 md:pb-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ash hover:text-brass transition-colors"
        >
          ← Индекс игр
        </Link>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass animate-hero" style={{ animationDelay: "0ms" }}>
              Глава {String(index + 1).padStart(2, "0")} · {game.subtitle.split(" · ")[1] ?? game.subtitle}
            </div>
            <h1
              className="mt-6 font-display text-[48px] leading-[1.02] tracking-[-0.02em] text-silk md:text-[88px] animate-hero"
              style={{ animationDelay: "150ms" }}
            >
              {game.name}.
            </h1>
            <p
              className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-ash animate-hero"
              style={{ animationDelay: "350ms" }}
            >
              {game.desc}
            </p>

            <dl
              className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t hairline pt-8 md:grid-cols-4 animate-hero"
              style={{ animationDelay: "550ms" }}
            >
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">RTP</dt>
                <dd className="mt-2 font-display text-[26px] leading-none text-silk tabular-nums">{game.rtp}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">House Edge</dt>
                <dd className="mt-2 font-display text-[26px] leading-none text-brass tabular-nums">{game.edge}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">Skill</dt>
                <dd className="mt-2 font-display text-[26px] leading-none text-silk">{game.skill}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">Дисперсия</dt>
                <dd className="mt-2 font-display text-[20px] leading-tight text-silk">{game.volatility}</dd>
              </div>
            </dl>
          </div>

          <div className="relative md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden border hairline">
              <img
                src={game.image}
                alt={`${game.name} — макроизображение`}
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent" />
            </div>
            <div
              className="absolute left-4 bottom-6 w-[88%] max-w-[320px] border border-white/10 bg-charcoal/85 p-5 backdrop-blur-md md:left-[-32px] md:bottom-12 animate-hero"
              style={{ animationDelay: "850ms" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                Происхождение
              </div>
              <div className="mt-3 font-display text-[18px] leading-tight text-silk">
                {game.origin}
              </div>
              <div className="mt-4 border-t hairline pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
                {game.era}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HistorySection({ game }: { game: Game }) {
  return (
    <section className="border-t hairline py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="eyebrow">§ 01 · История</div>
              <h2 className="mt-4 font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[48px]">
                Откуда пришла игра.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-[17px] leading-[1.7] text-silk max-w-[62ch]">
                {game.history}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RulesSection({ game }: { game: Game }) {
  return (
    <section className="border-t hairline py-20 md:py-28 bg-charcoal/30">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="eyebrow">§ 02 · Правила</div>
              <h2 className="mt-4 font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[48px]">
                Как это работает.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ol className="space-y-5">
                {game.rules.map((rule, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <li className="flex gap-6 border-l border-brass/30 pl-6">
                      <span className="font-mono text-[11px] tabular-nums text-brass mt-[5px] shrink-0 uppercase tracking-[0.1em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[16px] leading-[1.65] text-silk">{rule}</span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StrategySection({ game }: { game: Game }) {
  return (
    <section className="border-t hairline py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="eyebrow">§ 03 · Подход</div>
              <h2 className="mt-4 font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[48px]">
                Что говорит математика.
              </h2>
              <p className="mt-6 text-[14px] leading-[1.65] text-ash max-w-[36ch]">
                Не «секреты» и не «системы», а то, что подтверждается симуляциями и теорией вероятностей.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 gap-px bg-white/5 border hairline md:grid-cols-2">
                {game.strategy.map((s, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <div className="bg-onyx p-6 h-full">
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-brass tabular-nums">
                        Принцип · {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="mt-4 text-[15px] leading-[1.6] text-silk">{s}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TermsSection({ game }: { game: Game }) {
  return (
    <section className="border-t hairline py-20 md:py-28 bg-charcoal/30">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="eyebrow">§ 04 · Глоссарий</div>
              <h2 className="mt-4 font-display text-[36px] leading-[1.05] tracking-[-0.02em] text-silk md:text-[48px]">
                Слова, которые стоит знать.
              </h2>
            </div>
            <div className="md:col-span-8">
              <dl className="divide-y hairline border-y hairline">
                {game.terms.map((t, i) => (
                  <Reveal key={i} delay={i * 50}>
                    <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-12 md:gap-8">
                      <dt className="md:col-span-3 font-display text-[20px] leading-tight text-brass">
                        {t.term}
                      </dt>
                      <dd className="md:col-span-9 text-[15px] leading-[1.65] text-silk max-w-[58ch]">
                        {t.def}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChapterNav({ prev, next }: { prev: Game | null; next: Game | null }) {
  return (
    <section className="border-t hairline py-16">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-px bg-white/5 border hairline md:grid-cols-2">
          {prev ? (
            <Link
              to="/games/$gameId"
              params={{ gameId: prev.id }}
              className="group bg-onyx p-8 transition-colors hover:bg-charcoal"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                ← Предыдущая глава
              </div>
              <div className="mt-3 font-display text-[28px] leading-tight text-silk group-hover:text-brass transition-colors">
                {prev.name}
              </div>
            </Link>
          ) : (
            <div className="bg-onyx p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                Начало индекса
              </div>
            </div>
          )}
          {next ? (
            <Link
              to="/games/$gameId"
              params={{ gameId: next.id }}
              className="group bg-onyx p-8 transition-colors hover:bg-charcoal md:text-right"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                Следующая глава →
              </div>
              <div className="mt-3 font-display text-[28px] leading-tight text-silk group-hover:text-brass transition-colors">
                {next.name}
              </div>
            </Link>
          ) : (
            <div className="bg-onyx p-8 md:text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                Конец индекса
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
