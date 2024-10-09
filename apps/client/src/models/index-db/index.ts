const dbName = "database";
const dbVersion = 2;

export type TDbKeyRecord = {
  id: string;
  key: ArrayBuffer;
  algorithm: string;
};

export function getIndexDb(defaultTable: string): Promise<{ db: IDBDatabase }> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
      if (!event.target || !(event.target as IDBOpenDBRequest).result) return;

      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(defaultTable)) {
        db.createObjectStore(defaultTable, { keyPath: "id" });
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
