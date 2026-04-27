export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-onyx py-20">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="font-display text-[28px] tracking-tight text-silk">
              Casino<span className="text-brass">·</span>Compendium
            </div>
            <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-ash">
              Энциклопедия азартных игр: правила, история и математика —
              без рекламы, партнёрских ссылок и обещаний выигрыша.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="eyebrow">Игры</div>
            <ul className="mt-5 space-y-3 text-[14px] text-silk">
              <li><a href="#games" className="hover:text-brass transition-colors">Слоты</a></li>
              <li><a href="#games" className="hover:text-brass transition-colors">Блэкджек</a></li>
              <li><a href="#games" className="hover:text-brass transition-colors">Рулетка</a></li>
              <li><a href="#games" className="hover:text-brass transition-colors">Покер</a></li>
              <li><a href="#games" className="hover:text-brass transition-colors">Баккара</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Ответственная игра</div>
            <p className="mt-5 text-[13px] leading-[1.65] text-ash">
              Азартные игры могут вызывать зависимость. Установите лимиты времени и средств.
              Если игра перестала быть развлечением — обратитесь в{" "}
              <a href="https://www.gamblersanonymous.org" className="text-brass underline-offset-4 hover:underline">
                Gamblers Anonymous
              </a>
              .
            </p>
            <p className="mt-3 text-[12px] text-ash/70">18+ Только для совершеннолетних.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t hairline pt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ash md:flex-row md:items-center md:justify-between">
          <div>© 2021–2025 Casino·Compendium. Энциклопедия игр.</div>
          <div className="flex gap-6">
            <a href="#games" className="hover:text-silk">Игры</a>
            <a href="#math" className="hover:text-silk">Математика</a>
            <a href="#rules" className="hover:text-silk">История</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
