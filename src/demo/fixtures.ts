import type { DemoScenario } from "./model.ts";

// All places, map points and outcomes below are invented for the interface demo.
export const demoScenarios: readonly DemoScenario[] = [
  {
    id: "demo-atlas-01",
    image: "/places/coast.svg",
    imageAlt: {
      en: "Original illustration of a bright coastal village above blue water",
      es: "Ilustración original de un pueblo costero luminoso sobre el mar azul",
    },
    caption: {
      en: "A bright coast, a winding lane, a view worth missing.",
      es: "Una costa luminosa, una calle curva y una vista para perderse.",
    },
    revealLabel: { en: "The imagined Sunward coast", es: "La imaginaria costa de Solana" },
    revealPoint: { x: 61, y: 37 },
    outcome: { displayDistanceKm: 842, displayScore: 7312, percentile: 68 },
  },
  {
    id: "demo-atlas-02",
    image: "/places/highlands.svg",
    imageAlt: {
      en: "Original illustration of a green highland lake below distant mountains",
      es: "Ilustración original de un lago verde entre montañas lejanas",
    },
    caption: {
      en: "Cool air, a still lake, and mountains keeping watch.",
      es: "Aire fresco, un lago quieto y montañas que miran.",
    },
    revealLabel: { en: "The fictional Vale of Aster", es: "El ficticio valle de Aster" },
    revealPoint: { x: 48, y: 54 },
    outcome: { displayDistanceKm: 1260, displayScore: 6240, percentile: 54 },
  },
  {
    id: "demo-atlas-03",
    image: "/places/market.svg",
    imageAlt: {
      en: "Original illustration of a quiet market street with warm-colored buildings",
      es: "Ilustración original de una calle tranquila con edificios de tonos cálidos",
    },
    caption: {
      en: "Warm stone, open windows, and a market waking up.",
      es: "Piedra cálida, ventanas abiertas y un mercado que despierta.",
    },
    revealLabel: { en: "The made-up town of Bellwether", es: "La inventada villa de Campana" },
    revealPoint: { x: 72, y: 63 },
    outcome: { displayDistanceKm: 417, displayScore: 8580, percentile: 81 },
  },
];
