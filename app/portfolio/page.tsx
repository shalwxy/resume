import type { Metadata } from "next";
import { renderCareerPage } from "@/lib/career/markdown";
import CareerChrome, { pageTitle } from "../career/CareerChrome";

export const metadata: Metadata = {
  title: pageTitle("portfolio", "ko"),
  description: "이승하 · Software Engineer · Backend · Go / gRPC / Kafka",
};

export default function CareerPortfolioPage() {
  const { bodyHtml, toc, diagrams } = renderCareerPage("portfolio", "ko");
  return <CareerChrome stem="portfolio" lang="ko" bodyHtml={bodyHtml} toc={toc} diagrams={diagrams} />;
}
