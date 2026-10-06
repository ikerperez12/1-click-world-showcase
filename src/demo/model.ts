export type DemoPoint = Readonly<{ x: number; y: number }>;

export type DemoOutcome = Readonly<{
  displayDistanceKm: number;
  displayScore: number;
  percentile: number;
}>;

export type DemoScenario = Readonly<{
  id: string;
  image: string;
  imageAlt: Readonly<{ en: string; es: string }>;
  caption: Readonly<{ en: string; es: string }>;
  revealLabel: Readonly<{ en: string; es: string }>;
  revealPoint: DemoPoint;
  outcome: DemoOutcome;
}>;

export type DemoAction = Readonly<{ guess: DemoPoint }>;

export interface DemoGameService {
  loadScenario(index: number): Promise<DemoScenario>;
  submitAction(scenarioId: string, action: DemoAction): Promise<DemoOutcome>;
}
