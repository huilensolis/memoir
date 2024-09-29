const dbName = "database";
const dbVersion = 1;

export type TDbKeyRecord = {
  id: string;
  key: ArrayBuffer;
  algorithm: string;
};

export function getIndexDb(): Promise<{ db: IDBDatabase }> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
      if (!event.target || !(event.target as IDBOpenDBRequest).result) return;

      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("keys")) {
        const objectStore = db.createObjectStore("keys", { keyPath: "id" });
        objectStore.createIndex("name", "name", { unique: false });
      }
    };

    request.onerror = (e) => {
      console.error(
        `Database error: ${(e.target as IDBOpenDBRequest).error?.message}`,
      );
      reject((e.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;

      resolve({ db });
    };
  });
}
