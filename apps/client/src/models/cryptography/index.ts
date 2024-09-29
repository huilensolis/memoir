import { getIndexDb, type TDbKeyRecord } from "../index-db";

export class CryptographyCustomApi {
  keyName: string;

  constructor() {
    this.keyName = "cryptography_key";
  }

  private async storeKey(
    name: string,
    key: CryptoKey,
    algorithm: string,
  ): Promise<undefined> {
    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (resolve, reject) => {
      try {
        const { db } = await getIndexDb();

        const transaction = db.transaction(["keys"], "readwrite");
        const store = transaction.objectStore("keys");

        const keyData = await window.crypto.subtle.exportKey("raw", key);

        const keyRecord: TDbKeyRecord = { id: name, key: keyData, algorithm };
        store.add(keyRecord);

        transaction.oncomplete = (_e) => {
          resolve(undefined);
        };

        transaction.onerror = (e) => {
          console.error(
            "Transaction failed:",
            (e.target as IDBTransaction).error,
          );

          reject(new Error(`Transaction failed`));
        };
      } catch (error) {
        reject(new Error("error"));
      }
    });
  }

  private async getKey(name: string) {
    const { db } = await getIndexDb();
    const transaction = db.transaction(["keys"], "readonly");
    const store = transaction.objectStore("keys");

    return await new Promise<{ key: CryptoKey }>((resolve, reject) => {
      const request = store.get(name);

      request.onsuccess = async (event) => {
        const result: TDbKeyRecord | undefined = (event.target as any).result;

        if (!result) {
          console.error("No key found with that name.");
          reject(new Error("no key could be retrieved with name: " + name));
          return;
        }

        const importedKey = await window.crypto.subtle.importKey(
          "raw",
          result.key,
          { name: result.algorithm },
          true,
          ["encrypt", "decrypt"],
        );

        resolve({ key: importedKey });
      };

      request.onerror = (event) => {
        console.error(
          "Error retrieving key:",
          (event.target as IDBRequest).error,
        );
        reject((event.target as IDBRequest).error);
      };
    });
  }

  private async generateKey() {
    return await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true, // extractable
      ["encrypt", "decrypt"],
    );
  }

  public async createNewKey(): Promise<void> {
    try {
      const key = await this.generateKey();

      await this.storeKey("test", key, key.algorithm.name);

      await Promise.resolve();
    } catch (error) {
      await Promise.reject(new Error("error generating and storing key"));
    }
  }

  public async decrypt(iv: Uint8Array, encryptedData: ArrayBuffer) {
    try {
      const { key } = await this.getKey(this.keyName);

      const decryptedDataEncoded = await window.crypto.subtle.decrypt(
        { name: key.algorithm.name, iv },
        key,
        encryptedData,
      );

      const decryptedDataDecoded = new TextDecoder().decode(
        decryptedDataEncoded,
      );

      return await Promise.resolve(decryptedDataDecoded);
    } catch (error) {
      return await Promise.reject(new Error("there has been an error"));
    }
  }

  public async encrypt(data: string) {
    try {
      const { key } = await this.getKey(this.keyName);

      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
      const encodedData = new TextEncoder().encode(data);

      const encryptedData = await window.crypto.subtle.encrypt(
        { name: key.algorithm.name, iv },
        key,
        encodedData,
      );

      return await Promise.resolve({ iv, encryptedData });
    } catch (error) {
      return await Promise.reject(new Error("there has been an error"));
    }
  }
}
