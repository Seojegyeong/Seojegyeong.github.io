import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Layers, Zap, Eye, ShieldCheck } from "lucide-react"; // 아이콘 추가

export function EngineeringValues() {
  const values = [
    {
      title: "Atomic Architecture",
      icon: <Layers className="h-5 w-5 text-primary" />,
      desc: "UI를 최소 원자 단위로 파편화하여 대규모 시스템에서도 일관된 유지보수성을 보장합니다.",
      detail: "컴포넌트 재사용성 극대화 및 결합도 최적화",
    },
    {
      title: "Flexible Extension",
      icon: <Zap className="h-5 w-5 text-primary" />,
      desc: "asChild 패턴을 활용해 프레임워크 종속성을 낮추고, 시맨틱한 마크업을 유지합니다.",
      detail: "Radix UI 기반 Slot 패턴의 유연한 구조",
    },
    {
      title: "Inclusive Design",
      icon: <Eye className="h-5 w-5 text-primary" />,
      desc: "OKLCH 모델을 도입하여 저시력자나 고령층도 신뢰할 수 있는 고대비 가독성을 구현합니다.",
      detail: "웹 접근성(A11y) 및 지각적 밝기 최적화",
    },
    {
      title: "Type-Safe Tokens",
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      desc: "브랜드 가이드를 엄격한 타입 시스템으로 강제하여 휴먼 에러를 방지합니다.",
      detail: "TypeScript를 활용한 디자인 토큰 무결성 보장",
    },
  ];

  return (
    <Section id="engineering" spacing="normal">
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="default">Engineering Excellence</Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            지속 가능한 시스템 설계 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <Card
              key={i}
              className="p-6 glass group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {v.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg leading-none">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-primary/70 uppercase tracking-tighter">
                    {v.detail}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
