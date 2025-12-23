import { Experience } from "./components/experience/experience";
import { Projects } from "./components/projects/Projects";
import { Hero } from "./components/Hero";
import { GithubContributions } from "./components/github/GithubContributions";
import { EngineeringValues } from "./components/about/EngineeringEthics";

export default function Page() {
  return (
    <div className="mx-auto w-full">
      <Hero />
      <EngineeringValues />
      <Experience />
      <Projects />
      <GithubContributions username="Seojegyeong" />
    </div>
  );
}
