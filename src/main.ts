import { copy, type Language } from "./copy.ts";
import { FixtureGameService } from "./demo/fixture-service.ts";
import { demoScenarios } from "./demo/fixtures.ts";
import { initialDemoState, transition, type DemoState } from "./demo/state.ts";

const service = new FixtureGameService();
let gameState: DemoState = initialDemoState();
let language: Language = "en";
let scenarioIndex = 0;

const mapButton = document.querySelector<HTMLButtonElement>("[data-map]");
const revealButton = document.querySelector<HTMLButtonElement>("[data-reveal]");
const nextButton = document.querySelector<HTMLButtonElement>("[data-next]");
const eastSlider = document.querySelector<HTMLInputElement>("[data-pin-east]");
const southSlider = document.querySelector<HTMLInputElement>("[data-pin-south]");
const resultPanel = document.querySelector<HTMLElement>("[data-result]");
const sceneImage = document.querySelector<HTMLImageElement>("[data-scene-image]");
const sceneCaption = document.querySelector<HTMLElement>("[data-scene-caption]");
const sceneNumber = document.querySelector<HTMLElement>("[data-scene-number]");
const sceneTotal = document.querySelector<HTMLElement>("[data-scene-total]");
const guessPin = document.querySelector<HTMLElement>("[data-guess-pin]");
const revealPin = document.querySelector<HTMLElement>("[data-reveal-pin]");
const routeLine = document.querySelector<SVGLineElement>("[data-route-line]");
const demoStatus = document.querySelector<HTMLElement>("[data-demo-status]");
const languageToggle = document.querySelector<HTMLButtonElement>("[data-language-toggle]");
const mainNav = document.querySelector<HTMLElement>("[data-main-nav]");
const demoRoot = document.querySelector<HTMLElement>("[data-demo]");
const pinControls = document.querySelector<HTMLElement>("[data-pin-controls]");
const revealLabel = document.querySelector<HTMLElement>("[data-reveal-label]");
const resultDistance = document.querySelector<HTMLElement>("[data-result-distance]");
const resultScore = document.querySelector<HTMLElement>("[data-result-score]");
const resultPercentile = document.querySelector<HTMLElement>("[data-result-percentile]");

function must<T extends Element>(element: T | null, name: string): T {
  if (!element) throw new Error("Missing showcase element: " + name);
  return element;
}

const ui = {
  map: must(mapButton, "map"),
  reveal: must(revealButton, "reveal"),
  next: must(nextButton, "next"),
  east: must(eastSlider, "east slider"),
  south: must(southSlider, "south slider"),
  result: must(resultPanel, "result panel"),
  image: must(sceneImage, "scene image"),
  caption: must(sceneCaption, "scene caption"),
  number: must(sceneNumber, "scene number"),
  total: must(sceneTotal, "scene total"),
  guess: must(guessPin, "guess pin"),
  target: must(revealPin, "reveal pin"),
  line: must(routeLine, "route line"),
  status: must(demoStatus, "demo status"),
  language: must(languageToggle, "language toggle"),
  nav: must(mainNav, "main navigation"),
  demo: must(demoRoot, "offline demo"),
  pinControls: must(pinControls, "pin controls"),
  revealLabel: must(revealLabel, "reveal label"),
  distance: must(resultDistance, "result distance"),
  score: must(resultScore, "result score"),
  percentile: must(resultPercentile, "result percentile"),
};

let scenario = await service.loadScenario(scenarioIndex);

function setLanguage(next: Language): void {
  language = next;
  document.documentElement.lang = language;
  for (const element of document.querySelectorAll<HTMLElement>("[data-copy]")) {
    const key = element.dataset.copy;
    const translated = key ? copy[language][key] : undefined;
    if (translated) element.textContent = translated;
  }
  ui.language.textContent = language === "en" ? "ES" : "EN";
  ui.language.setAttribute(
    "aria-label",
    language === "en" ? "Cambiar idioma a español" : "Switch language to English",
  );
  ui.nav.setAttribute("aria-label", copy[language].navLabel);
  ui.demo.setAttribute("aria-label", copy[language].demoAria);
  for (const image of document.querySelectorAll<HTMLImageElement>("[data-gallery-image]")) {
    image.alt = language === "en" ? image.dataset.altEn ?? "" : image.dataset.altEs ?? "";
  }
  ui.map.setAttribute("aria-label", copy[language][mapAriaKey()]);
  ui.pinControls.setAttribute("aria-label", copy[language].pinControls);
  ui.image.alt = scenario.imageAlt[language];
  render();
}

