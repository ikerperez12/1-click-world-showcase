import assert from "node:assert/strict";
import test from "node:test";
import { demoScenarios } from "../src/demo/fixtures.ts";
import { FixtureGameService } from "../src/demo/fixture-service.ts";
import { clampPoint, initialDemoState, transition } from "../src/demo/state.ts";

test("pin input stays finite and within the illustrated map", () => {
  assert.deepEqual(clampPoint({ x: -12, y: 140 }), { x: 0, y: 100 });
  assert.deepEqual(clampPoint({ x: Number.NaN, y: Number.POSITIVE_INFINITY }), { x: 50, y: 50 });
});

test("the demo moves from a guess to a fixed reveal and advances", async () => {
  const service = new FixtureGameService();
  let state = initialDemoState();
  state = transition(state, { type: "place", point: { x: 25, y: 75 } });
  assert.equal(state.phase, "guessing");
  assert.deepEqual(state.guess, { x: 25, y: 75 });

  const outcome = await service.submitAction(demoScenarios[0].id, { guess: state.guess! });
  state = transition(state, { type: "reveal", outcome });
  assert.equal(state.phase, "revealed");
  assert.equal(state.outcome?.displayDistanceKm, 842);

  state = transition(state, { type: "next", total: demoScenarios.length });
  assert.deepEqual(state, { index: 1, phase: "guessing", guess: null, outcome: null });
});

test("the fixture adapter rejects invalid pins and unknown scene names", async () => {
  const service = new FixtureGameService();
  await assert.rejects(
    service.submitAction(demoScenarios[0].id, { guess: { x: 101, y: 50 } }),
    RangeError,
  );
  await assert.rejects(
    service.submitAction("not-a-scene", { guess: { x: 50, y: 50 } }),
    RangeError,
  );
});

test("the reveal is a precomputed fixture and does not vary with the pin", async () => {
  const service = new FixtureGameService();
  const first = await service.submitAction(demoScenarios[0].id, { guess: { x: 2, y: 4 } });
  const second = await service.submitAction(demoScenarios[0].id, { guess: { x: 91, y: 80 } });
  assert.deepEqual(first, second);
});
