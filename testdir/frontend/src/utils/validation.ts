/**
 * 입력 문자열이 정수인지 검증합니다.
 * 음수 정수도 허용합니다 (예: "-3").
 * 빈 문자열, 소수점, 알파벳, 공백 등은 거부합니다.
 */
export function validateInput(input: string): boolean {
  return /^-?\d+$/.test(input);
}
