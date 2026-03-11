import { Section } from "@/app/components/ui/Section";
import { SectionLabel } from "@/app/components/ui/SectionLabel";

const bullets = [
  "컴포넌트 기반 UI 설계 및 재사용 가능한 인터페이스 구조화",
  "Zustand · TanStack Query 기반 클라이언트/서버 상태 분리 설계",
  "Git Flow 협업 및 코드 리뷰를 통한 유지보수 가능한 코드 구조 유지",
];

export function Summary() {
  return (
    <Section id="summary" width="content" spacing="normal">
      <div className="space-y-6">
        <SectionLabel label="Summary" heading="자기소개" />
        <div className="max-w-2xl space-y-5">
          <p className="text-base text-slate-700 leading-[1.8]">
            React · TypeScript 기반으로 웹 서비스를 개발하는 프론트엔드 개발자입니다.
            안정적인 코드 구조가 더 나은 사용자 가치를 만든다는 철학으로 개발합니다.
          </p>
          <ul className="space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                <span className="mt-[7px] shrink-0 block w-1.5 h-1.5 rounded-full bg-slate-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
