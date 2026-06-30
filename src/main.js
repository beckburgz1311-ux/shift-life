import {
  ACTIVITIES,
  BOSS_ACTIONS,
  DAYS,
  INTENTIONS,
  RANDOM_EVENTS,
  SLOTS,
  STAT_META,
} from "./game/content.js";
import {
  addLog,
  applyEffects,
  calculateEnding,
  calculatePerspective,
  createInitialState,
  startRun,
} from "./game/state.js";
import { clearSave, hasSave, loadGame, saveGame } from "./game/save.js";

const app = document.querySelector("#app");
let state = createInitialState();

function formatEffect(key, amount) {
  const sign = amount > 0 ? "+" : "";
  return `${STAT_META[key]?.icon ?? ""} ${sign}${amount}`;
}

function effectBad(key, amount) {
  return key === "stress" ? amount > 0 : amount < 0;
}

function renderEffects(effects) {
  return Object.entries(effects)
    .map(
      ([key, amount]) =>
        `<span class="effect ${effectBad(key, amount) ? "bad" : "good"}">${formatEffect(key, amount)}</span>`,
    )
    .join("");
}

function statPercentage(key, value) {
  const max = STAT_META[key].max;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

function renderStats() {
  return Object.entries(STAT_META)
    .map(([key, meta]) => {
      const value = state.stats[key];
      const danger = key === "stress" ? value >= 75 : key !== "money" && value <= 20;
      return `
        <article class="stat-card ${danger ? "danger" : ""}">
          <div class="stat-heading"><span>${meta.icon} ${meta.label}</span><strong>${key === "money" ? `£${value}` : value}</strong></div>
          <div class="meter"><span style="width:${statPercentage(key, value)}%"></span></div>
        </article>`;
    })
    .join("");
}

function renderStart() {
  app.innerHTML = `
    <main class="shell start-screen">
      <section class="hero panel">
        <p class="eyebrow">A PERSONAL LIFE ROGUELITE</p>
        <h1>SHIFT<span>//</span>LIFE</h1>
        <p class="lede">Every week is a run. Every choice spends something.</p>
        <div class="intro-copy">
          <p>Balance the Orange Tree, Becky, Isla, Quinn, creativity, recovery and the long road to Japan.</p>
          <p>You cannot maximise everything. That is the game.</p>
        </div>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">MONDAY RESET</p>
            <h2>Choose this week's intention</h2>
          </div>
          ${hasSave() ? '<button class="secondary" data-action="load">Continue saved run</button>' : ""}
        </div>
        <div class="choice-grid">
          ${INTENTIONS.map(
            (intention) => `
              <button class="choice-card" data-intention="${intention.id}">
                <strong>${intention.name}</strong>
                <span>${intention.description}</span>
                <small>${intention.chaos ? "???" : renderEffects(intention.effects)}</small>
              </button>`,
          ).join("")}
        </div>
      </section>
    </main>`;
}

function renderActivityCard(activity) {
  return `
    <button class="activity-card" data-activity="${activity.id}">
      <span class="activity-title">${activity.title}</span>
      <span class="activity-copy">${activity.description}</span>
      <span class="effects">${renderEffects(activity.effects)}</span>
    </button>`;
}

function renderBoss() {
  const health = Math.max(0, state.boss.health);
  return `
    <section class="boss panel">
      <p class="eyebrow">WEEKLY BOSS</p>
      <h2>Saturday Night Service</h2>
      <p>Three hundred covers. The printer is screaming. Table 24 has developed a new allergy.</p>
      <div class="boss-health">
        <div><strong>Service Pressure</strong><span>${health}/100</span></div>
        <div class="meter boss-meter"><span style="width:${health}%"></span></div>
      </div>
      <div class="choice-grid boss-actions">
        ${BOSS_ACTIONS.map(
          (action) => `
            <button class="choice-card" data-boss-action="${action.id}">
              <strong>${action.title}</strong>
              <span>${action.description}</span>
              <small>⚔ −${action.damage} pressure · ${renderEffects(action.effects)}</small>
            </button>`,
        ).join("")}
      </div>
    </section>`;
}

function renderRunComplete() {
  const earned = calculatePerspective(state.stats);
  return `
    <section class="ending panel">
      <p class="eyebrow">RUN COMPLETE</p>
      <h2>${state.ending.title}</h2>
      <p class="ending-copy">${state.ending.text}</p>
      <div class="reward">✦ Perspective gained: <strong>${earned}</strong></div>
      <div class="ending-actions">
        <button class="primary" data-action="new-run">Begin another run</button>
        <button class="secondary" data-action="clear">Delete save</button>
      </div>
    </section>`;
}

function renderGame() {
  const day = DAYS[state.dayIndex] ?? "Run Complete";
  const slot = SLOTS[state.slotIndex] ?? "";
  const intention = INTENTIONS.find((item) => item.id === state.intentionId);

  app.innerHTML = `
    <main class="shell">
      <header class="topbar panel">
        <div>
          <p class="eyebrow">SHIFT//LIFE</p>
          <h1>${day} <span>${slot}</span></h1>
        </div>
        <div class="top-actions">
          <span class="intention-badge">${intention?.name ?? "No intention"}</span>
          <button class="secondary" data-action="save">Save</button>
          <button class="ghost" data-action="reset">Reset</button>
        </div>
      </header>

      <section class="stats-grid">${renderStats()}</section>

      ${
        state.runComplete
          ? renderRunComplete()
          : state.boss.active
            ? renderBoss()
            : `
              <section class="panel action-panel">
                <div class="section-heading">
                  <div>
                    <p class="eyebrow">CHOOSE ONE</p>
                    <h2>How do you spend this part of the day?</h2>
                  </div>
                  <span class="run-progress">${state.completedActions.length}/21 actions</span>
                </div>
                <div class="activity-grid">${ACTIVITIES.map(renderActivityCard).join("")}</div>
              </section>`
      }

      <section class="panel log-panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">RUN LOG</p>
            <h2>What happened</h2>
          </div>
          <strong>✦ ${state.perspective} Perspective</strong>
        </div>
        <div class="log-list">
          ${state.log
            .map(
              (entry) => `
                <article>
                  <strong>${entry.title}</strong>
                  <p>${entry.text}</p>
                </article>`,
            )
            .join("")}
        </div>
      </section>
    </main>`;
}

function render() {
  if (!state.started) renderStart();
  else renderGame();
}

function maybeRandomEvent(nextState) {
  if (Math.random() > 0.38) return nextState;
  const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
  return addLog(applyEffects(nextState, event.effects), event.title, event.text);
}

function advanceTime(nextState) {
  let dayIndex = nextState.dayIndex;
  let slotIndex = nextState.slotIndex + 1;

  if (slotIndex >= SLOTS.length) {
    slotIndex = 0;
    dayIndex += 1;
  }

  nextState = { ...nextState, dayIndex, slotIndex };

  if (dayIndex === 5 && slotIndex === 2 && !nextState.boss.defeated) {
    return {
      ...nextState,
      boss: { ...nextState.boss, active: true },
    };
  }

  if (dayIndex >= DAYS.length) {
    const ending = calculateEnding(nextState.stats);
    const perspective = calculatePerspective(nextState.stats);
    return {
      ...nextState,
      dayIndex: DAYS.length - 1,
      slotIndex: SLOTS.length - 1,
      runComplete: true,
      ending,
      perspective: nextState.perspective + perspective,
    };
  }

  return nextState;
}

function chooseActivity(activityId) {
  const activity = ACTIVITIES.find((item) => item.id === activityId);
  if (!activity || state.runComplete || state.boss.active) return;

  let next = applyEffects(state, activity.effects);
  next = addLog(next, activity.title, `${DAYS[state.dayIndex]} ${SLOTS[state.slotIndex]}: ${activity.description}`);
  next = {
    ...next,
    completedActions: [
      ...next.completedActions,
      { activityId, day: state.dayIndex, slot: state.slotIndex },
    ],
  };
  next = maybeRandomEvent(next);
  state = advanceTime(next);
  saveGame(state);
  render();
}

function chooseBossAction(actionId) {
  const action = BOSS_ACTIONS.find((item) => item.id === actionId);
  if (!action || !state.boss.active) return;

  let next = applyEffects(state, action.effects);
  const incomingPressure = Math.max(2, 12 - Math.floor(next.stats.morale / 12));
  next = applyEffects(next, { stress: incomingPressure, energy: -Math.ceil(incomingPressure / 3) });

  const boss = {
    ...next.boss,
    health: Math.max(0, next.boss.health - action.damage),
    round: next.boss.round + 1,
  };

  next = addLog(
    { ...next, boss },
    action.title,
    `You reduce service pressure by ${action.damage}. The shift pushes back for ${incomingPressure} stress.`,
  );

  if (boss.health <= 0) {
    next = applyEffects(next, { morale: 14, money: 25, stress: -8 });
    next = addLog(next, "Boss Defeated", "Saturday service lands safely. The team earned the win together.");
    next = {
      ...next,
      boss: { ...boss, active: false, defeated: true, health: 0 },
    };
    next = advanceTime(next);
  }

  state = next;
  saveGame(state);
  render();
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const intentionId = target.dataset.intention;
  if (intentionId) {
    state = startRun(createInitialState(), intentionId);
    saveGame(state);
    render();
    return;
  }

  const activityId = target.dataset.activity;
  if (activityId) {
    chooseActivity(activityId);
    return;
  }

  const bossActionId = target.dataset.bossAction;
  if (bossActionId) {
    chooseBossAction(bossActionId);
    return;
  }

  switch (target.dataset.action) {
    case "save":
      saveGame(state);
      state = addLog(state, "Run Saved", "Your current timeline has been secured in this browser.");
      render();
      break;
    case "load": {
      const saved = loadGame();
      if (saved) state = saved;
      render();
      break;
    }
    case "reset":
      state = createInitialState();
      render();
      break;
    case "new-run": {
      const perspective = state.perspective;
      state = { ...createInitialState(), perspective };
      saveGame(state);
      render();
      break;
    }
    case "clear":
      clearSave();
      state = createInitialState();
      render();
      break;
    default:
      break;
  }
});

render();
