import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { fetchTags } from "@/lib/api";

interface Tag {
  id: string;
  name: string;
}

export default async function AllTopicsPage() {
  // 서버 컴포넌트에서 API 호출
  const tags = await fetchTags();

  return (
    <div className="min-h-screen bg-blue-50 p-8 text-blue-900">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-800">전체 글감 목록</h1>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tags.map((tag: Tag) => (
            <Card
              key={tag.id}
              className="bg-white hover:bg-blue-100 transition-colors h-24"
            >
              <CardContent className="p-4 h-full flex items-center justify-center">
                <Link
                  href={`/write?id=${tag.id}&name=${tag.name}`}
                  className="text-blue-700 hover:text-blue-800 text-center"
                >
                  {tag.name}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
