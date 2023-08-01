/**
 * @jest-environment jsdom
 */

import StorageManager from '../src/StorageManager';

describe('StorageManager', () => {
  let SM: StorageManager;

  beforeEach(() => {
    localStorage.clear();
    SM = new StorageManager();
  });

  test('LocalStorageManager should initialize with provided data', () => {
    const initialData = {
      'key-init-1': 'myValue1',
      'key-init-2': 'myValue2'
    };
    const initSM = new StorageManager(initialData);
    expect(initSM.get('key-init-1')).toBe('myValue1');
    expect(initSM.get('key-init-2')).toBe('myValue2');
  });


  test('set() should store data into localStorage', () => {
    SM.set('key-set', 'myValue');
    expect(localStorage.getItem('key-set')).toBeDefined();
    expect(SM.get('key-set')).toBeDefined();
  });

  test('get() should retrieve data from localStorage', () => {
    SM.set('key-get-1', 'myValue')
    expect(SM.get('key-get-1')).toBe('myValue');

    SM.set('key-get-2', ['myValue1', 'myValue2'])
    expect(SM.get('key-get-2')).toEqual(['myValue1', 'myValue2']);

    SM.set('key-get-3', { key1: 'myValue1', key2: 'myValue2' })
    expect(SM.get('key-get-3')).toEqual({ key1: 'myValue1', key2: 'myValue2' });
  });

  test('get() should return null if data is expired', () => {
    SM.set('key-get-expired', 'my-value', { expire: -1000 })
    expect(SM.get('key-get-expired')).toBeNull();
  });

  test('remove() should remove data from localStorage', () => {
    SM.set('key-remove', 'myValue');
    SM.remove('key-remove');
    expect(localStorage.getItem('key-remove')).toBeNull();
  });

  test('clear() should clear all data from localStorage', () => {
    SM.set('key-clear-1', 'myValue1');
    SM.set('key-clear-2', 'myValue2');
    SM.clear();
    expect(localStorage.getItem('key-clear-1')).toBeNull();
    expect(localStorage.getItem('key-clear-2')).toBeNull();
  });

  test('all() should retrieve all data from localStorage', () => {
    SM.set('key-all-1', 'myValue1');
    SM.set('key-all-2', 'myValue2');
    const allData = SM.all();
    expect(allData).toEqual({
      'key-all-1': 'myValue1',
      'key-all-2': 'myValue2'
    });
  });

  test('has() should check if a key exists in localStorage', () => {
    SM.set('key-has', 'myValue');
    expect(SM.has('key-has')).toBe(true);
    expect(SM.has('nonExistentKey')).toBe(false);
  });

  test('getSize() should get the total size of localStorage', () => {
    SM.set('key-size', 'myValue');
    const expectedStr = `[YIN%${JSON.stringify({ value: 'myValue' })}%PO]`
    const expectedSize = expectedStr.length * 2 / 1024; // size in KB
    expect(SM.getSize()).toBe(expectedSize);
  });

  test('getRemainingSize() should get the remaining size of localStorage', () => {
    const initialSize = SM.getSize();
    SM.set('key-remaining-size', 'myValue');
    const expectedStr = `[YIN%${JSON.stringify({ value: 'myValue' })}%PO]`
    const sizeIncrease = expectedStr.length * 2 / 1024; // size in KB
    expect(SM.getRemainingSize()).toBe(StorageManager.storageSizeLimit - initialSize - sizeIncrease); // size in KB
  });

  test('encrypt() and decrypt() should correctly encrypt and decrypt data', () => {
    const secretKey = 'secret-key';
    const originData = {
      'key-secret1': 'myValue',
      'key-secret2': 'myValue',
    }

    SM = new StorageManager(originData, secretKey);

    expect(localStorage.getItem('key-secret1')).not.toBe(JSON.stringify({ value: 'myValue', encryption: true }))
    expect(localStorage.getItem('key-secret2')).not.toBe(JSON.stringify({ value: 'myValue', encryption: true }))

    SM.clear()

    SM.set('key-secret3', 'myValue', { encryption: true })
    expect(localStorage.getItem('key-secret3')).not.toBe(JSON.stringify({ value: 'myValue', encryption: true }))
    SM.clear()
  });
});
