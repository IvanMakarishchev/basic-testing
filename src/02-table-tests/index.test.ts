// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 4, action: Action.Subtract, expected: 1 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 4, action: Action.Exponentiate, expected: 4096 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 8, b: 4, action: 'Add', expected: null },
  { a: 10, b: 2, action: 'Add', expected: null },
  { a: 6, b: 3, action: 'Add', expected: null },
  { a: '8', b: '4', action: Action.Exponentiate, expected: null },
  { a: '10', b: '2', action: Action.Exponentiate, expected: null },
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
