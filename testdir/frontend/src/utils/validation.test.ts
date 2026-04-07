import { describe, it, expect } from 'vitest';
import { validateInput } from './validation';

describe('validateInput', () => {
  it('양의 정수를 허용한다', () => {
    expect(validateInput('5')).toBe(true);
    expect(validateInput('100')).toBe(true);
    expect(validateInput('0')).toBe(true);
  });

  it('음의 정수를 허용한다', () => {
    expect(validateInput('-3')).toBe(true);
    expect(validateInput('-100')).toBe(true);
  });

  it('빈 문자열을 거부한다', () => {
    expect(validateInput('')).toBe(false);
  });

  it('소수점을 거부한다', () => {
    expect(validateInput('3.14')).toBe(false);
    expect(validateInput('-1.5')).toBe(false);
  });

  it('알파벳을 거부한다', () => {
    expect(validateInput('abc')).toBe(false);
    expect(validateInput('1a')).toBe(false);
  });

  it('공백을 거부한다', () => {
    expect(validateInput(' ')).toBe(false);
    expect(validateInput('1 2')).toBe(false);
  });

  it('특수문자를 거부한다', () => {
    expect(validateInput('+')).toBe(false);
    expect(validateInput('1+2')).toBe(false);
  });
});
