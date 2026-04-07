# 요구사항 문서

## 소개

사용자가 숫자를 입력하면, 현재 날짜와 시간의 각 구성 요소(연도, 월, 일, 시간, 분)에 해당 숫자를 더한 결과를 화면에 표시하는 프로그램입니다.

## 용어 정의

- **DateTimeAdder**: 날짜/시간 덧셈 계산 및 결과 표시를 담당하는 시스템
- **Input_Value**: 사용자가 입력하는 정수 값
- **Current_DateTime**: 프로그램 실행 시점의 시스템 날짜 및 시간
- **Result**: 각 날짜/시간 구성 요소에 Input_Value를 더한 계산 결과

## 요구사항

### 요구사항 1: 숫자 입력 받기

**사용자 스토리:** 사용자로서, 숫자를 입력할 수 있어야 합니다. 그래야 날짜/시간 계산에 사용할 값을 지정할 수 있습니다.

#### 인수 기준

1. THE DateTimeAdder SHALL 사용자로부터 정수 값(Input_Value)을 입력받는 인터페이스를 제공한다.
2. WHEN 사용자가 Input_Value를 입력하면, THE DateTimeAdder SHALL 입력값이 정수인지 검증한다.
3. IF 사용자가 정수가 아닌 값을 입력하면, THEN THE DateTimeAdder SHALL "유효하지 않은 입력입니다. 정수를 입력해주세요."라는 오류 메시지를 표시한다.

---

### 요구사항 2: 현재 날짜/시간 조회

**사용자 스토리:** 사용자로서, 계산의 기준이 되는 현재 날짜와 시간을 시스템에서 자동으로 가져오길 원합니다. 그래야 별도로 날짜를 입력하지 않아도 됩니다.

#### 인수 기준

1. WHEN 사용자가 Input_Value를 입력하면, THE DateTimeAdder SHALL 시스템의 현재 날짜와 시간(연도, 월, 일, 시간, 분)을 조회한다.
2. THE DateTimeAdder SHALL 조회한 Current_DateTime을 계산의 기준값으로 사용한다.

---

### 요구사항 3: 날짜/시간 각 구성 요소에 덧셈 계산

**사용자 스토리:** 사용자로서, 입력한 숫자가 현재 연도, 월, 일, 시간, 분 각각에 더해진 결과를 보고 싶습니다. 그래야 각 시간 단위별로 더해진 값을 확인할 수 있습니다.

#### 인수 기준

1. WHEN 사용자가 유효한 Input_Value를 입력하면, THE DateTimeAdder SHALL 현재 연도에 Input_Value를 더한 값을 계산한다.
2. WHEN 사용자가 유효한 Input_Value를 입력하면, THE DateTimeAdder SHALL 현재 월에 Input_Value를 더한 값을 계산한다.
3. WHEN 사용자가 유효한 Input_Value를 입력하면, THE DateTimeAdder SHALL 현재 일에 Input_Value를 더한 값을 계산한다.
4. WHEN 사용자가 유효한 Input_Value를 입력하면, THE DateTimeAdder SHALL 현재 시간에 Input_Value를 더한 값을 계산한다.
5. WHEN 사용자가 유효한 Input_Value를 입력하면, THE DateTimeAdder SHALL 현재 분에 Input_Value를 더한 값을 계산한다.
6. THE DateTimeAdder SHALL 각 구성 요소의 계산을 독립적으로 수행한다 (예: 월 계산 결과가 12를 초과하더라도 연도에 영향을 주지 않는다).

---

### 요구사항 4: 계산 결과 표시

**사용자 스토리:** 사용자로서, 계산된 결과를 명확하게 확인하고 싶습니다. 그래야 어떤 구성 요소에 어떤 값이 더해졌는지 한눈에 알 수 있습니다.

#### 인수 기준

1. WHEN 계산이 완료되면, THE DateTimeAdder SHALL 연도, 월, 일, 시간, 분 각각의 계산 결과를 화면에 표시한다.
2. THE DateTimeAdder SHALL 결과를 다음 형식으로 표시한다: "연도: {현재 연도} + {Input_Value} = {결과}", "월: {현재 월} + {Input_Value} = {결과}", "일: {현재 일} + {Input_Value} = {결과}", "시간: {현재 시간} + {Input_Value} = {결과}", "분: {현재 분} + {Input_Value} = {결과}"
3. THE DateTimeAdder SHALL 입력값과 현재 날짜/시간 기준값을 함께 표시하여 계산 과정을 명확히 한다.

---

### 요구사항 5: 원본 일자 표시

**사용자 스토리:** 사용자로서, 계산 결과와 함께 현재 날짜/시간 원본도 확인하고 싶습니다. 그래야 어떤 기준값에서 계산이 이루어졌는지 알 수 있습니다.

#### 인수 기준

1. WHEN 계산이 완료되면, THE DateTimeAdder SHALL 계산 결과와 함께 현재 날짜/시간 원본(연도, 월, 일, 시간, 분)을 화면에 표시한다.
2. THE DateTimeAdder SHALL 원본 날짜/시간을 결과 표시 상단에 "현재 날짜/시간: {연도}년 {월}월 {일}일 {시간}시 {분}분" 형식으로 표시한다.
