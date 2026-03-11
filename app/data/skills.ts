export const skills = {
  Core: ["React", "TypeScript", "Next.js"],
  StateAndData: ["Zustand", "TanStack Query"],
  Styling: ["Tailwind CSS", "Responsive UI"],
  Tools: ["GitHub", "Figma", "Vercel", "Notion"],
} as const;

export const skillCategoryLabels: Record<keyof typeof skills, string> = {
  Core: "CORE",
  StateAndData: "STATE / DATA",
  Styling: "STYLING",
  Tools: "TOOLS",
};
