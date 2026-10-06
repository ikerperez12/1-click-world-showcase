import type { DemoOutcome, DemoPoint } from "./model.ts";

export type DemoState = Readonly<{
  index: number;
  phase: "guessing" | "revealed";
  guess: DemoPoint | null;
  outcome: DemoOutcome | null;
}>;

export type DemoEvent =
  | Readonly<{ type: "place"; point: DemoPoint }>
  | Readonly<{ type: "reveal"; outcome: DemoOutcome }>
  | Readonly<{ type: "next"; total: number }>;

export function initialDemoState(): DemoState {
  return { index: 0, phase: "guessing", guess: null, outcome: null };
}

export function clampPoint(point: DemoPoint): DemoPoint {
  return {
    x: Math.min(100, Math.max(0, Number.isFinite(point.x) ? point.x : 50)),
    y: Math.min(100, Math.max(0, Number.isFinite(point.y) ? point.y : 50)),
  };
}

export function transition(state: DemoState, event: DemoEvent): DemoState {
  switch (event.type) {
    case "place":
      if (state.phase !== "guessing") return state;
      return { ...state, guess: clampPoint(event.point) };
    case "reveal":
      if (state.phase !== "guessing" || !state.guess) return state;
      return { ...state, phase: "revealed", outcome: event.outcome };
    case "next":
      if (state.phase !== "revealed" || event.total < 1) return state;
      return {
        index: (state.index + 1) % event.total,
        phase: "guessing",
        guess: null,
        outcome: null,
      };
  }
}
