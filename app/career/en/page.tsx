import type { Metadata } from "next";
import { renderCareerPage } from "@/lib/career/markdown";
import CareerChrome, { pageTitle } from "../CareerChrome";

export const metadata: Metadata = {
  title: pageTitle("index", "en"),
  description: "Seungha Lee · Software Engineer · Backend · Go / gRPC / Kafka",
};

export default function CareerIndexEnPage() {
  const { bodyHtml, toc, diagrams } = renderCareerPage("index", "en");
  return <CareerChrome stem="index" lang="en" bodyHtml={bodyHtml} toc={toc} diagrams={diagrams} />;
}
