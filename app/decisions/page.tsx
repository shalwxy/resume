import type { Metadata } from "next";
import { renderCareerPage } from "@/lib/career/markdown";
import CareerChrome, { pageTitle } from "../career/CareerChrome";

export const metadata: Metadata = {
  title: pageTitle("decisions", "ko"),
  description: "이승하 · Software Engineer · Backend · Go / gRPC / Kafka",
};

export default function CareerDecisionsPage() {
  const { bodyHtml, toc, diagrams } = renderCareerPage("decisions", "ko");
  return <CareerChrome stem="decisions" lang="ko" bodyHtml={bodyHtml} toc={toc} diagrams={diagrams} />;
}
