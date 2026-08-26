export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  media: { type: "image" | "video"; src: string }[];
};

export const projects: Project[] = [
  {
    title: "Project Name 1",
    description: "추가 예정",
    tags: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com",
    demo: "",
    media: [
      { type: "video", src: "" },
      { type: "image", src: "" },
    ],
  },
  {
    title: "Project Name 2",
    description: "추가 예정",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "",
    media: [
      { type: "video", src: "" },
      { type: "image", src: "" },
    ],
  },
  {
    title: "Project Name 3",
    description: "추가 예정",
    tags: ["React Native", "Expo", "Firebase"],
    github: "https://github.com",
    demo: "",
    media: [
      { type: "video", src: "" },
      { type: "image", src: "" },
    ],
  },
];
