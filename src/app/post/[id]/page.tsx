"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PenTool, Trash2, Lock, Unlock, Bot } from "lucide-react";
import { Hashtag } from "@/components/Hashtag";
import { fetchPostById, deletePostById, requestFeedback } from "@/lib/api";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
  tagName?: string;
}
interface Feedback {
  grammar: string[];
  spacing: string[];
  context: string[];
  suggestion: string;
}

export default function PostPage() {
  const router = useRouter();
  const { id } = useParams(); // URL에서 id 가져오기

  const [post, setPost] = useState<Post | null>(null);

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false); // AI 피드백 로딩 상태
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

  const handleAICoach = async () => {
    if (!post) return;
    setFeedbackLoading(true);
    try {
      const result = await requestFeedback(post.id, post.content); // API 호출
      setFeedback(result.feedback); // 피드백 설정
    } catch (err) {
      alert("AI 피드백 요청 실패: " + (err as Error).message);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-[#E2E8F0]">
        <h1 className="text-3xl font-semibold text-[#3B82F6] mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <p className="text-gray-500">작성일: {post.createdAt}</p>
          {post.tagName && <Hashtag topic={post.tagName} />}
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
            disabled={feedbackLoading} // 로딩 중일 때 버튼 비활성화
          >
            <Bot className="mr-2 h-4 w-4" />
            {feedbackLoading ? "피드백 생성 중..." : "AI 글쓰기 코치"}
          </Button>
        </div>
        {feedback && (
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                문법 피드백
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.grammar?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                띄어쓰기 피드백
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.spacing?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                맥락 피드백
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.context?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                수정된 예시
              </h2>
              <p className="text-gray-600">{feedback.suggestion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
