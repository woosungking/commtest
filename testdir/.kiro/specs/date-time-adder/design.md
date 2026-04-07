# 기술 설계 문서: date-time-adder

## 개요

`date-time-adder`는 사용자가 정수를 입력하면, 현재 시스템 날짜/시간의 각 구성 요소(연도, 월, 일, 시간, 분)에 해당 정수를 독립적으로 더한 결과를 웹 화면에 표시하는 애플리케이션입니다.

- **Frontend**: React (TypeScript)
- **Backend**: Spring Boot (Java)
- **통신 방식**: REST API (HTTP JSON)

각 구성 요소의 계산은 서로 독립적으로 수행됩니다. 즉, 월 계산 결과가 12를 초과하더라도 연도에 영향을 주지 않으며, 단순 산술 덧셈 결과를 그대로 표시합니다.

---

## 아키텍처

```mermaid
flowchart TD
    A[사용자 브라우저\nReact App] -->|POST /api/calculate\n{ value: 5 }| B[Spring Boot API]
    B -->|현재 날짜/시간 조회| C[Java LocalDateTime]
    C --> B
    B -->|계산 수행| D[CalculationService]
    D --> B
    B -->|JSON 응답| A
    A --> E[결과 화면 렌더링]
```

**요청/응답 흐름:**
1. 사용자가 React UI에서 정수를 입력하고 제출
2. React가 입력값을 검증 후 Spring Boot API로 POST 요청
3. Spring Boot가 현재 날짜/시간을 조회하고 각 구성 요소에 덧셈 계산 수행
4. 계산 결과를 JSON으로 반환
5. React가 결과를 화면에 렌더링

---

## 컴포넌트 및 인터페이스

### Frontend (React)

#### `DateTimeAdderForm` 컴포넌트

사용자 입력 폼과 결과 표시를 담당하는 메인 컴포넌트입니다.

```tsx
interface CalculationResult {
  currentDateTime: DateTimeComponents;
  inputValue: number;
  results: DateTimeComponents;
}

interface DateTimeComponents {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

// 주요 상태
const [inputValue, setInputValue] = useState<string>('');
const [result, setResult] = useState<CalculationResult | null>(null);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false);
```

#### `calculationApi` 서비스

백엔드 API 호출을 담당합니다.

```ts
async function calculate(value: number): Promise<CalculationResult> {
  // POST /api/calculate
}
```

### Backend (Spring Boot)

#### `CalculationController`

REST API 엔드포인트를 제공합니다.

```java
@RestController
@RequestMapping("/api")
public class CalculationController {

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(
        @RequestBody CalculationRequest request
    );
}
```

#### `CalculationService`

현재 날짜/시간 조회 및 덧셈 계산 로직을 담당합니다.

```java
@Service
public class CalculationService {

    public CalculationResponse calculate(int value) {
        // LocalDateTime.now()로 현재 시간 조회
        // 각 구성 요소에 value를 독립적으로 더함
    }
}
```

---

## 데이터 모델

### API 요청 (Request)

```json
POST /api/calculate
Content-Type: application/json

{
  "value": 5
}
```

### API 응답 (Response)

```json
{
  "currentDateTime": {
    "year": 2025,
    "month": 7,
    "day": 15,
    "hour": 10,
    "minute": 30
  },
  "inputValue": 5,
  "results": {
    "year": 2030,
    "month": 12,
    "day": 20,
    "hour": 15,
    "minute": 35
  }
}
```

### Java DTO

```java
public record CalculationRequest(int value) {}

public record DateTimeComponents(
    int year, int month, int day, int hour, int minute
) {}

public record CalculationResponse(
    DateTimeComponents currentDateTime,
    int inputValue,
    DateTimeComponents results
) {}
```

### 화면 출력 형식 예시

```
현재 날짜/시간: 2025년 7월 15일 10시 30분

연도: 2025 + 5 = 2030
월: 7 + 5 = 12
일: 15 + 5 = 20
시간: 10 + 5 = 15
분: 30 + 5 = 35
```

---

## 정확성 속성 (Correctness Properties)

*속성(Property)이란 시스템의 모든 유효한 실행에서 참이어야 하는 특성 또는 동작입니다. 즉, 시스템이 무엇을 해야 하는지에 대한 형식적 명세입니다. 속성은 사람이 읽을 수 있는 명세와 기계가 검증할 수 있는 정확성 보장 사이의 다리 역할을 합니다.*

### 속성 1: 비정수 입력 거부

*임의의* 정수가 아닌 문자열(알파벳, 소수점 숫자, 빈 문자열, 공백 등)에 대해, 입력 검증 로직은 해당 입력을 거부하고 "유효하지 않은 입력입니다. 정수를 입력해주세요." 오류 메시지를 표시해야 한다.

**Validates: Requirements 1.2, 1.3**

---

### 속성 2: 계산 정확성 및 독립성

*임의의* `DateTimeComponents`와 *임의의* 정수 `value`에 대해, `CalculationService.calculate(value)`의 결과는 각 필드가 정확히 `currentField + value`와 같아야 하며, 각 필드의 계산은 다른 필드에 영향을 주지 않아야 한다.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

---

### 속성 3: 결과 출력 형식

*임의의* `CalculationResponse`에 대해, 결과 렌더링 함수의 출력은 각 구성 요소(연도, 월, 일, 시간, 분)에 대해 `"{구성요소}: {기준값} + {value} = {결과}"` 형식의 항목을 포함해야 한다.

