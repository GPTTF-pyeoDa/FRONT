import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Hashtag } from '@/components/Hashtag';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  // 이 데이터는 실제로는 서버에서 가져와야 합니다
  const posts: Post[] = [
    {
      id: 1,
      title: '사랑에 대한 단상',
      excerpt: '사랑은 때로는 달콤하고, 때로는 쓰다...',
      author: '김문학',
    },
    {
      id: 2,
      title: '첫사랑의 추억',
      excerpt: '그 때 그 시절, 풋풋했던 우리의 모습...',
      author: '이소설',
    },
    {
      id: 3,
      title: '사랑과 우정 사이',
      excerpt: '친구에서 연인이 되는 과정은...',
      author: '박에세이',
    },
  ];

  return (
    <div className='min-h-screen bg-blue-50 p-8 text-blue-900'>
      <header className='mb-8'>
        <h1 className='text-3xl font-semibold text-blue-800 mb-4'>
          &ldquo;{params.topic}&rdquo; 관련 글
        </h1>
        <Hashtag topic={params.topic} />
      </header>

      <main>
        <div className='space-y-4'>
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className='p-4'>
                <h2 className='text-xl font-semibold mb-2'>
                  <Link
                    href={`/post/${post.id}`}
                    className='text-blue-700 hover:text-blue-800'
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className='text-gray-600 mb-2'>{post.excerpt}</p>
                <p className='text-sm text-gray-500'>작성자: {post.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
