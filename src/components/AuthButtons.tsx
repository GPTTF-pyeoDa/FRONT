"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthButtons() {
  const { user, logout } = useAuth();

  return (
    <div className="space-x-4">
      {!user ? (
        <>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-blue-900 hover:text-blue-900 font-noto-sans"
          >
            <Link href="/auth/login">로그인</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-blue-900 hover:text-blue-900 font-noto-sans"
          >
            <Link href="/auth/signup">회원가입</Link>
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-900 hover:text-blue-900 font-noto-sans"
          onClick={() => logout()}
        >
          로그아웃
        </Button>
      )}
    </div>
  );
}
