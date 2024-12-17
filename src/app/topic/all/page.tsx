import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function AllTopicsPage() {
  const topics = [
    '추억',
    '꿈',
    '여행',
    '일상',
    '사랑',
    '취미',
    '음식',
    '영화',
    '음악',
    '책',
    '스포츠',
    '자연',
    '도시',
    '과학',
    '기술',
    '예술',
    '패션',
    '건강',
  ];

  return (
    <div className='min-h-screen bg-blue-50 p-8 text-blue-900'>
      <header className='mb-8'>
        <h1 className='text-3xl font-semibold text-blue-800'>전체 글감 목록</h1>
      </header>

      <main>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {topics.map((topic, index) => (
            <Card
              key={index}
              className='bg-white hover:bg-blue-100 transition-colors'
            >
              <CardContent className='p-4'>
                <Link
                  href={`/write?topic=${topic}`}
                  className='text-blue-700 hover:text-blue-800'
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
