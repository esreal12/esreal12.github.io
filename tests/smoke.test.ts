import { expect, test } from 'vitest';

test('the test runner is configured', () => {
  expect(import.meta.env.MODE).toBe('test');
});
