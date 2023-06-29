// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    return await expect(resolveValue(1)).resolves.toBe(1);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    return expect(() => throwError('Error occured')).toThrow('Error occured');
  });

  test('should throw error with default message if message is not provided', () => {
    return expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    return expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return await expect(rejectCustomError()).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
