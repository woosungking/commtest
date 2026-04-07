import type { CalculationResult } from '../types';

/**
 * 계산 결과를 화면 출력 형식의 문자열로 변환합니다.
 *
 * 예시:
 * 현재 날짜/시간: 2025년 7월 15일 10시 30분
 *
 * 연도: 2025 + 5 = 2030
 * 월: 7 + 5 = 12
 * 일: 15 + 5 = 20
 * 시간: 10 + 5 = 15
 * 분: 30 + 5 = 35
 */
export function formatResult(result: CalculationResult): string {
  const { currentDateTime, inputValue, results } = result;

  const header = `현재 날짜/시간: ${currentDateTime.year}년 ${currentDateTime.month}월 ${currentDateTime.day}일 ${currentDateTime.hour}시 ${currentDateTime.minute}분`;

  const lines = [
    `연도: ${currentDateTime.year} + ${inputValue} = ${results.year}`,
    `월: ${currentDateTime.month} + ${inputValue} = ${results.month}`,
    `일: ${currentDateTime.day} + ${inputValue} = ${results.day}`,
    `시간: ${currentDateTime.hour} + ${inputValue} = ${results.hour}`,
    `분: ${currentDateTime.minute} + ${inputValue} = ${results.minute}`,
  ];

  return [header, '', ...lines].join('\n');
}
