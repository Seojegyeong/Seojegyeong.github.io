const activities = [
  {
    period: "2025.03 ~ 2026.02",
    title: "UMC 8·9기 WEB 챌린저",
  },
  {
    period: "2025.09 ~ 2026.01",
    title: "잇타(IT's TIME) 8기 WEB",
  },
  {
    period: "2024.08 ~ 2024.12",
    title: "교환학생 - University of Mississippi (Computer Science)",
    href: "https://olemiss.edu/",
  },
];

const certifications = [
  {
    date: "2026.09",
    title: "정보처리기사",
  },
  {
    date: "2025.01",
    title: "AWS Certified Cloud Practitioner",
  },
  {
    date: "2025.01",
    title: "OPIc IH",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* 경험 */}
          <div>
            <h2 className="text-3xl font-bold mb-10">경험</h2>
            <ul className="flex flex-col gap-6">
              {activities.map((item) => (
                <li key={item.title} className="flex gap-5">
                  <span className="text-sm text-text-subtle shrink-0 pt-0.5 w-36">
                    {item.period}
                  </span>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-text-primary hover:text-brand-blue transition-colors"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-medium text-text-primary">
                      {item.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 자격증 */}
          <div>
            <h2 className="text-3xl font-bold mb-10">자격증</h2>
            <ul className="flex flex-col gap-6">
              {certifications.map((item) => (
                <li key={item.title} className="flex gap-5">
                  <span className="text-sm text-text-subtle shrink-0 pt-0.5 w-20">
                    {item.date}
                  </span>
                  <span className="font-medium text-text-primary">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
