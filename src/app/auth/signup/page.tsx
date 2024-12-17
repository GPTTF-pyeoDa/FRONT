'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/Logo';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 회원가입 로직을 구현하세요
    console.log('Signup attempt', { email, password, confirmPassword });
  };

  return (
    <div className='min-h-screen bg-blue-50 flex flex-col justify-center items-center p-8'>
      <Logo />
      <h1 className='text-3xl font-semibold text-blue-800 mt-8 mb-8'>
        회원가입
      </h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md space-y-4'>
        <Input
          type='email'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          type='submit'
          className='w-full bg-blue-200 hover:bg-blue-300 text-blue-800'
        >
          회원가입
        </Button>
      </form>
      <p className='mt-4 text-blue-600'>
        이미 계정이 있으신가요?{' '}
        <Link href='/auth/login' className='underline'>
          로그인
        </Link>
      </p>
    </div>
  );
}
