"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPostsByTag } from "@/lib/api";
import { Hashtag } from "@/components/Hashtag";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  memID: string;
  tagId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function TopicPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // useParams 훅 사용
  const searchParams = useSearchParams();

  const tagId = params.id as string;

  useEffect(() => {
    if (!params.id) return;

    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPostsByTag(tagId); // API 호출
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const tagName = searchParams.get("name");
    if (params.id) setTagName(tagName || "");

    loadPosts();
  }, [params.id, searchParams]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-8 text-blue-900">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-800 mb-4">
          &ldquo;{tagName}&rdquo; 관련 글
        </h1>
        <Hashtag id={tagId} name={tagName} />
      </header>

      <main>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/post/${post.id}`}
                    className="text-blue-700 hover:text-blue-800"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500">
                  작성일: {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">작성자: {post.memID}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
