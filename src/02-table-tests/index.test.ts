// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 4, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 8, b: 4, action: 'Add', expected: null },
  { a: '6', b: '3', action: Action.Exponentiate, expected: null },
  // continue cases for other actions
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(
    (typeof a || typeof b) !== 'number'
      ? 'should return null for invalid arguments'
      : !Object.values(Action).includes(action as any)
      ? 'should return null for invalid action'
      : `should ${Object.entries(Action)
          .find((el) => el[1] === action)![0]
          .toLowerCase()} two numbers`,
    () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
// Consider to use Jest table tests API to test all cases above
