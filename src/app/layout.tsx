import type { Metadata } from "next";
import { Nanum_Pen_Script, Noto_Sans_KR } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const nanumPenScript = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nanum-pen",
});

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "펴다 - 나만의 글쓰기 공간",
  description: "당신의 이야기를 펼쳐보세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${nanumPenScript.variable} ${notoSansKR.variable}`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
