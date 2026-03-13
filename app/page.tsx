import { Suspense } from "react";
import { Hero } from "@/app/components/sections/Hero";
import { Skills } from "@/app/components/sections/Skills";
import { Experience } from "@/app/components/sections/Experience";
import { Projects } from "@/app/components/sections/Projects";
import { GithubContributions } from "@/app/components/sections/GithubContributions";
import { ErrorBoundary } from "@/app/components/ui/ErrorBoundary";

export default function Page() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <ErrorBoundary>
        <Suspense>
          <GithubContributions username="Seojegyeong" />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
