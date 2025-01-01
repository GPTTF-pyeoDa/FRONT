import Link from "next/link";

interface HashtagProps {
  id?: string;
  name?: string;
}

export function Hashtag({ id, name }: HashtagProps) {
  return (
    <Link
      href={`/topic/${id}?name=${name}`}
      className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-blue-200 transition-colors"
    >
      #{name}
    </Link>
  );
}
