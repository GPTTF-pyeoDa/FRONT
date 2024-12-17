import Link from "next/link";
import { PenTool, BookOpen, List, BarChart2 } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Home() {
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
          <button className="bg-blue-200 hover:bg-blue-300 text-blue-900 h-32 text-xl font-noto-sans">
            <Link
              href="/write"
              className="flex flex-col items-center justify-center"
            >
              <PenTool className="h-8 w-8 mb-2" />
              <span>새 글 쓰기</span>
            </Link>
          </button>
          <button className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl font-noto-sans">
            <Link
              href="/topics"
              className="flex flex-col items-center justify-center"
            >
              <BookOpen className="h-8 w-8 mb-2" />
              <span>오늘의 글감 보기</span>
            </Link>
          </button>
          <button className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl font-noto-sans">
            <Link
              href="/all-topics"
              className="flex flex-col items-center justify-center"
            >
              <List className="h-8 w-8 mb-2" />
              <span>전체 글감 보기</span>
            </Link>
          </button>
          <button className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl font-noto-sans">
            <Link
              href="/my-posts"
              className="flex flex-col items-center justify-center"
            >
              <List className="h-8 w-8 mb-2" />
              <span>내 글 목록</span>
            </Link>
          </button>
          <button className="text-blue-900 hover:text-blue-900 border-blue-200 hover:bg-blue-100 h-32 text-xl col-span-full font-noto-sans">
            <Link
              href="/statistics"
              className="flex flex-col items-center justify-center"
            >
              <BarChart2 className="h-8 w-8 mb-2" />
              <span>통계 보기</span>
            </Link>
          </button>
        </div>
      </main>

      <footer className="mt-12 text-center">
        <div className="space-x-4">
          <button className="text-blue-900 hover:text-blue-900 font-noto-sans">
            <Link href="/login">로그인</Link>
          </button>
          <button className="text-blue-900 hover:text-blue-900 font-noto-sans">
            <Link href="/signup">회원가입</Link>
          </button>
        </div>
      </footer>
    </div>
  );
}
