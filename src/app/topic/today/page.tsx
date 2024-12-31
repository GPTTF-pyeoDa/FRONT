import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function TopicsPage() {
  const topics = ['추억', '꿈', '여행', '일상', '사랑', '취미'];

  return (
    <div className='min-h-screen bg-white p-8 text-black'>
      <header className='mb-8'>
        <h1 className='text-3xl font-semibold text-blue-600'>오늘의 글감</h1>
      </header>

      <main>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {topics.map((topic, index) => (
            <Card
              key={index}
              className='bg-blue-50 hover:bg-blue-100 transition-colors'
            >
              <CardContent className='p-4'>
                <Link
                  href={`/write?topic=${topic}`}
                  className='text-black hover:text-blue-700'
                >
                  {topic}에 대해 써보세요
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
