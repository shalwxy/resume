# resume

이승하(Seungha Lee)의 이력서. 면접관이 2~3분 안에 훑을 수 있는 분량으로 압축한 Next.js 정적 사이트.

## Stack

- Next.js 16 (App Router, `output: 'export'`)
- Tailwind CSS v4
- TypeScript
- Pretendard (CDN)
- GitHub Pages 배포

## 로컬 실행

```bash
npm install
npm run dev
# http://localhost:3000
```

## 콘텐츠 수정

전체 콘텐츠는 `app/page.tsx` 하나에 모여 있습니다. 섹션 단위로 내려가면서 수정하세요.

- `Header` — 이름/역할/연락처
- `INTRODUCE` — 2~3문단 자기소개
- `SKILL` — 카테고리별 1줄
- `EXPERIENCE` — 회사 단위 카드
- `PROJECT` — 프로젝트 단위 카드 (문제 → 접근 → 결과 순서로 bullet)
- `CORE COMPETENCY` — 역량 요약

재사용 컴포넌트(`Section`, `JobCard`, `ProjectCard`, `SkillRow`)는 같은 파일 하단에 있습니다.

## 빌드 (정적)

```bash
npm run build
# → out/ 생성
```

로컬에서 결과물 확인:

```bash
npx serve out
```

## 배포 — GitHub Pages

레포지토리 이름을 그대로 base path로 사용합니다. 예: `shalee/resume` → `https://shalee.github.io/resume/`.

1. 레포지토리 → **Settings → Pages → Source**를 `GitHub Actions`로 설정
2. `main` 브랜치에 push → `.github/workflows/deploy.yml`이 자동으로 빌드·배포

base path를 바꾸고 싶다면 환경변수 `NEXT_PUBLIC_BASE_PATH`를 덮어쓰면 됩니다. 루트 도메인(username.github.io 또는 커스텀 도메인)으로 올릴 때는 빈 문자열로.

```bash
NEXT_PUBLIC_BASE_PATH="" npm run build
```

## 디자인 참고

- 톤: [uyu423/resume-nextjs](https://uyu423.github.io/resume-nextjs/), [alsdud154/resume](https://alsdud154.github.io/resume/)
- 콘텐츠 소스: [persica.co.kr/career](https://persica.co.kr/career/)
