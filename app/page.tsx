import type { ReactNode } from "react";

export default function Home() {
  return (
    <main className="mx-auto max-w-[760px] px-6 py-16 sm:px-8 sm:py-24">
      <Header />
      <Section title="INTRODUCE">
        <div className="space-y-4 text-[15.5px]">
          <p>
            서비스가 어떻게 요청을 받고, 데이터를 어떻게 보관하며, 어떤 경로로
            실패와 복구를 만들어 내는지에 집중해 왔습니다. Java 백엔드(2년) →
            AI/GPU 인프라 R&amp;D(2년) → Go 백엔드(3년)의 <b>7년</b>을 거치며,
            분산 시스템의 데이터 일관성과 운영 가능한 구조를 설계·구축했습니다.
          </p>
          <p>
            최근 3년은 Maplestory Universe에서 두 축에 집중했습니다. 체인 간
            자산 이동을 다루는 <b>Swap &amp; Warp 도메인</b>을 처음부터
            설계했고, 서비스마다 흩어져 있던 제어 로직을 <b>단일 정책
            서비스(api-sentinel)</b>로 모으는 일을 주도했습니다. 둘 다 &ldquo;여러
            소스에서 오는 상태를 어떻게 한 곳에서 일관되게 다루는가&rdquo;라는 같은
            질문 위에 있고, 그 위에서 운영을 자동화하는 <b>CDC 파이프라인</b>과
            <b> LLM 에러 분석 봇</b>을 만들었습니다.
          </p>
          <p>
            요청 하나의 수명 주기를 끝까지 따라갈 수 있는 상관관계 설계, 사고가
            났을 때 재현·복구 가능한 사이드이펙트 경로, 운영팀이 알림만 보고도
            원인에 접근할 수 있는 지표를 중요하게 생각합니다.
          </p>
        </div>
        <p className="mt-6 text-xs text-muted">
          최종 업데이트 · 2026. 10. 28.
        </p>
      </Section>

      <Section title="SKILL" hint={SKILL_LEVEL_HINT}>
        <div className="divide-y divide-rule border-y border-rule">
          <SkillRow
            label="Languages"
            items={[
              ["Go", 3],
              ["Java (Spring)", 3],
              ["Python", 2],
              ["SQL", 3],
              ["Shell", 2],
            ]}
          />
          <SkillRow
            label="Communication"
            items={[
              ["gRPC (unary·streaming)", 3],
              ["HTTP / REST", 3],
              ["SSE", 3],
              ["Envoy", 2],
              ["Kafka", 3],
              ["Debezium (CDC)", 2],
              ["Watermill", 2],
            ]}
          />
          <SkillRow
            label="Data"
            items={[
              ["PostgreSQL", 3],
              ["Redis", 3],
              ["MongoDB", 2],
              ["DocumentDB", 2],
              ["Snowflake", 2],
            ]}
          />
          <SkillRow
            label="Infrastructure"
            items={[
              ["Docker", 3],
              ["Kubernetes (EKS)", 3],
              ["Helm", 3],
              ["GitLab CI", 3],
              ["ArgoCD", 2],
              ["Rundeck", 2],
              ["Ansible", 2],
            ]}
          />
          <SkillRow
            label="Observability"
            items={[
              ["Datadog", 3],
              ["Jaeger", 2],
              ["OpenSearch", 2],
              ["Prometheus / Grafana", 2],
            ]}
          />
          <SkillRow
            label="AI"
            items={[
              ["Vertex AI (LLM)", 2],
              ["NVIDIA Omniverse / IsaacSim", 1],
            ]}
          />
        </div>
      </Section>

      <Section title="EXPERIENCE">
        <div className="space-y-8">
          <JobCard
            period="2023.11 ~ 현재"
            company="NEXON UNIVERSE"
            role="Backend Developer · Platform Development Team"
          >
            NEXON 자회사로, Maplestory IP를 기반으로 한 Web3 게임 플랫폼
            <b> Maplestory Universe</b>를 만들고 있습니다. 크로스체인 전송
            도메인(Swap &amp; Warp)과 정책 서비스(api-sentinel)를 신설·주도했고,
            거래 이력·결제·알림·데이터 파이프라인·CI/CD에 함께 참여했습니다.
          </JobCard>

          <JobCard
            period="2019.11 ~ 2023.10"
            company="UCLICK"
            role="AI R&D (2022.01~) · Backend Developer (~2021.12)"
          >
            NVIDIA Omniverse R&amp;D(IsaacSim/ROS)와 GPU 솔루션 운영을 거쳐,
            이전에는 UNO-GATEWAY(다중 DB 동적 API 플랫폼), UNO-MSP(OCI 관리
            플랫폼), MDB(TCP-JSON 변환) 등 자사 B2B 백엔드를 Java/Spring으로
            개발했습니다.
          </JobCard>
        </div>
      </Section>

      <Section title="PROJECT">
        <div className="space-y-12">
          <ProjectCard
            period="2026.01 ~ 현재"
            title="정책 서비스 신설 · api-sentinel"
            summary="4개 서비스에 흩어져 있던 접근 제어·속도 제한·잠금·기능 토글을 단일 정책 서비스로 수렴. 설계부터 마이그레이션, 배포 자동화까지 전 과정 주도."
            stack={["Go", "gRPC", "PostgreSQL", "Redis"]}
          >
            <Block label="문제">
              ACL, Rate Limit, Lockout, Feature Flag가 서비스마다 다른 코드와
              다른 저장소에 구현되어 있었습니다. 같은 정책을 바꾸려면 서비스
              4곳을 각각 고쳐 배포해야 했고, 동작이 서로 어긋나는 일이
              잦았습니다.
            </Block>
            <Block label="설계">
              <li>
                정책 서비스를 신설해 4개 서비스가 <b>단일 진입점</b>으로 정책을
                조회하도록 구조 변경. 기존 제어 로직을 서비스별로 걷어내며
                마이그레이션
              </li>
              <li>
                코드 분기 대신 <b>런타임 설정 기반</b>으로 정책을 바꾸는 체계
                도입. 설정은 부팅 시 주입하는 원칙을 세워 요청 경로에서의
                설정 조회·패닉 가능성을 차단
              </li>
              <li>
                ACL: 지갑/IP 화이트·블랙리스트 · Rate Limit: Sliding/Fixed
                Window + jitter · Lockout: OTP 반복 실패 차단, 실패 횟수
                유지/초기화를 정책으로 설정화 · Feature Flag: 런타임 변경
              </li>
              <li>정책 변경 배포 프로세스를 자동화해 운영 변경 리드타임 단축</li>
            </Block>
            <Block label="결과">
              정책의 소스 오브 트루스가 한 곳으로 모이면서 서비스 간 동작
              불일치가 구조적으로 사라졌고, 신규 서비스는 제어 로직을 다시
              만들 필요 없이 sentinel에 붙기만 하면 되는 상태가 됐습니다.
            </Block>
          </ProjectCard>

          <ProjectCard
            period="2026.01 ~ 2026.11"
            title="PostgreSQL CDC → Snowflake 파이프라인"
            summary="배치 동기화와 애플리케이션 Kafka 발행에 기대던 분석 데이터 적재를 Debezium 기반 CDC로 교체. 발행 실패로 유실되던 경로를 없애고 실시간성을 확보. 설계·구현 담당."
            stack={[
              "Debezium",
              "PostgreSQL replication slot",
              "Kafka",
              "Snowflake Stream/Task",
            ]}
          >
            <Block label="문제">
              PostgreSQL → Snowflake 적재는 주기 배치였고, 거래 확정 이벤트는
              애플리케이션이 Kafka에 직접 발행했습니다. 발행이 실패하면 DB에는
              남아 있지만 하류에는 영원히 도착하지 않는 데이터가 생겼고, 배치
              주기만큼의 지연은 분석과 운영 조회를 느리게 만들었습니다.
            </Block>
            <Block label="설계">
              <li>
                Debezium 커넥터로 PostgreSQL 변경을 Kafka로 스트리밍하고,
                Snowflake Stream/Task로 적재. <b>DB 커밋 자체가 발행</b>이 되어
                애플리케이션 발행 실패라는 유실 경로가 사라짐
              </li>
              <li>
                replication slot이 방치되면 WAL이 쌓여 운영 DB를 위협하므로,
                slot <b>keepalive 배치</b>를 두어 유휴 구간에서도 slot이
                전진하도록 관리
              </li>
              <li>
                Snowflake Task를 조건부로 실행해 변경이 없는 구간에 웨어하우스
                비용이 발생하지 않도록 최적화
              </li>
            </Block>
            <Block label="결과">
              배치 동기화를 CDC로 완전히 대체해 유실 경로를 제거했고, 적재
              지연이 배치 주기에서 변경 즉시로 줄었습니다.
            </Block>
          </ProjectCard>

          <ProjectCard
            period="2026.01 ~ 2026.11"
            title="에러시로봇 · LLM 기반 운영 에러 1차 분석"
            summary="Slack에 쏟아지는 에러 알림을 LLM이 먼저 읽고 스레드에 원인·관련 변경·대응 포인터를 답하는 봇. 벤더 모델 폐기 장애를 3일 내 복구하며 모델 교체·재시도 구조를 함께 만듦."
            stack={["Vertex AI (LLM)", "Slack API", "GitLab", "OpenSearch"]}
          >
            <Block label="문제">
              운영 에러 알림은 사람이 하나씩 열어 로그를 찾고 최근 배포와
              대조해야 했습니다. 알림 수가 늘수록 1차 분류에 드는 시간이
              대응 속도를 결정했고, 야간·주말에는 그마저 지연됐습니다.
            </Block>
            <Block label="설계">
              <li>
                에러 알림 수신 → LLM 1차 분석 → Slack 스레드 자동 응답 흐름.
                분석 시 <b>GitLab 최근 커밋 대조</b>와 <b>OpenSearch 히스토리</b>를
                함께 넣어 &ldquo;무엇이 바뀌어서 터졌는지&rdquo;까지 답하게 구성
              </li>
              <li>
                봇이 판단하기 어려운 케이스는 담당자에게 <b>escalation</b>하도록
                해, 자동 응답이 오답을 확신하는 경로를 차단
              </li>
              <li>
                벤더가 모델을 폐기해 봇이 멈춘 장애에서 <b>모델 교체 +
                재시도/백오프 + 세마포어</b>로 재구성. 이후 같은 장애는 모델
                교체만으로 처리 가능
              </li>
            </Block>
            <Block label="결과">
              에러의 1차 분류가 사람에서 봇으로 넘어가 대응 착수까지의 시간이
              줄었고, 벤더 모델 폐기 장애는 <b>3일 내 1차 대응</b>을 마쳤습니다.
            </Block>
          </ProjectCard>

          <ProjectCard
            period="2024.06 ~ 2025.09"
            title="Swap & Warp · 크로스체인 전송 도메인 신설"
            summary="체인 간 자산 이동(Swap, Warp)의 이력 도메인과 BFF를 처음부터 설계·구현. 서로 다른 두 이벤트 소스가 만드는 순서 불일치와 중복을 일관성 있게 흡수하는 적재 경로를 만듦."
            stack={["Go", "gRPC", "Kafka", "PostgreSQL", "Redis", "MongoDB"]}
          >
            <Block label="문제">
              Maplestory Universe에 크로스체인 자산 전송 기능이 들어오면서,
              체인 간 이동 이력을 추적·조회하는 도메인 자체가 없었습니다.
              전송 결과는 tracker(요청 측)와 watcher(체인 측) 두 소스에서
              별도의 이벤트로 도착하고, 순서가 보장되지 않으며 같은 블록
              시각의 이벤트가 중복으로 올 수 있었습니다.
            </Block>
            <Block label="설계">
              <li>
                Swap &amp; Warp를 거래 이력과 분리된 <b>별도 도메인</b>으로
                정의하고, 게이트웨이 역할의 신규 BFF(bff-swapnwarp) 구성
              </li>
              <li>
                두 소스 이벤트를 묶는 <b>상관관계 키</b>를 명시적으로 정하고,
                조회 키와 잠금 시드를 동일하게 맞춰 &ldquo;임의 row 매칭&rdquo;이
                구조적으로 불가능하도록 설계
              </li>
              <li>
                요청 정보(Info)와 결과(Result)의 동시 적재를 PostgreSQL{" "}
                <b>advisory lock</b>으로 직렬화. 블록 시각이 같은 이벤트를 stale로
                오판하지 않는 중복 판정 규칙 정립
              </li>
              <li>
                DB 제약 위반을 삼키지 않고 전파하도록 바꿔 트랜잭션 롤백 →
                컨슈머 재시도 → 멱등 Modify로 수렴하는 <b>재시도 경로</b> 확보
              </li>
              <li>트랜잭션 결과 확정 시 알림 이벤트를 발행하는 메커니즘 구축</li>
            </Block>
            <Block label="결과">
              크로스체인 전송 이력이 사용자 관점에서 한 줄로 보이는 조회
              기능을 제공했고, 이후 USDT·워프 지연 같은 확장이 같은 적재
              경로 위에 올라갈 수 있는 기반이 됐습니다.
            </Block>
          </ProjectCard>

          <div className="text-[14px] leading-relaxed text-muted">
            <span className="font-semibold text-foreground">그 외 참여</span>{" "}
            · 온체인/오프체인 동기화(닉네임 중복 분산 락, NFT 검증 배치화) ·
            Worldpay 3DS 결제 인증 · gRPC 스트리밍/SSE 통합 알림(5만+ 수신자)
            · 5개 환경 CI/CD·Helm·Envoy 운영
          </div>
        </div>
      </Section>

      <Section title="CORE COMPETENCY" last>
        <ul className="list-disc space-y-2 pl-5 text-[14.5px] marker:text-muted">
          <li>
            <b>백엔드(Go)</b> · 서비스 아키텍처 설계, 레이어드/인터페이스 기반
            디커플링, gRPC·Kafka 기반 통신, 리팩토링
          </li>
          <li>
            <b>데이터·메시징</b> · 용도별 데이터 저장소 선정, Kafka 컨슈머 설계,
            CDC 파이프라인 설계, DDL 관리, 쿼리 최적화
          </li>
          <li>
            <b>인프라·운영</b> · CI/CD 운영, Kubernetes 매니페스트 관리, 리소스
            최적화, 게이트웨이 설정, 다중 환경 배포
          </li>
          <li>
            <b>관측·디버깅</b> · 상관관계 ID 설계, 요청 end-to-end 추적,
            가설 기반 디버깅, 운영 자동화
          </li>
          <li>
            <b>협업</b> · 요구사항 명세 정리, 비기술 조직과의 커뮤니케이션,
            문서화, 코드 리뷰 실천
          </li>
        </ul>
      </Section>

      <footer className="mt-16 border-t border-rule pt-6 text-center text-xs text-muted">
        © 2026 Seungha Lee ·{" "}
        <a href="mailto:shalee@nexonuniverse.io">shalee@nexonuniverse.io</a>
      </footer>
    </main>
  );
}

