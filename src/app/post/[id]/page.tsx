'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PenTool, Trash2, Lock, Unlock, Bot } from 'lucide-react';
import { Hashtag } from '@/components/Hashtag';

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

  const [post, setPost] = useState<Post>({
    id: '2',
    title: '샘플 글 제목',
    content:
      '이것은 샘플 글의 내용입니다. 실제 데이터로 대체되어야 합니다. 이 글은 사용자가 작성한 글의 예시입니다. 글의 내용은 여러 줄에 걸쳐 표시될 수 있으며, 사용자의 생각과 감정을 담고 있습니다.',
    createdAt: '2023-06-10',
    isPublic: false,
    topic: '일상',
  });

  const handleEdit = () => {
    router.push(`/write?edit=${post.id}`);
  };

  const handleDelete = () => {
    // 여기에 삭제 로직을 구현하세요
    console.log('Deleting post', post.id);
    router.push('/post');
  };

  const togglePublic = () => {
    setPost((prev) => ({ ...prev, isPublic: !prev.isPublic }));
    // 여기에 공개/비공개 전환 로직을 구현하세요
    console.log('Toggling public status', post.id, !post.isPublic);
  };

  const handleAICoach = () => {
    // 여기에 AI 코치 로직을 구현하세요
    console.log('Requesting AI coaching for', post.id);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-[#E2E8F0]'>
        <h1 className='text-3xl font-semibold text-[#3B82F6] mb-4'>
          {post.title}
        </h1>
        <div className='flex items-center space-x-4 mb-6'>
          <p className='text-gray-500'>작성일: {post.createdAt}</p>
          {post.topic && <Hashtag topic={post.topic} />}
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              post.isPublic
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {post.isPublic ? '공개' : '비공개'}
          </span>
        </div>
        <p className='text-gray-700 mb-8 whitespace-pre-wrap'>{post.content}</p>
        <div className='flex flex-wrap gap-4'>
          <Button
            onClick={handleEdit}
            className='bg-[#F0F7FF] text-[#3B82F6] hover:bg-[#E5F1FF] border-[#BFD9FE]'
          >
            <PenTool className='mr-2 h-4 w-4' />
            수정
          </Button>
          <Button
            onClick={handleDelete}
            variant='outline'
            className='bg-white text-red-500 hover:bg-red-50 border-red-200'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            삭제
          </Button>
          <Button
            onClick={togglePublic}
            variant='outline'
            className='bg-white text-[#3B82F6] hover:bg-[#F8FAFC] border-[#E2E8F0]'
          >
            {post.isPublic ? (
              <Unlock className='mr-2 h-4 w-4' />
            ) : (
              <Lock className='mr-2 h-4 w-4' />
            )}
            {post.isPublic ? '비공개로 전환' : '공개로 전환'}
          </Button>
          <Button
            onClick={handleAICoach}
            variant='outline'
            className='bg-white text-purple-500 hover:bg-purple-50 border-purple-200'
          >
            <Bot className='mr-2 h-4 w-4' />
            AI 글쓰기 코치
          </Button>
        </div>
      </div>
    </div>
  );
}
