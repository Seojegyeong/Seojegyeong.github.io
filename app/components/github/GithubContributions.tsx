"use client";

import { GitHubCalendar } from "react-github-calendar";
import { cn } from "@/app/lib/cn";
import { Github } from "lucide-react";
import { Section } from "../ui/Section";

type Props = {
  username: string;
  className?: string;
};

export function GithubContributions({ username, className }: Props) {
  const tossTheme = {
    light: ["#f2f4f6", "#d1e2ff", "#70a5ff", "#3385ff", "#0064ff"],
    dark: ["#f2f4f6", "#d1e2ff", "#70a5ff", "#3385ff", "#0064ff"],
  };

  return (
    <Section
      className={cn("relative rounded-4xl", "px-8 py-10 sm:px-10", className)}
    >
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              GitHub Contributions
            </h2>
            <p className="mt-0.5 text-[14px] font-medium text-[#8b95a1]">
              @{username}
            </p>
          </div>
        </div>
      </header>

      <div className="flex justify-start overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-max flex justify-start">
          <GitHubCalendar
            username={username}
            blockSize={13}
            blockMargin={5}
            blockRadius={3}
            fontSize={12}
            theme={tossTheme}
            colorScheme="light"
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      </div>
    </Section>
  );
}
