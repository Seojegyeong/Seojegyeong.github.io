import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          404 Not Found
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
          찾을 수 없는 페이지입니다.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground leading-7">
          주소가 변경되었거나 삭제된 페이지일 수 있습니다. 아래 버튼으로 홈으로
          이동하거나 프로젝트 섹션으로 돌아가세요.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground
                       hover:opacity-95 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Home className="h-4 w-4" />
            홈으로 이동
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground
                       hover:bg-card transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Projects로 돌아가기
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground
                       hover:bg-card transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Search className="h-4 w-4" />
            프로젝트 목록 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
