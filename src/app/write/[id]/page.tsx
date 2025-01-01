// 기존 글 수정
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PenTool, Image, Lock, Unlock, Save } from "lucide-react";
import { fetchPostById, updatePostById } from "@/lib/api";

export default function WritePage() {
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const data = await fetchPostById(id); // id로 글 데이터 가져오기
        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setIsPublic(data.isPublic);
        } else {
          setError("글 데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        setError("오류 발생: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePostById(id, { title, content, isPublic });
      alert("글이 수정되었습니다.");
      router.push(`/post/${id}`); // 수정 후 해당 글 상세 페이지로 이동
    } catch (err) {
      alert("수정 실패: " + (err as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-8 text-blue-900">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-900 font-noto-sans">
          글 수정
        </h1>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full mb-4 p-2 bg-white border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-transparent font-nanum-pen"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에 당신의 이야기를 적어주세요"
            className="w-full h-64 p-4 bg-white border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-transparent font-nanum-pen"
          />

          <div className="flex space-x-4">
            <Button
              type="submit"
              className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-noto-sans"
            >
              <Save className="mr-2 h-4 w-4" />
              저장
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-blue-700 hover:text-blue-800 border-blue-200 hover:bg-blue-100 font-noto-sans"
              onClick={() => setIsPublic(!isPublic)}
            >
              {isPublic ? (
                <Unlock className="mr-2 h-4 w-4" />
              ) : (
                <Lock className="mr-2 h-4 w-4" />
              )}
              {isPublic ? "공개" : "비공개"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-blue-700 hover:text-blue-800 border-blue-200 hover:bg-blue-100 font-noto-sans"
            >
              <PenTool className="mr-2 h-4 w-4" />글 편집 도구
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-blue-700 hover:text-blue-800 border-blue-200 hover:bg-blue-100 font-noto-sans"
            >
              <Image className="mr-2 h-4 w-4" />
              이미지 업로드
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
