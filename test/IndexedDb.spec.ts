/**
 * @jest-environment jsdom
 */

import IDB from '../src/IDB';
import FDBFactory from "fake-indexeddb/lib/FDBFactory";
global.indexedDB = new FDBFactory(); // node中模拟indexedDB执行环境

describe('IndexedDB', () => {
    let indexedDB: IDB;

    beforeAll(async () => {
        indexedDB = new IDB('TestDB', 'TestStore');
        await indexedDB.open();
    });

    afterEach(async () => {
        await indexedDB.clearAll();
    });

    test('should add item to the database', async () => {
        const item = { name: 'Test' };
        const response = await indexedDB.addItem(item);
        expect(response).toBe('Item added to database.');
    });

    test('should get all items from the database', async () => {
        const item1 = { name: 'Test1' };
        const item2 = { name: 'Test2' };

        await indexedDB.addItem(item1);
        await indexedDB.addItem(item2);

        const items = await indexedDB.getItems();

        expect(items).toEqual([item1, item2]);
    });

    test('should clear all items from the database', async () => {
        const item = { name: 'Test' };
        await indexedDB.addItem(item);
        const response = await indexedDB.clearAll();
        expect(response).toBe('All items cleared successfully');

        const items = await indexedDB.getItems();
        expect(items.length).toBe(0);
    });
});
