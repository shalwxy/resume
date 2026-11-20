const isProd = process.env.NODE_ENV === "production";

/** GitHub Pages project-page prefix. next.config.ts와 앱 코드가 이 값을 공유해야
 * 환경변수가 안 설정된 production build에서도 Next의 자체 에셋 경로와
 * 손으로 만든 내부 링크(href)가 어긋나지 않는다. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/resume" : "");