function Header() {
  return (
    <header className="mb-14">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        Resume · Backend Engineer
      </p>
      <h1 className="mt-2 text-4xl font-semibold">
        이승하 <span className="text-muted">· Seungha Lee</span>
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed">
        분산 시스템의 데이터 일관성과 운영 가능한 구조를 설계·구축하는
        <b> 7년차 백엔드 엔지니어</b>.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
        <span>
          <a href="mailto:shalee@nexonuniverse.io">shalee@nexonuniverse.io</a>
        </span>
        <span>·</span>
        <span>NEXON UNIVERSE · Maplestory Universe</span>
      </div>
    </header>
  );
}

function Section({
  title,
  hint,
  children,
  last,
}: {
  title: string;
  hint?: string[];
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={`${last ? "" : "border-b border-rule"} py-10 first:pt-0`}
    >
      <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        {title}
        {hint && <Hint lines={hint} />}
      </h2>
      {children}
    </section>
  );
}

const SKILL_LEVEL_HINT = [
  "1: 기초 수준",
  "2: 운영 경험 있음",
  "3: Production 설계·운영 가능",
];

function Hint({ lines }: { lines: string[] }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={lines.join(", ")}
        className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold normal-case tracking-normal text-background"
      >
        ?
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-6 top-1/2 z-10 w-max -translate-y-1/2 rounded-md bg-foreground px-3 py-2 text-[12px] font-medium normal-case leading-5 tracking-normal text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}

