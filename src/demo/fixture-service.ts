import { demoScenarios } from "./fixtures.ts";
import type { DemoAction, DemoGameService, DemoOutcome } from "./model.ts";

export class FixtureGameService implements DemoGameService {
  async loadScenario(index: number) {
    const safeIndex = ((Math.trunc(index) % demoScenarios.length) + demoScenarios.length) % demoScenarios.length;
    return demoScenarios[safeIndex];
  }

  async submitAction(scenarioId: string, action: DemoAction): Promise<DemoOutcome> {
    const scenario = demoScenarios.find((item) => item.id === scenarioId);
    if (!scenario) throw new RangeError("Unknown demo scene");
    if (
      !Number.isFinite(action.guess.x) ||
      !Number.isFinite(action.guess.y) ||
      action.guess.x < 0 ||
      action.guess.x > 100 ||
      action.guess.y < 0 ||
      action.guess.y > 100
    ) {
      throw new RangeError("Pin position must be between 0 and 100");
    }

    // ponytail: fixed display fixtures, no scoring formula; add no game engine to a gallery demo.
    return { ...scenario.outcome };
  }
}
