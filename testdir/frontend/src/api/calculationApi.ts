import axios from 'axios';
import { CalculationResult } from '../types';

export async function calculate(value: number): Promise<CalculationResult> {
  try {
    const response = await axios.post<CalculationResult>('/api/calculate', { value });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error;
    }
    throw new Error('서버와 통신 중 오류가 발생했습니다.');
  }
}
