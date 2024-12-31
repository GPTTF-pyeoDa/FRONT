import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Unlock, BarChart2 } from 'lucide-react';

export default function MyPostsPage() {
  const posts = [
    { title: '첫 번째 글', isPublic: false },
    { title: '두 번째 글', isPublic: true },
    { title: '세 번째 글', isPublic: false },
    { title: '네 번째 글', isPublic: true },
    { title: '다섯 번째 글', isPublic: false },
  ];

  return (
    <div className='min-h-screen bg-blue-50 p-8 text-blue-900'>
      <header className='mb-8'>
        <h1 className='text-3xl font-semibold text-blue-800'>내 글 목록</h1>
      </header>

      <main>
        <div className='space-y-4'>
          {posts.map((post, index) => (
            <Card key={index} className='bg-white'>
              <CardContent className='p-4 flex justify-between items-center'>
                <Link
                  href={`/post/${index}`}
                  className='text-blue-700 hover:text-blue-800'
                >
                  {post.title}
                </Link>
                <div className='flex space-x-2'>
                  {post.isPublic ? (
                    <Unlock className='h-5 w-5 text-green-500' />
                  ) : (
                    <Lock className='h-5 w-5 text-gray-500' />
                  )}
                  <BarChart2 className='h-5 w-5 text-blue-500' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
