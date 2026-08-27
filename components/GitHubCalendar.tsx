"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ReactGitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => m.GitHubCalendar),
  { ssr: false }
);

const ease = [0.22, 1, 0.36, 1] as const;

const theme = {
  light: ["#eef2ff", "#b8c9ff", "#7e98ff", "#3a64ff", "#0025e8"],
};

export default function GitHubCalendar() {
  return (
    <section id="github" className="pt-8 pb-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="github-cal rounded-2xl border border-border p-8"
        >
          <style>{`
            .github-cal .react-activity-calendar__legend-month text,
            .github-cal .react-activity-calendar__legend-weekday text {
              fill: #b8bfcc !important;
            }
          `}</style>

          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="font-bold text-text-primary text-lg leading-tight">GitHub Contribution</h2>
              <p className="text-sm text-text-muted mt-1">꾸준하게 쌓아온 개발 활동 기록입니다.</p>
            </div>

            <a
              href="https://github.com/Seojegyeong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-text-muted text-sm hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              @Seojegyeong ↗
            </a>
          </div>

          <div className="overflow-x-auto flex justify-center">
            <ReactGitHubCalendar
              username="Seojegyeong"
              theme={theme}
              colorScheme="light"
              blockSize={13}
              blockRadius={3}
              blockMargin={4}
              fontSize={12}
              showWeekdayLabels
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
