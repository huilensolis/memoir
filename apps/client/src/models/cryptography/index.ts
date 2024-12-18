import { Base64Parser } from "../base64-parser";
import { getIndexDb, type TDbKeyRecord } from "../index-db";

// TODO: refactor this code because could be improved a lot!

export class CryptographyCustomApi {
  dbObjectName: string;
  keyIdInDb: string;

  constructor() {
    this.dbObjectName = "cryptography_key";
    this.keyIdInDb = "key_id";
  }

  private async storeKey(
    id: string,
    key: CryptoKey,
    algorithm: string,
  ): Promise<undefined> {
    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (resolve, reject) => {
      try {
        const { db } = await getIndexDb(this.dbObjectName);

        const request = db
          .transaction([this.dbObjectName], "readwrite")
          .objectStore(this.dbObjectName)
          .get(id);

        request.onsuccess = async (event) => {
          const keyData = await window.crypto.subtle.exportKey("raw", key);
          const keyRecord: TDbKeyRecord = { id, key: keyData, algorithm };

          const dbRecord = (event.target as any).result as
            | TDbKeyRecord
            | undefined;

          // record with the same id is already in db - perform put
          if (dbRecord) {
            const newRequest = db
              .transaction([this.dbObjectName], "readwrite")
              .objectStore(this.dbObjectName)
              .put(keyRecord);

            newRequest.onsuccess = () => {
              console.log("success performing put to index db key");

              resolve(undefined);
            };

            newRequest.onerror = () => {
              console.log("error performing put to index db key");
              reject(new Error("error performing put to index db key"));
            };
          } else {
            const newRequest = db
              .transaction([this.dbObjectName], "readwrite")
              .objectStore(this.dbObjectName)
              .add(keyRecord);

            newRequest.onsuccess = () => {
              console.log("success performing add to index db key");

              resolve(undefined);
            };

            newRequest.onerror = () => {
              console.log("error performing add to index db key");
              reject(new Error("error performing add to index db key"));
            };
          }
        };

        // key with the same id doesnt exist
        request.onerror = async () => {
          console.log("error creating objectStore");
          reject(new Error("error creating objectStore"));
        };
      } catch (error) {
        console.log({ error });
        reject(new Error("error"));
      }
    });
  }

  public async removeKey(id: string) {
    const { db } = await getIndexDb(this.dbObjectName);
    const transaction = db.transaction([this.dbObjectName], "readwrite");
    const store = transaction.objectStore(this.dbObjectName);

    return await new Promise<{ success: boolean }>((resolve, reject) => {
      const request = store.delete(id); // undefined if successful

      request.onsuccess = async (event) => {
        const result: TDbKeyRecord | undefined = (event.target as any).result;

        if (!result) {
          resolve({ success: true });
          return;
        }

        reject("could not remove key");
      };

      request.onerror = (event) => {
        console.error(
          "Error removing key: ",
          (event.target as IDBRequest).error,
        );
        reject((event.target as IDBRequest).error);
      };
    });
  }

  private async getRawKey(id: string) {
    const { db } = await getIndexDb(this.dbObjectName);
    const transaction = db.transaction([this.dbObjectName], "readonly");
    const store = transaction.objectStore(this.dbObjectName);

    return await new Promise<{ key: CryptoKey }>((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = async (event) => {
        const result: TDbKeyRecord | undefined = (event.target as any).result;

        if (!result) {
          console.error("No key found with that id.", id);
          reject(new Error("no key could be retrieved with id: " + id));
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

  public async doesClientHaveAStroredKey(): Promise<boolean> {
    try {
      await this.getRawKey(this.keyIdInDb);

      return true;
    } catch (error) {
      return false;
    }
  }

  public async getBase64Key() {
    try {
      const { key } = await this.getRawKey(this.keyIdInDb);

      const keyData = await window.crypto.subtle.exportKey("raw", key);

      const base64key = Base64Parser.from_arraybuffer_to_base64(keyData);

      return await Promise.resolve({ base64key });
    } catch (error) {
      console.log({ error });
      return await Promise.reject(new Error("there has been an error"));
    }
  }

  public async importBase64Key(base64key: string) {
    try {
      const arrayBufferKey = Base64Parser.from_base64_to_arraybuffer(base64key);

      const keyData = await window.crypto.subtle.importKey(
        "raw",
        arrayBufferKey,
        {
          name: "AES-GCM",
          length: 256,
        },
        false,
        ["encrypt", "decrypt"],
      );

      await this.storeKey(this.keyIdInDb, keyData, keyData.algorithm.name);
    } catch (error) {
      return await Promise.reject(new Error("there has been an error"));
    }
  }

  private async generateKey() {
    return await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );
  }

  public async createNewKey(): Promise<void> {
    try {
      const key = await this.generateKey();

      await this.storeKey(this.keyIdInDb, key, key.algorithm.name);

      await Promise.resolve();
    } catch (error) {
      await Promise.reject(new Error("error generating and storing key"));
    }
  }

  public async decrypt({
    iv,
    encryptedData,
  }: {
    iv: ArrayBuffer;
    encryptedData: ArrayBuffer;
  }) {
    try {
      const { key } = await this.getRawKey(this.keyIdInDb);

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
      const { key } = await this.getRawKey(this.keyIdInDb);

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
