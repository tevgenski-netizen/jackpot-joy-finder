# Casino·Audit — SEO-сайт обзоров казино

Independent casino review & strategy site (Russian-language). Editorial Onyx + Brass design system, full content in `src/routes/index.tsx`.

## Локальная разработка

```bash
bun install
bun run dev
```

Сайт: <http://localhost:5173>

## Деплой на GitHub Pages

В репозитории уже настроен workflow `.github/workflows/deploy.yml`, который автоматически собирает и публикует сайт.

### Один раз — включить Pages:

1. Запушьте проект в репозиторий GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Запушьте коммит в `main` — workflow соберёт сайт и опубликует его.

После первого деплоя сайт будет доступен по адресу `https://<username>.github.io/<repo>/`.

### Если репозиторий имеет имя (не `<username>.github.io`):

Pages раздаёт сайт по подпути `/<repo>/`. В этом случае измените `base` в `vite.config.ts`:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/<имя-репозитория>/",
  },
});
```

Если планируете подключить custom-домен, оставьте `base: "/"`.

### Локальная проверка статической сборки:

```bash
bun run build
bun run scripts/prerender.ts
bunx serve dist/client
```

## Что внутри

- **Hero** — пицч сайта + live-карточка с RTP европейской рулетки
- **Game Index** — обзоры 5 типов игр (слоты, блэкджек, рулетка, видеопокер, баккара)
- **Math of Risk** — визуализация RTP vs дисперсия для 8 игровых дисциплин
- **Verified Platforms** — таблица 6 платформ с лицензиями, временем выплат, классом
- **Guides** — 4 материала по стратегиям и управлению банком
- **Footer** — навигация + предупреждение об ответственной игре

## SEO

- Уникальный `<title>` и `<meta description>` через TanStack Router `head()` API
- Open Graph + Twitter Card теги
- `robots.txt` и `sitemap.xml` генерируются prerender-скриптом
- Семантическая разметка (один `<h1>`, иерархия заголовков)
- `loading="lazy"` для всех изображений кроме hero
- `alt`-атрибуты на всех изображениях

## ⚠️ Ответственная игра

Сайт содержит обязательное предупреждение 18+ и ссылку на ресурсы помощи. При локализации убедитесь, что предупреждение соответствует требованиям юрисдикции.
