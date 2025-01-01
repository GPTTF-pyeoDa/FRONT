"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Unlock, BarChart2 } from "lucide-react";
import { fetchMyPosts } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  isPublic: boolean;
  tagId: string | null;
  createdAt: string;
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]); // 타입 지정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login"); // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    }
  }, [user, router]);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const userId = user?.memID; // 실제 로그인 사용자 ID를 여기에 설정
        const data = await fetchMyPosts(userId);
        setPosts(data);
      } catch (err) {
        setError((err as Error).message); // 타입 단언
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-blue-50 p-8 text-blue-900">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-800">내 글 목록</h1>
      </header>

      <main>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="bg-white">
                <CardContent className="p-4 flex justify-between items-center">
                  <Link
                    href={`/post/${post.id}`}
                    className="text-blue-700 hover:text-blue-800"
                  >
                    {post.title}
                  </Link>
                  <div className="flex space-x-2">
                    {post.isPublic ? (
                      <Unlock className="h-5 w-5 text-green-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-500" />
                    )}
                    <BarChart2 className="h-5 w-5 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>작성한 글이 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}
