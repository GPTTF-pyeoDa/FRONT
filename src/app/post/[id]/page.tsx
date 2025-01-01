"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PenTool, Trash2, Lock, Unlock, Bot } from "lucide-react";
import { Hashtag } from "@/components/Hashtag";
import { fetchPostById, deletePostById } from "@/lib/api";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
  topic?: string;
}

export default function PostPage() {
  const router = useRouter();
  const { id } = useParams(); // URL에서 id 가져오기

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const data = await fetchPostById(id);
        if (data) {
          setPost(data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!post) return <p>No post data available.</p>;

  const handleEdit = () => {
    router.push(`/write/${post.id}`);
  };

  const handleDelete = async () => {
    // 여기에 삭제 로직을 구현하세요
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deletePostById(post?.id ?? "");
      alert("글이 삭제되었습니다.");
      router.push("/post/mypost");
    } catch (err) {
      alert("삭제 실패: " + (err as Error).message);
    }
  };

  const togglePublic = () => {
    // setPost((prev) => (prev ? { ...prev, isPublic: !prev.isPublic } : prev));
    // 여기에 공개/비공개 전환 로직을 구현하세요
    console.log("Toggling public status", post.id, !post.isPublic);
  };

  const handleAICoach = () => {
    // 여기에 AI 코치 로직을 구현하세요
    console.log("Requesting AI coaching for", post.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-[#E2E8F0]">
        <h1 className="text-3xl font-semibold text-[#3B82F6] mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <p className="text-gray-500">작성일: {post.createdAt}</p>
          {post.topic && <Hashtag topic={post.topic} />}
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              post.isPublic
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {post.isPublic ? "공개" : "비공개"}
          </span>
        </div>
        <p className="text-gray-700 mb-8 whitespace-pre-wrap">{post.content}</p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleEdit}
            className="bg-[#F0F7FF] text-[#3B82F6] hover:bg-[#E5F1FF] border-[#BFD9FE]"
          >
            <PenTool className="mr-2 h-4 w-4" />
            수정
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            className="bg-white text-red-500 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </Button>
          <Button
            onClick={togglePublic}
            variant="outline"
            className="bg-white text-[#3B82F6] hover:bg-[#F8FAFC] border-[#E2E8F0]"
          >
            {post.isPublic ? (
              <Unlock className="mr-2 h-4 w-4" />
            ) : (
              <Lock className="mr-2 h-4 w-4" />
            )}
            {post.isPublic ? "비공개로 전환" : "공개로 전환"}
          </Button>
          <Button
            onClick={handleAICoach}
            variant="outline"
            className="bg-white text-purple-500 hover:bg-purple-50 border-purple-200"
          >
            <Bot className="mr-2 h-4 w-4" />
            AI 글쓰기 코치
          </Button>
        </div>
      </div>
    </div>
  );
}
