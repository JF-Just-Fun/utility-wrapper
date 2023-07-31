export default class IDB {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null;

  constructor(dbName: string, storeName: string) {
      this.dbName = dbName;
      this.storeName = storeName;
      this.db = null;
  }

  open(): Promise<void> {
      return new Promise((resolve, reject) => {
          let request: IDBOpenDBRequest = window.indexedDB.open(this.dbName);

          request.onerror = (event) => {
              console.log('Error opening db', event);
              reject('Error');
          };

          request.onsuccess = (event) => {
              this.db = request.result;
              resolve();
          };

          request.onupgradeneeded = (event) => {
              this.db = request.result;
              let objectStore: IDBObjectStore = this.db!.createObjectStore(this.storeName, { autoIncrement: true });
          };
      });
  }

  addItem(item: any): Promise<string> {
      return new Promise((resolve, reject) => {
          let transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readwrite');
          let store: IDBObjectStore = transaction.objectStore(this.storeName);
          let request: IDBRequest<IDBValidKey> = store.add(item);

          request.onerror = () => {
              reject('Error');
          };

          request.onsuccess = () => {
              resolve('Item added to database.');
          };
      })
  }

  getItems(): Promise<any[]> {
      return new Promise((resolve, reject) => {
          let transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readwrite');
          let store: IDBObjectStore = transaction.objectStore(this.storeName);

          let request: IDBRequest<any[]> = store.getAll();

          request.onerror = () => {
              reject('Error getting items from database');
          };

          request.onsuccess = () => {
              resolve(request.result);
          };
      });
  }

  clearAll(): Promise<string> {
      return new Promise((resolve, reject) => {
          let transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readwrite');
          let store: IDBObjectStore = transaction.objectStore(this.storeName);

          let request: IDBRequest = store.clear();

          request.onerror = () => {
              reject('Error clearing all items');
          };

          request.onsuccess = () => {
              resolve('All items cleared successfully');
          };
      });
  }
}
