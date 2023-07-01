// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const listToCompare = {
  value: 1,
  next: {
    value: null,
    next: null,
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const generatedList = generateLinkedList([1]);
    expect(generatedList).toStrictEqual(listToCompare);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const generatedList = generateLinkedList([1, 2]);
    expect(generatedList).toMatchSnapshot();
  });
});
