import React, { useState, type FormEvent } from 'react';
import * as calculationApi from '../api/calculationApi';
import { formatResult } from '../utils/format';
import { validateInput } from '../utils/validation';
import type { CalculationResult } from '../types';

export default function DateTimeAdderForm() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateInput(inputValue)) {
      setError('유효하지 않은 입력입니다. 정수를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const data = await calculationApi.calculate(Number(inputValue));
      setResult(data);
    } catch {
      setError('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="정수를 입력하세요"
        />
        <button type="submit" disabled={loading}>
          {loading ? '계산 중...' : '계산'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <pre style={{ whiteSpace: 'pre' }}>{formatResult(result)}</pre>
      )}
    </div>
  );
}
