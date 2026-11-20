"use client";

import { useEffect, useRef, useState } from "react";
import type { DiagramEntry, Lang } from "@/lib/career/markdown";

const MERMAID_CDN = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";

const STRINGS: Record<Lang, { close: string; zoom: string; legend: string }> = {
  ko: {
    close: "닫기",
    zoom: "확대",
    legend: "<i></i>강조된 상자가 제가 설계·구현한 부분입니다. 내부 식별자는 생략했습니다.",
  },
  en: {
    close: "Close",
    zoom: "Zoom",
    legend: "<i></i>Highlighted boxes are the parts I designed and built. Internal identifiers are omitted.",
  },
};

type MermaidLib = {
  initialize: (opts: Record<string, unknown>) => void;
  render: (id: string, text: string) => Promise<{ svg: string; bindFunctions?: (el: Element) => void }>;
};

declare global {
  interface Window {
    mermaid?: MermaidLib;
  }
}

export default function CareerModal({ diagrams, lang }: { diagrams: DiagramEntry[]; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [zoomed, setZoomed] = useState(false);
  const cache = useRef<Record<string, string>>({});
  const lib = useRef<Promise<MermaidLib> | null>(null);
  const byId = useRef<Map<string, DiagramEntry>>(new Map(diagrams.map((d) => [d.id, d])));
  const strings = STRINGS[lang];

  function loadMermaid(): Promise<MermaidLib> {
    if (lib.current) return lib.current;
    const dark = window.matchMedia?.("(prefers-color-scheme:dark)").matches;
    lib.current = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = MERMAID_CDN;
      s.onload = () => {
        window.mermaid!.initialize({
          startOnLoad: false,
          theme: dark ? "dark" : "neutral",
          securityLevel: "strict",
          fontFamily: "inherit",
          flowchart: { htmlLabels: true, curve: "basis", padding: 12, nodeSpacing: 34, rankSpacing: 44 },
          sequence: { useMaxWidth: true, mirrorActors: false, wrap: true },
        });
        resolve(window.mermaid!);
      };
      s.onerror = () => reject(new Error("mermaid load failed"));
      document.head.appendChild(s);
    });
    return lib.current;
  }

  function openDiagram(id: string) {
    const d = byId.current.get(id);
    if (!d) return;
    setTitle(d.title);
    setZoomed(false);
    setOpen(true);
    document.body.classList.add("lock");
    if (cache.current[id]) {
      setBodyHtml(cache.current[id]);
      return;
    }
    setBodyHtml('<p style="color:var(--muted)">…</p>');
    loadMermaid()
      .then((m) => m.render(`dg-svg-${id}`, d.source.trim()))
      .then((r) => {
        cache.current[id] = r.svg;
        setBodyHtml(r.svg);
      })
      .catch((e: Error) => {
        setBodyHtml(`<p class="err">${String(e.message || e).replace(/</g, "&lt;")}</p>`);
      });
  }

  function close() {
    setOpen(false);
    document.body.classList.remove("lock");
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const a = target.closest?.("a.dg") as HTMLElement | null;
      if (a) {
        e.preventDefault();
        openDiagram(a.getAttribute("data-dg") ?? "");
      }
    }
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeydown);
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (location.hash.indexOf("#dg:") === 0) {
      timer = setTimeout(() => openDiagram(location.hash.slice(4)), 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (diagrams.length === 0) return null;

  return (
    <div
      className={`modal${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="box">
        <div className="hd">
          <h3>{title}</h3>
          <button className="zoom" type="button" onClick={() => setZoomed((z) => !z)}>
            {strings.zoom}
          </button>
          <button className="close" type="button" onClick={close}>
            {strings.close} ✕
          </button>
        </div>
        <div className="bd">
          <div className={`mm${zoomed ? " z" : ""}`} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          <p className="legend" dangerouslySetInnerHTML={{ __html: strings.legend }} />
        </div>
      </div>
    </div>
  );
}