function mapAriaKey(): "mapButton" | "mapButtonPlaced" | "mapButtonRevealed" {
  if (gameState.phase === "revealed") return "mapButtonRevealed";
  return gameState.guess ? "mapButtonPlaced" : "mapButton";
}

function render(): void {
  ui.number.textContent = String(scenarioIndex + 1).padStart(2, "0");
  ui.total.textContent = String(demoScenarios.length).padStart(2, "0");
  ui.image.src = scenario.image;
  ui.image.alt = scenario.imageAlt[language];
  ui.caption.textContent = scenario.caption[language];

  const guess = gameState.guess;
  ui.guess.hidden = !guess;
  ui.target.hidden = gameState.phase !== "revealed";
  ui.result.hidden = gameState.phase !== "revealed";
  ui.map.setAttribute("aria-pressed", String(Boolean(guess)));
  ui.map.setAttribute("aria-label", copy[language][mapAriaKey()]);
  ui.reveal.disabled = !guess || gameState.phase === "revealed";
  ui.east.disabled = !guess || gameState.phase === "revealed";
  ui.south.disabled = !guess || gameState.phase === "revealed";

  if (guess) {
    ui.guess.style.left = guess.x + "%";
    ui.guess.style.top = guess.y + "%";
    ui.east.value = String(Math.round(guess.x));
    ui.south.value = String(Math.round(guess.y));
  }

  if (gameState.phase === "revealed") {
    ui.target.style.left = scenario.revealPoint.x + "%";
    ui.target.style.top = scenario.revealPoint.y + "%";
    ui.line.setAttribute("x1", String((guess?.x ?? 50) * 6.4));
    ui.line.setAttribute("y1", String((guess?.y ?? 50) * 3.6));
    ui.line.setAttribute("x2", String(scenario.revealPoint.x * 6.4));
    ui.line.setAttribute("y2", String(scenario.revealPoint.y * 3.6));
    ui.revealLabel.textContent = scenario.revealLabel[language];
    ui.distance.textContent = new Intl.NumberFormat(language).format(
      gameState.outcome!.displayDistanceKm,
    );
    ui.score.textContent = new Intl.NumberFormat(language).format(
      gameState.outcome!.displayScore,
    );
    ui.percentile.textContent = String(gameState.outcome!.percentile);
    ui.status.textContent = copy[language].statusRevealed;
  } else {
    ui.line.setAttribute("x1", "0");
    ui.line.setAttribute("y1", "0");
    ui.line.setAttribute("x2", "0");
    ui.line.setAttribute("y2", "0");
    ui.status.textContent = guess
      ? copy[language].statusPlaced
      : copy[language].statusWaiting;
  }
}

function placeAt(x: number, y: number): void {
  gameState = transition(gameState, { type: "place", point: { x, y } });
  render();
}

ui.map.addEventListener("click", (event) => {
  const bounds = ui.map.getBoundingClientRect();
  if (event.detail === 0) {
    placeAt(50, 50);
    return;
  }
  placeAt(
    ((event.clientX - bounds.left) / bounds.width) * 100,
    ((event.clientY - bounds.top) / bounds.height) * 100,
  );
});

ui.east.addEventListener("input", () => {
  placeAt(Number(ui.east.value), gameState.guess?.y ?? 50);
});

ui.south.addEventListener("input", () => {
  placeAt(gameState.guess?.x ?? 50, Number(ui.south.value));
});

ui.reveal.addEventListener("click", async () => {
  if (!gameState.guess) return;
  try {
    const outcome = await service.submitAction(scenario.id, { guess: gameState.guess });
    gameState = transition(gameState, { type: "reveal", outcome });
    render();
  } catch {
    ui.status.textContent = copy[language].statusError;
  }
});

ui.next.addEventListener("click", async () => {
  gameState = transition(gameState, { type: "next", total: demoScenarios.length });
  scenarioIndex = gameState.index;
  scenario = await service.loadScenario(scenarioIndex);
  render();
  ui.map.focus();
});

ui.language.addEventListener("click", () => {
  setLanguage(language === "en" ? "es" : "en");
});

setLanguage(language);
