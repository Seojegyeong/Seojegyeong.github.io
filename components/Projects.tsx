const projects = [
  {
    title: "Project Name 1",
    description: "프로젝트에 대한 간단한 설명을 여기에 작성합니다. 사용한 기술과 주요 기능을 소개하세요.",
    tags: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com",
    demo: "",
  },
  {
    title: "Project Name 2",
    description: "프로젝트에 대한 간단한 설명을 여기에 작성합니다. 사용한 기술과 주요 기능을 소개하세요.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "",
  },
  {
    title: "Project Name 3",
    description: "프로젝트에 대한 간단한 설명을 여기에 작성합니다. 사용한 기술과 주요 기능을 소개하세요.",
    tags: ["React Native", "Expo", "Firebase"],
    github: "https://github.com",
    demo: "",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-4 hover:shadow-lg transition shrink-0 w-80 snap-start"
            >
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-sm font-medium">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
                >
                  GitHub →
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
