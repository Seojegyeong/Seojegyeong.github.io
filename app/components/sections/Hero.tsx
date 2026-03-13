import {
  Github,
  Mail,
  Linkedin,
  BookOpen,
  MapPin,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { Section } from "@/app/components/ui/Section";
import { profile, education } from "@/app/data/profile";

const socialLinks = [
  { label: "Github", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedIn, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Blog", href: profile.blog, icon: BookOpen },
];

const degreeText = education.degree
  .map((d) => (d.info ? `${d.name} ${d.info}` : d.name))
  .join(" · ");

export function Hero() {
  return (
    <Section width="content" className="pt-32 pb-16 md:pt-44 md:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-8 space-y-8">
          <header className="space-y-4">
            <h2 className="text-base text-slate-500 pt-1">{profile.role}</h2>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {profile.name}
            </h1>
            <p className="max-w-lg text-slate-700 text-base leading-[1.8] whitespace-pre-line">
              {profile.slogan}
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center gap-2 px-3.5 rounded-lg border border-slate-200/70 bg-white text-slate-600 font-medium text-sm transition-all hover:bg-slate-40 focus:outline-none"
              >
                <Icon className="w-4 h-auto text-slate-600" strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>

          <div>
            <div className="max-w-lg rounded-2xl border border-slate-200/70 bg-white p-6 space-y-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                <GraduationCap className="w-4 h-auto" strokeWidth={1.5} />
                Education
              </div>

              <div className="space-y-2.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {education.school}
                  </h3>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-md font-medium text-slate-600 block">
                      {degreeText}
                    </span>
                    <span className="text-sm text-slate-400">
                      {education.graduate
                        ? "졸업"
                        : `재학중 · ${education.graduateDate} 졸업 예정`}
                    </span>
                  </div>
                  {education.gpa && (
                    <span className="font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full text-xs border border-primary/10 tracking-wide shrink-0">
                      GPA {education.gpa} / 4.5
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-4 justify-end mt-12">
          <div className="relative w-full max-w-[300px]">
            <div className="relative aspect-4/5 overflow-hidden rounded-xl">
              <Image
                src="/profile.jpg"
                alt={profile.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-slate-500">
              <MapPin className="w-3.5 h-auto" strokeWidth={2} />
              {profile.location}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