**Validates: Requirements 4.1, 4.2, 4.3**

---

### 속성 4: 원본 날짜/시간 헤더 출력

*임의의* `DateTimeComponents`에 대해, 결과 렌더링 함수의 출력은 `"현재 날짜/시간: {연도}년 {월}월 {일}일 {시간}시 {분}분"` 형식의 헤더를 포함해야 한다.

**Validates: Requirements 5.1, 5.2**

---

## 오류 처리

| 상황 | Frontend 처리 | Backend 처리 |
|------|--------------|-------------|
| 정수가 아닌 입력 | 클라이언트 측 검증으로 API 호출 차단, 오류 메시지 표시 | 400 Bad Request 반환 |
| 빈 입력 | 클라이언트 측 검증으로 처리 | 400 Bad Request 반환 |
| 네트워크 오류 | "서버와 통신 중 오류가 발생했습니다." 메시지 표시 | - |
| 서버 내부 오류 | 서버 오류 메시지 표시 | 500 Internal Server Error 반환 |

---

## 테스트 전략

### 이중 테스트 접근법

단위 테스트와 속성 기반 테스트를 함께 사용합니다. 단위 테스트는 구체적인 예시와 엣지 케이스를 검증하고, 속성 기반 테스트는 임의의 입력에 대한 보편적 속성을 검증합니다.

### Backend 단위 테스트 (JUnit 5)

구체적인 예시와 엣지 케이스에 집중합니다.

- 입력값 `5` → 각 구성 요소에 5가 더해진 결과 확인
- 입력값 `0` → 각 구성 요소가 변하지 않음 확인
- 입력값 `-3` → 음수 덧셈 결과 확인
- API 엔드포인트 통합 테스트 (MockMvc)

### Backend 속성 기반 테스트 (jqwik)

Java의 `jqwik` 라이브러리를 사용합니다. 각 테스트는 최소 100회 이상 반복 실행됩니다.

```java
// Feature: date-time-adder, Property 2: 계산 정확성 및 독립성
@Property(tries = 100)
void calculationAccuracyAndIndependence(
    @ForAll int year, @ForAll int month, @ForAll int day,
    @ForAll int hour, @ForAll int minute, @ForAll int value
) {
    DateTimeComponents components = new DateTimeComponents(year, month, day, hour, minute);
    // CalculationService를 직접 호출하여 검증
    CalculationResponse result = service.calculateWith(components, value);
    assertThat(result.results().year()).isEqualTo(year + value);
    assertThat(result.results().month()).isEqualTo(month + value);
    assertThat(result.results().day()).isEqualTo(day + value);
    assertThat(result.results().hour()).isEqualTo(hour + value);
    assertThat(result.results().minute()).isEqualTo(minute + value);
}
```

### Frontend 단위 테스트 (Vitest + React Testing Library)

- 입력 필드 렌더링 확인 (요구사항 1.1)
- 비정수 입력 시 오류 메시지 표시 확인
- 정상 응답 수신 시 결과 렌더링 확인

### Frontend 속성 기반 테스트 (fast-check)

```ts
// Feature: date-time-adder, Property 1: 비정수 입력 거부
test('비정수 입력은 거부된다', () => {
  fc.assert(
    fc.property(
      fc.string().filter(s => !/^-?\d+$/.test(s.trim())),
      (invalidInput) => {
        expect(validateInput(invalidInput)).toBe(false);
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: date-time-adder, Property 3: 결과 출력 형식
test('결과 렌더링에 모든 구성 요소 형식이 포함된다', () => {
  fc.assert(
    fc.property(
      fc.record({
        year: fc.integer(), month: fc.integer(), day: fc.integer(),
        hour: fc.integer(), minute: fc.integer()
      }),
      fc.integer(),
      (components, value) => {
        const result = { currentDateTime: components, inputValue: value,
          results: { year: components.year + value, month: components.month + value,
            day: components.day + value, hour: components.hour + value,
            minute: components.minute + value } };
        const output = formatResult(result);
        expect(output).toContain(`연도: ${components.year} + ${value} = ${result.results.year}`);
        expect(output).toContain(`월: ${components.month} + ${value} = ${result.results.month}`);
        expect(output).toContain(`일: ${components.day} + ${value} = ${result.results.day}`);
        expect(output).toContain(`시간: ${components.hour} + ${value} = ${result.results.hour}`);
        expect(output).toContain(`분: ${components.minute} + ${value} = ${result.results.minute}`);
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: date-time-adder, Property 4: 원본 날짜/시간 헤더 출력
test('결과 렌더링에 원본 날짜/시간 헤더가 포함된다', () => {
  fc.assert(
    fc.property(
      fc.record({
        year: fc.integer({ min: 1, max: 9999 }),
        month: fc.integer({ min: 1, max: 12 }),
        day: fc.integer({ min: 1, max: 31 }),
        hour: fc.integer({ min: 0, max: 23 }),
        minute: fc.integer({ min: 0, max: 59 })
      }),
      fc.integer(),
      (components, value) => {
        const result = { currentDateTime: components, inputValue: value,
          results: { year: components.year + value, month: components.month + value,
            day: components.day + value, hour: components.hour + value,
            minute: components.minute + value } };
        const output = formatResult(result);
        const expectedHeader = `현재 날짜/시간: ${components.year}년 ${components.month}월 ${components.day}일 ${components.hour}시 ${components.minute}분`;
        expect(output).toContain(expectedHeader);
      }
    ),
    { numRuns: 100 }
  );
});
```
