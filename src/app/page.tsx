import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenTool, List, BarChart2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { fetchTodaysTag } from "@/lib/api";

export default async function Home() {
  const todayTopic = await fetchTodaysTag();

  return (
    <div className="min-h-screen bg-blue-50 p-8 text-blue-900">
      <header className="mb-12 text-center">
        <Logo />
        <h1 className="text-4xl font-semibold text-blue-900 mt-4">
          나만의 글쓰기 공간
        </h1>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            asChild
            className="bg-blue-200 hover:bg-blue-300 text-blue-900 h-32 text-xl font-noto-sans"
          >
            <Link
              href="/write"
              className="flex flex-col items-center justify-center"
            >
              <PenTool className="h-8 w-8 mb-2" />
              <span>새 글 쓰기</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl font-noto-sans"
          >
            <Link
              href={`/write?id=${todayTopic.id}&name=${todayTopic.name}`}
              className="flex flex-col items-center justify-center"
            >
              <h2 className="mb-3 text-2xl font-semibold">
                오늘의 글감:{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  {todayTopic.name}
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                오늘의 글감으로 글을 작성해보세요.
              </p>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl font-noto-sans"
          >
            <Link
              href="/topic/all"
              className="flex flex-col items-center justify-center"
            >
              <List className="h-8 w-8 mb-2" />
              <span>전체 글감 보기</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl font-noto-sans"
          >
            <Link
              href="/post/mypost"
              className="flex flex-col items-center justify-center"
            >
              <List className="h-8 w-8 mb-2" />
              <span>내 글 목록</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl col-span-full font-noto-sans"
          >
            <Link
              href="/stats"
              className="flex flex-col items-center justify-center"
            >
              <BarChart2 className="h-8 w-8 mb-2" />
              <span>통계 보기</span>
            </Link>
          </Button>
        </div>
      </main>

      <footer className="mt-12 text-center">
        <div className="space-x-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-blue-900 hover:text-blue-900 font-noto-sans"
          >
            <Link href="/auth/login">로그인</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-blue-900 hover:text-blue-900 font-noto-sans"
          >
            <Link href="/auth/signup">회원가입</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
