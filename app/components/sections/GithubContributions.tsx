"use client";

import { GitHubCalendar } from "react-github-calendar";
import type { ThemeInput } from "react-activity-calendar";
import { Github } from "lucide-react";
import { Section } from "@/app/components/ui/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

const GITHUB_THEME: ThemeInput = {
  light: ["#F1F5F9", "#DBEAFE", "#93C5FD", "#3B82F6", "#1D4ED8"],
};

type Props = {
  username: string;
};

export function GithubContributions({ username }: Props) {
  return (
    <Section id="github" width="content" className="pb-32">
      <SectionHeader icon={Github} title="GitHub Contributions" />

      <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-10 overflow-hidden shadow-sm">
        <div className="flex justify-center">
          <GitHubCalendar
            username={username}
            blockSize={12}
            blockMargin={4}
            blockRadius={2}
            fontSize={12}
            theme={GITHUB_THEME}
            colorScheme="light"
          />
        </div>
      </div>
    </Section>
  );
}
