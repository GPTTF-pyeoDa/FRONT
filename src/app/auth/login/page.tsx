"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  memID: string; // memID
  name: string;
  email: string;
}

export default function LoginPage() {
  const { setUser } = useAuth();
  const [memID, setMemID] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ memID, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", data.token);

      // 토큰에서 사용자 정보 추출
      const decodedToken = jwtDecode<DecodedToken>(data.token);
      setUser({
        memID: decodedToken.memID,
        name: decodedToken.name,
      });

      alert("로그인이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center p-8">
      <Logo />
      <h1 className="text-3xl font-semibold text-blue-800 mt-8 mb-8">로그인</h1>
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
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
        <Button
          type="submit"
          className="w-full bg-blue-200 hover:bg-blue-300 text-blue-800"
        >
          로그인
        </Button>
      </form>
      <p className="mt-4 text-blue-600">
        계정이 없으신가요?{" "}
        <Link href="/auth/signup" className="underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
