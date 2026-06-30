export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const SLOTS = ["Morning", "Day", "Evening"];

export const STAT_META = {
  energy: { label: "Energy", icon: "⚡", min: 0, max: 100 },
  stress: { label: "Stress", icon: "🌀", min: 0, max: 100 },
  family: { label: "Family", icon: "🏠", min: 0, max: 100 },
  morale: { label: "Team", icon: "🤝", min: 0, max: 100 },
  creativity: { label: "Creativity", icon: "✦", min: 0, max: 100 },
  money: { label: "Money", icon: "£", min: 0, max: 9999 },
};

export const INTENTIONS = [
  {
    id: "family",
    name: "Family First",
    description: "Protect the moments that make the week worth surviving.",
    effects: { family: 15, energy: 5, morale: -5 },
  },
  {
    id: "forecast",
    name: "Crush the Forecast",
    description: "Push the venue hard and pray payroll behaves.",
    effects: { morale: 15, money: 25, stress: 10 },
  },
  {
    id: "creative",
    name: "Creative Awakening",
    description: "Make something real before another idea steals the spotlight.",
    effects: { creativity: 20, energy: -5, stress: 5 },
  },
  {
    id: "recovery",
    name: "Recovery Week",
    description: "Sleep, reset and stop treating exhaustion like a personality trait.",
    effects: { energy: 20, stress: -15, money: -15 },
  },
  {
    id: "main-character",
    name: "Main Character Energy",
    description: "A little progress everywhere. A sensible plan, suspiciously.",
    effects: { energy: 5, family: 5, morale: 5, creativity: 5, stress: 5 },
  },
  {
    id: "chaos",
    name: "Absolute Chaos",
    description: "Random bonuses. Random consequences. No refunds.",
    effects: {},
    chaos: true,
  },
];

export const ACTIVITIES = [
  {
    id: "work",
    title: "Run the Orange Tree",
    description: "Lead the shift, solve three problems and inherit two more.",
    effects: { energy: -15, stress: 12, morale: 13, money: 22 },
  },
  {
    id: "coach",
    title: "Coach the Team",
    description: "Develop people instead of personally fighting every fire.",
    effects: { energy: -9, stress: -2, morale: 17, money: 5 },
  },
  {
    id: "family",
    title: "Family Time",
    description: "Put the phone down and be fully present with Becky, Isla and Quinn.",
    effects: { energy: -6, stress: -12, family: 18, money: -8 },
  },
  {
    id: "minecraft",
    title: "Minecraft Quest Night",
    description: "Complete one objective. Accidentally begin a six-hour building project.",
    effects: { energy: -7, stress: -9, family: 12, creativity: 7 },
  },
  {
    id: "create",
    title: "Create Something",
    description: "Write music, develop THRESHOLD or improve the game itself.",
    effects: { energy: -12, stress: 3, creativity: 20 },
  },
  {
    id: "recover",
    title: "Actually Rest",
    description: "Eat properly, switch off and get some sleep before midnight.",
    effects: { energy: 24, stress: -18, creativity: -2 },
  },
  {
    id: "japan",
    title: "Build the Japan Fund",
    description: "Plan Tokyo and protect money from side-quest purchases.",
    effects: { energy: -4, stress: -3, family: 5, money: 15 },
  },
  {
    id: "anime",
    title: "Anime Night",
    description: "One episode becomes four, but everyone needed the reset.",
    effects: { energy: -5, stress: -10, family: 10, creativity: 5 },
  },
];

export const RANDOM_EVENTS = [
  {
    id: "call-in",
    title: "The Call-In",
    text: "A message arrives before breakfast: someone cannot make tonight's shift.",
    effects: { energy: -5, stress: 10, morale: -4 },
  },
  {
    id: "review",
    title: "Named Five-Star Review",
    text: "A guest names a team member and praises the whole experience.",
    effects: { stress: -6, morale: 10, money: 5 },
  },
  {
    id: "dinner",
    title: "The Dinner Question",
    text: "Becky asks what you want for dinner. Against all odds, you make a decision.",
    effects: { stress: -5, family: 6 },
  },
  {
    id: "cooler",
    title: "Not an Ice Bucket",
    text: "Someone has used the wine cooler for sanitiser spray. Again.",
    effects: { stress: 6, morale: -2 },
  },
  {
    id: "quinn-build",
    title: "Dad, Look What I Made",
    text: "Quinn reveals a Minecraft build that is both confusing and genuinely brilliant.",
    effects: { family: 8, creativity: 5, stress: -4 },
  },
  {
    id: "new-project",
    title: "New Project at 1:00 AM",
    text: "A perfect idea appears at the least responsible possible time.",
    effects: { creativity: 12, energy: -10, stress: 4 },
  },
  {
    id: "smooth-shift",
    title: "Suspiciously Smooth Service",
    text: "The team communicates, the kitchen flows and nobody needs rescuing.",
    effects: { morale: 9, energy: 4, stress: -8, money: 8 },
  },
  {
    id: "payroll",
    title: "Forecast Refocused",
    text: "Head office changes the sales forecast after the rota is already live.",
    effects: { stress: 11, energy: -4, morale: -3 },
  },
  {
    id: "aot",
    title: "Attack on Titan Theory",
    text: "Isla notices a detail that makes the entire plot feel more suspicious.",
    effects: { family: 7, creativity: 6, stress: -3 },
  },
  {
    id: "rare-card",
    title: "Binder Treasure",
    text: "A forgotten card looks much more valuable than expected.",
    effects: { money: 18, creativity: 3 },
  },
];

export const BOSS_ACTIONS = [
  {
    id: "delegate",
    title: "Delegate & Direct",
    description: "Use the team properly instead of becoming the whole operation.",
    damage: 32,
    effects: { energy: -7, stress: 4, morale: 7 },
  },
  {
    id: "section",
    title: "Jump on Section",
    description: "Maximum immediate impact. Maximum personal cost.",
    damage: 45,
    effects: { energy: -16, stress: 12, morale: 3 },
  },
  {
    id: "recover",
    title: "Guest Recovery",
    description: "Protect sentiment, buy breathing room and stabilise the floor.",
    damage: 24,
    effects: { energy: -5, stress: -3, morale: 4, money: -10 },
  },
];
