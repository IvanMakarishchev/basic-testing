// Uncomment the code below and write your tests
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(jest.fn(), 100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();
    doStuffByTimeout(mockFn, 100);
    expect(mockFn).toBeCalledTimes(0);
    jest.runAllTimers();
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockFn = jest.fn();
    doStuffByInterval(mockFn, 100);
    jest.advanceTimersByTime(1000);
    jest.clearAllTimers();
    expect(setInterval).toBeCalled();
    expect(mockFn).toBeCalledTimes(10);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervalTiming = 100;
    const timeoutTiming = 1000;
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'setTimeout');
    const mockFn = jest.fn();
    doStuffByInterval(() => setTimeout(mockFn, timeoutTiming), intervalTiming);
    // check if setinterval was called and settimeout and mockFn wasn't called
    expect(setInterval).toBeCalled();
    expect(setTimeout).not.toBeCalled();
    expect(mockFn).not.toBeCalled();
    //move forward to timeoutTiming
    jest.advanceTimersByTime(timeoutTiming);
    //check if we called setTimeout the right number of times
    expect(setTimeout).toBeCalledTimes(timeoutTiming / intervalTiming);
    //check if mockFn was called
    jest.runOnlyPendingTimers();
    expect(mockFn).toBeCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const file = 'test.txt';
    const spy = jest.spyOn(fs, 'existsSync');
    await readFileAsynchronously(join(__dirname, file));
    expect(spy).toReturnWith(false);
  });

  test('should return null if file does not exist', async () => {
    const file = 'test.txt';
    const res = await readFileAsynchronously(join(__dirname, file));
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const file = 'test.txt';
    const content = 'Lorem ipsum dolor';
    const spyExists = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const spyReadFile = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(content));
    const res = await readFileAsynchronously(join(__dirname, file));
    expect(spyExists).toBeTruthy();
    expect(spyReadFile).toBeCalled();
    expect(res).toBe(content);
  });
});
