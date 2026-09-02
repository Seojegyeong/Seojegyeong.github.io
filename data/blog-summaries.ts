const summaries: Record<string, string> = {
  "https://seojegyeong.tistory.com/9":
    "span마다 리스너를 개별 부착하는 방식의 한계를 발견하고, 이벤트 위임으로 타사 페이지 성능 부담을 최소화한 설계 과정 회고.",
  "https://seojegyeong.tistory.com/8":
    "Vite 개발 서버의 Network URL(IP 주소)로 접속 시 Secure 쿠키가 비보안 컨텍스트로 판단되어 새로고침 때마다 로그아웃되는 원인을 분석한 기록.",
  "https://seojegyeong.tistory.com/7":
    "포맷 규칙이 16개 파일에 분산되어 화면마다 지표가 다르게 표시되는 버그를 METRIC_REGISTRY 레지스트리 패턴으로 단일화해 해결한 과정 회고.",
  "https://seojegyeong.tistory.com/6":
    "queryKey 오타로 invalidate가 동작하지 않는 문제를 계기로 캐시 hit/miss 원리를 파악하고, 키를 상수로 중앙 관리하는 구조로 리팩토링한 과정 회고.",
  "https://seojegyeong.tistory.com/5":
    "배포·시연 전 수동 확인에만 의존하던 검증 과정에서 Playwright로 E2E 테스트 환경을 도입하고 Cursor로 시나리오 작성을 자동화한 초기 세팅 과정 회고.",
  "https://seojegyeong.tistory.com/4":
    "Context를 유니온 타입으로 합쳤다가 타입 보장 실패로 에러가 발생해, 분리 재설계하며 배운 트러블슈팅 기록.",
};

export default summaries;
