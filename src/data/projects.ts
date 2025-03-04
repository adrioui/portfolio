// Project data types
export interface ProjectSummary {
  id: string;
  title: string;
  emojis: string[];
  description: string;
  catReview: string;
  stressLevel: number;
}

// Projects data array
export const projects: ProjectSummary[] = [
  //   {
  //     id: "cat-treat-dispenser",
  //     title: "Feline Snack Automaton 3000",
  //     emojis: ["😺", "🍪", "🤖"],
  //     description:
  //       "IoT device that uses AI to recognize when your cat is being good and dispenses treats accordingly.",
  //     catReview: "Finally, the recognition I deserve",
  //     stressLevel: 4,
  //   },
  //   {
  //     id: "bad-ideas",
  //     title: "npm install bad-ideas",
  //     emojis: ["🔥", "🤔", "⚠️"],
  //     description:
  //       "A React hook library for questionable life choices with 0% regret prevention",
  //     catReview: "Finally, the recognition I deserve",
  //     stressLevel: 4,
  //   },
  {
    id: "local-first-app",
    title: "Offline-First Dimension Hopper",
    emojis: ["📡", "📴", "🔄"],
    description: "Sync engine that works in underground bunkers",
    catReview: "Syncs naps across dimensions",
    stressLevel: 3,
  },
  {
    id: "data-management-system",
    title: "ETL Whisperer",
    emojis: ["🚰", "🤖", "🧯"],
    description: "End-to-end data management system for Excel, PDF, and more",
    catReview: "Data naps never interrupted",
    stressLevel: 5,
  },
  {
    id: "content-management-system",
    title: "Architecture Wizard",
    emojis: ["📝", "🧩", "🐹"],
    description: "Architecture docs that write themselves (almost)",
    catReview: "Blueprints make excellent napkins",
    stressLevel: 2,
  },
  {
    id: "financial-analytics",
    title: "Money Mapper",
    emojis: ["💸", "🕸️", "🧮"],
    description: "Money moves visualized in 16-bit glory",
    catReview: "Fur-tune 500 approved",
    stressLevel: 4,
  },
  {
    id: "palm-oil-management-system",
    title: "Palm Oil Sentinel",
    emojis: ["🌴", "📊", "♻️"],
    description: "Palm oil tracker greener than cat grass",
    catReview: "No palm oil in my tuna, please",
    stressLevel: 2,
  },
  {
    id: "childcare-management-system",
    title: "Daycare Guardian",
    emojis: ["🔒", "📈", "👶"],
    description: "Daycare system more secure than a laser-pointer vault",
    catReview: "Nap-time encryption certified",
    stressLevel: 3,
  },
  {
    id: "hr-management-system",
    title: "HR Cloud Core",
    emojis: ["👥", "☁️", "🚀"],
    description: "HR backend that survives AWS chaos monkeys",
    catReview: "Paw-sitive uptime, zero hairballs",
    stressLevel: 4,
  },
  {
    id: "risk-management-system",
    title: "Risk API",
    emojis: ["🌪️", "⚡", "🛡️"],
    description: "RESTful API for risk management, faster than Monday mornings",
    catReview: "Approved for 9-lives coverage",
    stressLevel: 4,
  },
  {
    id: "dashboard-engine",
    title: "Dashboard Engine",
    emojis: ["📊", "☕", "🐍"],
    description: "Analytics engine that turns coffee into dashboards",
    catReview: "Purr-fectly normalized data naps",
    stressLevel: 3,
  },
];
