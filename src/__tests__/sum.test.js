import { sum } from '../components/sum';

test('sum of two numbers', () => {
  const result = sum(1, -2);
  expect(result).toBe(-1);
});
