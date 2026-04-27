import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { GameIndex } from "@/components/sections/GameIndex";
import { MathSection } from "@/components/sections/MathSection";
import { PlatformsTable } from "@/components/sections/PlatformsTable";
import { Guides } from "@/components/sections/Guides";
import { SiteFooter } from "@/components/sections/SiteFooter";

const TITLE = "Casino·Audit — Честные обзоры онлайн-казино, RTP и стратегии";
const DESC =
  "Независимый аудит онлайн-казино: реальный RTP, математика игр, проверенные платформы и гайды по стратегиям. Без партнёрских ссылок и пустых бонусов.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "обзоры казино, онлайн казино, RTP, стратегии казино, рулетка, блэкджек, слоты, видеопокер, баккара" },
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
        <PlatformsTable />
        <Guides />
      </main>
      <SiteFooter />
    </div>
  );
}