type SkillLevel = 1 | 2 | 3;

function SkillRow({
  label,
  items,
}: {
  label: string;
  items: [string, SkillLevel][];
}) {
  return (
    <div className="grid grid-cols-1 gap-y-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-x-8">
      <h3 className="text-[15px] font-semibold text-muted sm:text-right">
        {label}
      </h3>
      <ul className="columns-1 gap-x-6 text-[14.5px] sm:columns-3">
        {items.map(([name, level]) => (
          <li
            key={name}
            className="flex break-inside-avoid items-center gap-2 py-[3px]"
          >
            <LevelBadge level={level} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LEVEL_STYLE: Record<SkillLevel, string> = {
  3: "bg-accent text-background",
  2: "bg-muted/80 text-background",
  1: "border border-rule text-muted",
};

function LevelBadge({ level }: { level: SkillLevel }) {
  return (
    <span
      className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${LEVEL_STYLE[level]}`}
    >
      {level}
    </span>
  );
}

function JobCard({
  period,
  company,
  role,
  children,
}: {
  period: string;
  company: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <article>
      <header className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-lg font-semibold">
          {company}{" "}
          <span className="font-normal text-muted">· {role}</span>
        </h3>
        <span className="font-mono text-xs text-muted">{period}</span>
      </header>
      <p className="text-[15px] leading-relaxed">{children}</p>
    </article>
  );
}

function ProjectCard({
  period,
  title,
  summary,
  stack,
  children,
}: {
  period: string;
  title: string;
  summary: string;
  stack: string[];
  children: ReactNode;
}) {
  return (
    <article>
      <header className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-[18px] font-semibold">{title}</h3>
        <span className="font-mono text-xs text-muted">{period}</span>
      </header>
      <p className="mb-5 text-[15px] leading-relaxed">{summary}</p>
      <div className="space-y-4">{children}</div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-rule px-2.5 py-0.5 font-mono text-[11px] text-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  const isList = Array.isArray(children);
  return (
    <div className="grid grid-cols-[44px_1fr] gap-x-4 text-[14.5px] leading-relaxed">
      <span className="pt-[2px] text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      {isList ? (
        <ul className="list-disc space-y-1.5 pl-4 marker:text-muted">
          {children}
        </ul>
      ) : (
        <p>{children}</p>
      )}
    </div>
  );
}
