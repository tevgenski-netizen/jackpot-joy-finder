import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { GameIndex } from "@/components/sections/GameIndex";
import { MathSection } from "@/components/sections/MathSection";
import { GameLoreSection } from "@/components/sections/GameLoreSection";
import { SiteFooter } from "@/components/sections/SiteFooter";

const TITLE = "Casino·Audit — Обзоры казино-игр, правила и история";
const DESC =
  "Независимый разбор азартных игр: правила, история, математика, RTP. Слоты, блэкджек, рулетка, покер и баккара — без рекламы и партнёрских ссылок.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "обзоры казино-игр, правила, история, RTP, рулетка, блэкджек, слоты, покер, баккара" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-onyx text-silk">
      <SiteHeader />
      <main>
        <Hero />
        <GameIndex />
        <MathSection />
        <GameLoreSection />
      </main>
      <SiteFooter />
    </div>
  );
}
