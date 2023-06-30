// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  BankAccount,
} from '.';
import _ from 'lodash';

const balance = 4999;
const minBalance = 0;
let acc: BankAccount;

beforeEach(() => {
  acc = getBankAccount(balance);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(acc).toEqual({ _balance: 4999 });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdraw = 5000;
    expect(() => acc.withdraw(withdraw)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const acc2 = getBankAccount(0);
    const withdraw = 5000;
    expect(() => acc.transfer(withdraw, acc2)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => acc.transfer(balance, acc)).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    const acc = getBankAccount(balance);
    const deposit = 1500;
    expect(acc.deposit(deposit)).toEqual(acc);
  });

  test('should withdraw money', () => {
    const withdraw = 500;
    expect(acc.withdraw(withdraw).getBalance()).toBeGreaterThanOrEqual(
      minBalance,
    );
  });

  test('should transfer money', () => {
    const balance2 = 999;
    const acc2 = getBankAccount(balance2);
    const transfer = 1500;
    expect(acc.transfer(transfer, acc2).getBalance()).toEqual(
      balance - transfer,
    );
    expect(acc2.getBalance()).toEqual(balance2 + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    _.random = jest
      .fn()
      .mockReturnValueOnce(_.random(0, 100, false))
      .mockReturnValueOnce(1);
    expect(typeof (await acc.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = _.random(0, 100, false);
    _.random = jest
      .fn()
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);
    await expect(acc.synchronizeBalance()).resolves.toEqual(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchedBalance = _.random(0, 100, false);
    _.random = jest
      .fn()
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(0);
    await expect(() => acc.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
