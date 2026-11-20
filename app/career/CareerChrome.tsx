import type { DiagramEntry, Lang, TocNode } from "@/lib/career/markdown";
import { BASE_PATH } from "@/lib/basePath";
import CareerModal from "./CareerModal";
import CareerToc from "./CareerToc";
import "./career.css";

const NAME: Record<Lang, string> = { ko: "이승하", en: "Seungha Lee" };
const TITLE = "Software Engineer · Backend · Go / gRPC / Kafka";
const LINKS: { label: string; href: string }[] = [
  { label: "Email", href: "mailto:shalwxy@gmail.com" },
  { label: "GitHub", href: "https://github.com/shalwxy" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/seungha-lee-2aa442229" },
  { label: "Blog", href: "https://persica.co.kr/lab" },
];
const FOOTER_NOTE: Record<Lang, string> = {
  ko: "공개용으로 정제된 요약이며 사내 식별자·운영 정보는 포함하지 않습니다.",
  en: "Public summary. Internal identifiers and operational details are intentionally omitted.",
};

export const PAGES = [
  { stem: "index", route: "career", ko: "Career", en: "Career", hasEn: true },
  { stem: "portfolio", route: "portfolio", ko: "Portfolio", en: "Portfolio", hasEn: false },
  { stem: "decisions", route: "decisions", ko: "Design Decisions", en: "Design Decisions", hasEn: false },
] as const;

/** index는 /career/ ·/career/en/, portfolio/decisions는 최상위 /portfolio/ ·/decisions/.
 * hasEn을 실제로 참조하므로 PAGES에 EN 변형을 추가/제거하면 이 함수가 그대로 따라간다.
 * next.config.ts의 trailingSlash:true에 맞춰 항상 trailing slash를 붙인다. */
export function pathFor(stem: string, lang: Lang): string {
  const page = PAGES.find((p) => p.stem === stem)!;
  const suffix = lang === "en" && page.hasEn ? "/en" : "";
  return `${BASE_PATH}/${page.route}${suffix}/`;
}

export function pageTitle(stem: string, lang: Lang): string {
  const page = PAGES.find((p) => p.stem === stem)!;
  const label = lang === "en" ? page.en : page.ko;
  return `${label} — ${NAME[lang]}`;
}

export default function CareerChrome({
  stem,
  lang,
  bodyHtml,
  toc,
  diagrams,
}: {
  stem: string;
  lang: Lang;
  bodyHtml: string;
  toc: TocNode[];
  diagrams: DiagramEntry[];
}) {
  const page = PAGES.find((p) => p.stem === stem)!;
  const name = NAME[lang];
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <div className="career">
      <div className="topbar">
        <div className="in">
          <a className="brand" href={pathFor("index", lang)}>
            {name}
          </a>
          <nav>
            {PAGES.map((p) => (
              <a
                key={p.stem}
                href={pathFor(p.stem, lang)}
                className={p.stem === stem ? "on" : undefined}
              >
                {lang === "en" ? p.en : p.ko}
              </a>
            ))}
          </nav>
          <div className="ext">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} rel="me noopener">
                {l.label}
              </a>
            ))}
            <span className="lang">
              <LangToggle stem={stem} lang={lang} hasEn={page.hasEn} />
            </span>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="in">
          <h1>{name}</h1>
          <p>{TITLE}</p>
        </div>
      </div>
      <div className={`wrap${toc.length === 0 ? " solo" : ""}`}>
        <article dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        {toc.length > 0 && (
          <aside className="toc">
            <p className="t">{lang === "en" ? "Contents" : "목차"}</p>
            <TocList nodes={toc} />
          </aside>
        )}
      </div>
      <button className="toc-btn" aria-label="목차" type="button">
        ☰
      </button>
      <footer>
        <div className="in">
          <span>Last updated {updated}</span>
          <span className="links">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} rel="me noopener">
                {l.label}
              </a>
            ))}
          </span>
          <span>{FOOTER_NOTE[lang]}</span>
        </div>
      </footer>
      <CareerModal diagrams={diagrams} lang={lang} />
      <CareerToc />
    </div>
  );
}

function LangToggle({ stem, lang, hasEn }: { stem: string; lang: Lang; hasEn: boolean }) {
  if (lang === "en") {
    return (
      <>
        <a href={pathFor(stem, "ko")}>KR</a>
        <span className="on">EN</span>
      </>
    );
  }
  if (hasEn) {
    return (
      <>
        <span className="on">KR</span>
        <a href={pathFor(stem, "en")}>EN</a>
      </>
    );
  }
  return (
    <>
      <span className="on">KR</span>
      <span className="off" title="English version: Career page only">
        EN
      </span>
    </>
  );
}

function TocList({ nodes }: { nodes: TocNode[] }) {
  if (nodes.length === 0) return null;
  return (
    <ul>
      {nodes.map((n) => (
        <li key={n.id}>
          <a href={`#${n.id}`}>{n.text}</a>
          <TocList nodes={n.children} />
        </li>
      ))}
    </ul>
  );
}
