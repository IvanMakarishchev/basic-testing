// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

let spy: jest.SpyInstance;

describe('partial mocking', () => {
  beforeEach(() => {
    spy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(spy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(spy).toHaveBeenCalledWith('I am not mocked');
  });
});
