import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import attrs from "markdown-it-attrs";
import { BASE_PATH } from "@/lib/basePath";

const CONTENT_DIR = path.join(process.cwd(), "content/career");
const DIAGRAMS_DIR = path.join(CONTENT_DIR, "diagrams");

const md = new MarkdownIt({ html: true, typographer: true }).use(attrs);

export type TocNode = { id: string; text: string; level: number; children: TocNode[] };
export type DiagramEntry = { id: string; title: string; source: string };
export type Lang = "ko" | "en";

const MODAL_TITLE: Record<Lang, string> = { ko: "도식 보기", en: "Diagram" };

/** content/career/<stem>.md 또는 .en.md 를 읽어 렌더링한다. */
export function renderCareerPage(stem: string, lang: Lang, basePath: string = BASE_PATH) {
  const file = path.join(CONTENT_DIR, lang === "en" ? `${stem}.en.md` : `${stem}.md`);
  const raw = fs.readFileSync(file, "utf-8");

  let text = preprocessMarkdownInHtmlDivs(raw);
  text = preprocessSkills(text, lang);

  const env = {};
  const tokens = md.parse(text, env);
  const headings = assignHeadingIds(tokens);

  let bodyHtml = md.renderer.render(tokens, md.options, env);
  bodyHtml = bodyHtml.replace(
    /( · )(<a href="portfolio\.html#)/g,
    '<span class="sep">$1</span>$2',
  );
  // content의 portfolio.html / decisions.html 링크는 평평한 docs/ 레이아웃 기준이라
  // /portfolio, /decisions 최상위 라우트로 다시 써줘야 한다.
  bodyHtml = bodyHtml
    .replace(/href="portfolio\.html/g, `href="${basePath}/portfolio`)
    .replace(/href="decisions\.html/g, `href="${basePath}/decisions`);
  const { html, diagramIds } = injectDiagrams(bodyHtml, lang);

  const toc = buildTocTree(headings.filter((h) => h.level <= 3));
  const diagrams = diagramIds.map((id) => loadDiagram(id, lang));

  return { bodyHtml: html, toc, diagrams };
}

/** `<div ... markdown="1">...</div>` 안의 markdown(볼드·단락)을 미리 변환한다 (Python-Markdown의 extra.md_in_html 대응). */
function preprocessMarkdownInHtmlDivs(text: string): string {
  return text.replace(
    /<div([^>]*)\smarkdown="1"([^>]*)>([\s\S]*?)<\/div>/g,
    (_m, before: string, after: string, inner: string) => {
      const body = inner
        .trim()
        .split(/\n{2,}/)
        .map((para) => `<p>${para.trim().replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`)
        .join("\n");
      return `<div${before}${after}>\n${body}\n</div>`;
    },
  );
}

const SKILL_LEGEND: Record<Lang, [string, string, string]> = {
  ko: ["1: 탐색·R&D 활용", "2: 운영 경험 있음", "3: Production 설계·운영 가능"],
  en: ["1: Exploratory / R&D use", "2: Used in operations", "3: Can design & run in production"],
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `::: skills ... :::` 블록을 sk-row 마크업으로 치환한다. */
function preprocessSkills(text: string, lang: Lang): string {
  return text.replace(/^::: *skills *\n([\s\S]*?)^::: *$/gm, (_m, block: string) => {
    const rows = block
      .trim()
      .split("\n")
      .map((line) => {
        const [cat, items] = line.split("|").map((s) => s.trim());
        const lis = items
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((item) => {
            const idx = item.lastIndexOf(":");
            const name = idx === -1 ? item : item.slice(0, idx).trim();
            const lvl = idx === -1 ? "" : item.slice(idx + 1).trim();
            if (["1", "2", "3"].includes(lvl) && name) {
              return `<li><i class="lv lv${lvl}">${lvl}</i>${escapeHtml(name)}</li>`;
            }
            return `<li>${escapeHtml(item)}</li>`;
          })
          .join("");
        return `<div class="sk-row"><div class="sk-cat">${escapeHtml(cat)}</div><ul class="sk-items">${lis}</ul></div>`;
      })
      .join("");
    const legend = SKILL_LEGEND[lang].map(escapeHtml).join("<br>");
    const head = `<div class="sk-legend"><span class="sk-q" tabindex="0"><i>?</i><span class="tip">${legend}</span></span></div>`;
    return `\n\n<div class="skills">${head}${rows}</div>\n\n`;
  });
}

/** slugify_unicode(Python-Markdown TOC) 근사: 소문자화, 문자/숫자/공백/하이픈만 허용, 공백은 하이픈으로. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Heading = { id: string; text: string; level: number };

function assignHeadingIds(tokens: ReturnType<typeof md.parse>): Heading[] {
  const used = new Set<string>();
  const headings: Heading[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type !== "heading_open") continue;
    const level = Number(t.tag.slice(1));
    const inline = tokens[i + 1];
    const text = (inline.children ?? [])
      .map((c) => (c.type === "text" || c.type === "code_inline" ? c.content : ""))
      .join("")
      .trim();
    const existing = t.attrGet("id");
    let id = existing != null ? String(existing) : null;
    if (id) {
      used.add(id);
    } else {
      // Python-Markdown TocExtension.unique()와 동일한 접미사 규칙: base, base_1, base_2 ...
      const base = slugify(text) || "section";
      let slug = base;
      let n = 1;
      while (used.has(slug)) {
        slug = `${base}_${n++}`;
      }
      used.add(slug);
      id = slug;
      t.attrSet("id", id);
    }
    headings.push({ id, text, level });
  }
  return headings;
}

function buildTocTree(headings: Heading[]): TocNode[] {
  const root: TocNode[] = [];
  const stack: TocNode[] = [];
  for (const h of headings) {
    const node: TocNode = { id: h.id, text: h.text, level: h.level, children: [] };
    while (stack.length && stack[stack.length - 1].level >= h.level) stack.pop();
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  }
  return root;
}

const DG_RE = /<a href="#dg:([a-z0-9-]+)">/g;

function injectDiagrams(html: string, lang: Lang): { html: string; diagramIds: string[] } {
  const seen = new Set<string>();
  const ids: string[] = [];
  const out = html.replace(DG_RE, (_m, id: string) => {
    if (!seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
    return `<a href="#" class="dg" data-dg="${id}" title="${MODAL_TITLE[lang]}">`;
  });
  return { html: out, diagramIds: ids };
}

function loadDiagram(id: string, lang: Lang): DiagramEntry {
  let file = path.join(DIAGRAMS_DIR, `${id}.mmd`);
  const enFile = path.join(DIAGRAMS_DIR, `${id}.en.mmd`);
  if (lang === "en" && fs.existsSync(enFile)) file = enFile;

  const lines = fs.readFileSync(file, "utf-8").split("\n");
  let title = "";
  const body: string[] = [];
  for (const line of lines) {
    if (line.startsWith("%% title_en:")) {
      if (lang === "en") title = line.split(":").slice(1).join(":").trim();
    } else if (line.startsWith("%% title:")) {
      if (lang !== "en" || !title) title = line.split(":").slice(1).join(":").trim();
    } else {
      body.push(line);
    }
  }
  return { id, title, source: body.join("\n") };
}
