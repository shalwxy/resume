import type { Metadata } from "next";
import { renderCareerPage } from "@/lib/career/markdown";
import CareerChrome, { pageTitle } from "./CareerChrome";

export const metadata: Metadata = {
  title: pageTitle("index", "ko"),
  description: "이승하 · Software Engineer · Backend · Go / gRPC / Kafka",
};

export default function CareerIndexPage() {
  const { bodyHtml, toc, diagrams } = renderCareerPage("index", "ko");
  return <CareerChrome stem="index" lang="ko" bodyHtml={bodyHtml} toc={toc} diagrams={diagrams} />;
}
