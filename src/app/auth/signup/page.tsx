"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const [memID, setMemID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memID, password, name, email }),
      }
    );
    console.log(res);

    if (res.ok) {
      alert("회원가입이 완료되었습니다.");
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center p-8">
      <Logo />
      <h1 className="text-3xl font-semibold text-blue-800 mt-8 mb-8">
        회원가입
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="text"
          placeholder="아이디"
          value={memID}
          onChange={(e) => setMemID(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="w-full bg-blue-200 hover:bg-blue-300 text-blue-800"
        >
          회원가입
        </Button>
      </form>
      <p className="mt-4 text-blue-600">
        이미 계정이 있으신가요?{" "}
        <Link href="/auth/login" className="underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
