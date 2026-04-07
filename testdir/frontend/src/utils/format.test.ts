import { describe, it, expect } from 'vitest';
import { formatResult } from './format';
import type { CalculationResult } from '../types';

describe('formatResult', () => {
  const sampleResult: CalculationResult = {
    currentDateTime: { year: 2025, month: 7, day: 15, hour: 10, minute: 30 },
    inputValue: 5,
    results: { year: 2030, month: 12, day: 20, hour: 15, minute: 35 },
  };

  it('현재 날짜/시간 헤더를 포함한다', () => {
    const output = formatResult(sampleResult);
    expect(output).toContain('현재 날짜/시간: 2025년 7월 15일 10시 30분');
  });

  it('연도 계산 결과를 포함한다', () => {
    const output = formatResult(sampleResult);
    expect(output).toContain('연도: 2025 + 5 = 2030');
  });

  it('월 계산 결과를 포함한다', () => {
    const output = formatResult(sampleResult);
    expect(output).toContain('월: 7 + 5 = 12');
  });

  it('일 계산 결과를 포함한다', () => {
    const output = formatResult(sampleResult);
    expect(output).toContain('일: 15 + 5 = 20');
  });

  it('시간 계산 결과를 포함한다', () => {
    const output = formatResult(sampleResult);
    expect(output).toContain('시간: 10 + 5 = 15');
  });

  it('분 계산 결과를 포함한다', () => {
    const output = formatResult(sampleResult);
    expect(output).toContain('분: 30 + 5 = 35');
  });

  it('음수 입력값도 올바르게 포맷한다', () => {
    const negativeResult: CalculationResult = {
      currentDateTime: { year: 2025, month: 1, day: 1, hour: 0, minute: 0 },
      inputValue: -3,
      results: { year: 2022, month: -2, day: -2, hour: -3, minute: -3 },
    };
    const output = formatResult(negativeResult);
    expect(output).toContain('연도: 2025 + -3 = 2022');
  });
});
