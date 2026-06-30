import { INTENTIONS, STAT_META } from "./content.js";

export const INITIAL_STATS = {
  energy: 70,
  stress: 20,
  family: 50,
  morale: 45,
  creativity: 40,
  money: 120,
};

export function createInitialState() {
  return {
    version: 1,
    started: false,
    intentionId: null,
    dayIndex: 0,
    slotIndex: 0,
    stats: { ...INITIAL_STATS },
    perspective: 0,
    completedActions: [],
    log: [
      {
        title: "Monday Reset",
        text: "A new week begins. Choose what matters before the week chooses for you.",
      },
    ],
    boss: {
      active: false,
      defeated: false,
      health: 100,
      round: 0,
    },
    runComplete: false,
    ending: null,
  };
}

export function clampStats(stats) {
  const next = { ...stats };
  for (const [key, meta] of Object.entries(STAT_META)) {
    next[key] = Math.max(meta.min, Math.min(meta.max, Math.round(next[key] ?? 0)));
  }
  return next;
}

export function applyEffects(state, effects = {}) {
  const stats = { ...state.stats };
  for (const [key, amount] of Object.entries(effects)) {
    stats[key] = (stats[key] ?? 0) + amount;
  }
  return { ...state, stats: clampStats(stats) };
}

export function startRun(state, intentionId) {
  const intention = INTENTIONS.find((item) => item.id === intentionId);
  if (!intention) return state;

  let next = {
    ...state,
    started: true,
    intentionId,
    log: [
      {
        title: intention.name,
        text: intention.description,
      },
      ...state.log,
    ],
  };

  if (intention.chaos) {
    const keys = ["energy", "stress", "family", "morale", "creativity", "money"];
    const chaosEffects = Object.fromEntries(
      keys.map((key) => [key, Math.floor(Math.random() * 31) - 10]),
    );
    next = applyEffects(next, chaosEffects);
  } else {
    next = applyEffects(next, intention.effects);
  }

  return next;
}

export function addLog(state, title, text) {
  return {
    ...state,
    log: [{ title, text }, ...state.log].slice(0, 14),
  };
}

export function calculateEnding(stats) {
  if (stats.stress >= 90 || stats.energy <= 5) {
    return {
      id: "burnout",
      title: "The Burnout Ending",
      text: "You carried every problem personally until there was nothing left to spend. The next run begins with one lesson: accepting help is also progress.",
    };
  }

  if (stats.family >= 72 && stats.morale >= 58 && stats.stress < 70) {
    return {
      id: "together",
      title: "The Together Ending",
      text: "The week was imperfect, but work moved forward and the people you love still felt your presence. This is the rarest kind of successful run.",
    };
  }

  if (stats.morale >= 82) {
    return {
      id: "legacy",
      title: "The Orange Legacy",
      text: "The team finishes stronger than it started. Problems are being solved without Andy needing to become the solution to everything.",
    };
  }

  if (stats.creativity >= 82) {
    return {
      id: "creator",
      title: "Creative Awakening",
      text: "An idea survived contact with real life and became something tangible. The Threshold has noticed.",
    };
  }

  if (stats.money >= 230) {
    return {
      id: "tokyo",
      title: "Tokyo Gets Closer",
      text: "The Japan fund survives another week. Neon streets, Pokémon shops and a shared adventure move one step nearer.",
    };
  }

  return {
    id: "survivor",
    title: "Another Week Survived",
    text: "Nothing was perfectly balanced, but the run continues. Perspective gained is never completely lost.",
  };
}

export function calculatePerspective(stats) {
  const positive = stats.energy + stats.family + stats.morale + stats.creativity;
  const pressure = stats.stress;
  return Math.max(1, Math.round((positive - pressure) / 35));
}
