import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이승하 · Backend Engineer",
  description:
    "7년차 백엔드/인프라 엔지니어 이승하의 이력서. 분산 시스템의 데이터 일관성과 운영 가능한 구조에 집중합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
