type StorageDataType = { [key: string]: any };
type ItemType = {
  value: any,
  encryption?: boolean,
  expire?: number
}

export default class StorageManager {
  private secretKey: string; // used for encryption and decryption

  static storageSizeLimit: number = 4000 * 1024; // localStorage limit is approximately 4MB
  static dataPrefix: string = '[YIN%'; // prefix of StorageManager data structure
  static dataSuffix: string = '%PO]'; // suffix of StorageManager data structure

  constructor (initialData: StorageDataType = {}, secretKey?: string) {
    this.secretKey = secretKey || 'yinpo-secret-key';

    for (const key in initialData) {
      if (initialData.hasOwnProperty(key)) {
        this.set(key, initialData[key], { encryption: !!secretKey });
      }
    }
  }

  // set data into localStorage
  set(key: string, value: any, option?: { expire?: number, encryption?: boolean }): void {
    const item: ItemType = {
      value: option?.encryption ? this.encrypt(value) :  value,
      encryption: option?.encryption ?? undefined,
      expire: option?.expire ? new Date().getTime() + option.expire : undefined
    }

    localStorage.setItem(key, `${StorageManager.dataPrefix}${JSON.stringify(item)}${StorageManager.dataSuffix}`);
  }

  // get data from localStorage
  get(key: string): any | null {
    let itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    if (!itemStr.startsWith(StorageManager.dataPrefix) || !itemStr.endsWith(StorageManager.dataSuffix)) {
      return itemStr
    }
    itemStr = itemStr.slice(5, -4)
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (item.expire && item.expire < now) {
      this.remove(key);
      return null;
    }
    return item.encryption ? this.decrypt(item.value) : item.value;
  }

  // remove data from localStorage
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // clear all data from localStorage
  clear(): void {
    localStorage.clear();
  }

  // display all data from localStorage
  all(): StorageDataType {
    let entries: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = this.get(key);
        entries[key] = value;
      }
    }

    return entries;
  }

  // check if a key exists in localStorage
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  // get the total size of localStorage
  getSize(): number {
    let totalSize = 0;
    for (let key in localStorage) {
      if (this.has(key)) {
        totalSize += localStorage.getItem(key)!.length * 2 / 1024; // size in KB
      }
    }
    return totalSize;
  }

  // get the remaining size of localStorage
  getRemainingSize(): number {
    const totalSize = this.getSize();
    return StorageManager.storageSizeLimit - totalSize;
  }

  // Encryption before storing sensitive data
  private encrypt(value: any): string {
    const vStr = JSON.stringify(value)
    // Simple XOR cipher for demonstration purposes
    return vStr.split('').map((c: string) => String.fromCharCode(this.secretKey.charCodeAt(0) ^ c.charCodeAt(0))).join('');
  }
  // Decryption while retrieving sensitive data
  private decrypt(value: string): any {
    // Simple XOR cipher for demonstration purposes
    const vStr = value.split('').map(c => String.fromCharCode(this.secretKey.charCodeAt(0) ^ c.charCodeAt(0))).join('');
    return JSON.parse(vStr)
  }
}
