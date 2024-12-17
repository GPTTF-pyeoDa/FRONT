import Link from 'next/link';

interface HashtagProps {
  topic: string;
}

export function Hashtag({ topic }: HashtagProps) {
  return (
    <Link
      href={`/topic/${topic}`}
      className='inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-blue-200 transition-colors'
    >
      #{topic}
    </Link>
  );
}
