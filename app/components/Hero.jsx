import Image from "next/image";
import {
  Github,
  Mail,
  Linkedin,
  ArrowRight,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

const social = [
  { label: "GitHub", href: "https://github.com/Seojegyeong", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/제경-서-143372345",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:seojk0315@naver.com", icon: Mail },
];

export function Hero() {
  return (
    <Section spacing="loose" className="pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="relative">
        <div className="pointer-events-none absolute -top-24 -left-12 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="md:col-span-7 space-y-10">
            <header className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Available for New Projects
              </div>

              <h1 className="text-4xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
                Hello, I&apos;m <br />
                <span className="bg-linear-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                  Seo Je Gyeong
                </span>
              </h1>

              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                사용자 중심의 인터페이스를 설계하는 개발자 서제경 입니다.
                <br className="hidden sm:block" />
                기술적 완성도를 넘어 사용자에게 닿는 가치를 고민합니다.
              </p>
            </header>

            <Card className="group relative overflow-hidden border-border/40 bg-linear-to-b from-card/50 to-background p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">
                        상명대학교
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sangmyung University
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] uppercase tracking-tighter"
                    >
                      Expected Feb 2027
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="rounded-xl bg-muted/30 p-3 ring-1 ring-border/50 transition-colors group-hover:bg-muted/50">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                        Major
                      </p>
                      <p className="text-sm font-semibold">
                        한일문화콘텐츠전공
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted/30 p-3 ring-1 ring-border/50 transition-colors group-hover:bg-muted/50">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                        Double Major
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        컴퓨터과학
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-wrap items-center gap-5">
              <Button
                size="lg"
                className="h-12 rounded-full px-8 font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-95"
              >
                Explore My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex items-center gap-3">
                {social.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-linear-to-tr from-primary/30 to-cyan-400/30 blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative aspect-3/4 overflow-hidden rounded-4xl border border-white/10 bg-muted shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Seo Je Gyeong"
                  fill
                  priority
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass flex items-center gap-3 rounded-2xl border border-white/20 p-4 shadow-xl backdrop-blur-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-inner">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Seoul, South Korea
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
