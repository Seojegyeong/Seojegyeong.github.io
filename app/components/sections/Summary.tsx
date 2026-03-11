import { Section } from "@/app/components/ui/Section";
import { SectionLabel } from "@/app/components/ui/SectionLabel";

export function Summary() {
  return (
    <Section id="summary" width="content" spacing="normal">
      <div className="space-y-6">
        <SectionLabel label="Summary" heading="자기소개" />
        <div className="space-y-4 text-slate-600 leading-relaxed text-base max-w-3xl">
          <p>
            React · TypeScript 기반 프론트엔드 개발자로,{" "}
            <strong className="text-slate-800 font-semibold">컴포넌트 단위 UI 설계</strong>와{" "}
            <strong className="text-slate-800 font-semibold">상태 관리 구조 설계</strong>를 통해
            확장성과 유지보수성을 갖춘 프론트엔드 아키텍처를 구현합니다.
          </p>
          <p>
            팀 프로젝트에서는 Git 기반 협업과 코드 리뷰를 통해{" "}
            <strong className="text-slate-800 font-semibold">일관된 코드 품질과 개발 생산성</strong>을
            유지하며, 안정적인 코드 구조가 더 나은 사용자 가치를 만든다는 철학을 가지고 있습니다.
          </p>
        </div>
      </div>
    </Section>
  );
}
