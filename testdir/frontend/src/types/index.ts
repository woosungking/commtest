export interface DateTimeComponents {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface CalculationResult {
  currentDateTime: DateTimeComponents;
  inputValue: number;
  results: DateTimeComponents;
}
