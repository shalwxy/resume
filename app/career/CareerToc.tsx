"use client";

import { useEffect } from "react";

/** aside.toc 스크롤 스파이 + 모바일 토글 버튼. build.py의 vanilla JS를 그대로 포팅. */
export default function CareerToc() {
  useEffect(() => {
    const btn = document.querySelector(".career .toc-btn");
    const toc = document.querySelector(".career aside.toc");
    let onBtn: (() => void) | undefined;
    let onTocClick: ((e: Event) => void) | undefined;

    if (btn && toc) {
      onBtn = () => toc.classList.toggle("open");
      onTocClick = (e: Event) => {
        if ((e.target as HTMLElement).tagName === "A") toc.classList.remove("open");
      };
      btn.addEventListener("click", onBtn);
      toc.addEventListener("click", onTocClick);
    }

    if (!toc) return;
    const links = Array.from(toc.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    const heads = links
      .map((a) => document.getElementById(decodeURIComponent(a.getAttribute("href")!.slice(1))))
      .filter((h): h is HTMLElement => h !== null);

    function cur() {
      const y = window.scrollY + 90;
      let i = -1;
      heads.forEach((h, k) => {
        if (h.offsetTop <= y) i = k;
      });
      links.forEach((a, k) => a.classList.toggle("cur", k === i));
    }
    window.addEventListener("scroll", cur, { passive: true });
    cur();

    return () => {
      window.removeEventListener("scroll", cur);
      if (btn && onBtn) btn.removeEventListener("click", onBtn);
      if (toc && onTocClick) toc.removeEventListener("click", onTocClick);
    };
  }, []);

  return null;
}
