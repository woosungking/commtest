# 구현 계획: date-time-adder

## 개요

React(TypeScript) 프론트엔드와 Spring Boot(Java) 백엔드로 구성된 날짜/시간 덧셈 웹 애플리케이션을 구현합니다. 백엔드 API를 먼저 구현하고, 프론트엔드를 구현한 뒤 두 컴포넌트를 연결합니다.

## 태스크

- [x] 1. 프로젝트 구조 설정
  - Spring Boot 프로젝트 생성 (Maven 또는 Gradle, Java 17+)
  - React + TypeScript 프로젝트 생성 (Vite)
  - 백엔드 의존성 추가: `spring-boot-starter-web`, `jqwik`, `spring-boot-starter-test`
  - 프론트엔드 의존성 추가: `axios`, `vitest`, `@testing-library/react`, `fast-check`
  - _Requirements: 1.1, 2.1_

- [x] 2. 백엔드 데이터 모델 및 서비스 구현
  - [x] 2.1 DTO 레코드 클래스 작성
    - `CalculationRequest(int value)` 레코드 생성
    - `DateTimeComponents(int year, int month, int day, int hour, int minute)` 레코드 생성
    - `CalculationResponse(DateTimeComponents currentDateTime, int inputValue, DateTimeComponents results)` 레코드 생성
    - _Requirements: 2.1, 3.1~3.6_

  - [x] 2.2 `CalculationService` 구현
    - `calculate(int value)` 메서드: `LocalDateTime.now()`로 현재 시간 조회 후 각 구성 요소에 독립적으로 `value` 덧셈
    - 테스트 용이성을 위해 `calculateWith(DateTimeComponents components, int value)` 오버로드 메서드 추가
    - _Requirements: 2.1, 2.2, 3.1~3.6_

  - [ ]* 2.3 `CalculationService` 단위 테스트 작성
    - 입력값 `5`, `0`, `-3`에 대한 각 구성 요소 계산 결과 검증
    - _Requirements: 3.1~3.6_

  - [ ]* 2.4 속성 기반 테스트 작성 (jqwik) - 속성 2
    - **속성 2: 계산 정확성 및 독립성**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
    - `@Property(tries = 100)`으로 임의의 `DateTimeComponents`와 `value`에 대해 각 필드가 `currentField + value`임을 검증

- [x] 3. 백엔드 API 컨트롤러 구현
  - [x] 3.1 `CalculationController` 작성
    - `POST /api/calculate` 엔드포인트 구현
    - 요청 바디 `value`가 없거나 유효하지 않을 경우 400 Bad Request 반환
    - `CalculationService`를 주입받아 계산 수행 후 JSON 응답 반환
    - CORS 설정 추가 (프론트엔드 개발 서버 허용)
    - _Requirements: 1.2, 1.3, 2.1, 2.2_

  - [ ]* 3.2 `CalculationController` 통합 테스트 작성 (MockMvc)
    - 정상 요청 시 200 응답 및 JSON 구조 검증
    - 비정수 또는 누락된 `value` 시 400 응답 검증
    - _Requirements: 1.2, 1.3_

- [x] 4. 체크포인트 - 백엔드 테스트 통과 확인
  - 모든 백엔드 테스트가 통과하는지 확인합니다. 문제가 있으면 사용자에게 알려주세요.

- [x] 5. 프론트엔드 API 서비스 및 타입 구현
  - [x] 5.1 TypeScript 인터페이스 정의
    - `DateTimeComponents`, `CalculationResult` 인터페이스 작성
    - _Requirements: 4.1, 4.2_

  - [x] 5.2 `calculationApi` 서비스 함수 작성
    - `calculate(value: number): Promise<CalculationResult>` 구현 (`POST /api/calculate` 호출)
    - 네트워크 오류 시 "서버와 통신 중 오류가 발생했습니다." 메시지로 에러 래핑
    - _Requirements: 2.1_

- [x] 6. 프론트엔드 입력 검증 및 유틸리티 구현
  - [x] 6.1 `validateInput(input: string): boolean` 함수 작성
    - 정수 문자열 여부 검증 (빈 문자열, 소수점, 알파벳, 공백 등 거부)
    - _Requirements: 1.2, 1.3_

  - [x] 6.2 `formatResult(result: CalculationResult): string` 함수 작성
    - 헤더: `"현재 날짜/시간: {연도}년 {월}월 {일}일 {시간}시 {분}분"` 형식
    - 각 구성 요소: `"{구성요소}: {기준값} + {value} = {결과}"` 형식
    - _Requirements: 4.2, 4.3, 5.2_

  - [ ]* 6.3 속성 기반 테스트 작성 (fast-check) - 속성 1, 3, 4
    - **속성 1: 비정수 입력 거부** — `validateInput`이 정수가 아닌 임의 문자열을 거부함을 검증
    - **Validates: Requirements 1.2, 1.3**
    - **속성 3: 결과 출력 형식** — `formatResult`가 모든 구성 요소에 대해 올바른 형식 문자열을 포함함을 검증
    - **Validates: Requirements 4.1, 4.2, 4.3**
    - **속성 4: 원본 날짜/시간 헤더 출력** — `formatResult`가 올바른 헤더 형식을 포함함을 검증
    - **Validates: Requirements 5.1, 5.2**

- [x] 7. `DateTimeAdderForm` 컴포넌트 구현
  - [x] 7.1 컴포넌트 구현
    - 정수 입력 필드, 제출 버튼 렌더링
    - `validateInput`으로 클라이언트 측 검증 수행, 실패 시 오류 메시지 표시
    - `calculationApi.calculate` 호출 후 로딩 상태 관리
    - 성공 시 `formatResult`로 결과 렌더링, 실패 시 서버 오류 메시지 표시
    - _Requirements: 1.1, 1.2, 1.3, 4.1, 4.2, 4.3, 5.1, 5.2_

  - [ ]* 7.2 컴포넌트 단위 테스트 작성 (Vitest + React Testing Library)
    - 입력 필드 렌더링 확인
    - 비정수 입력 시 오류 메시지 표시 확인
    - 정상 API 응답 수신 시 결과 렌더링 확인
    - _Requirements: 1.1, 1.2, 1.3, 4.1, 4.2_

- [x] 8. 최종 체크포인트 - 전체 테스트 통과 확인
  - 모든 프론트엔드 및 백엔드 테스트가 통과하는지 확인합니다. 문제가 있으면 사용자에게 알려주세요.

## 참고

- `*` 표시된 태스크는 선택 사항으로, MVP를 빠르게 구현할 경우 건너뛸 수 있습니다.
- 각 태스크는 특정 요구사항을 참조하여 추적 가능성을 보장합니다.
- 속성 기반 테스트는 보편적 정확성 속성을 검증하며, 단위 테스트는 구체적인 예시와 엣지 케이스를 검증합니다.
