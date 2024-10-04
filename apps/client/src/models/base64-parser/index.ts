export class Base64Parser {
  public static from_arraybuffer_to_base64(arraybuffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(arraybuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary); // Convert binary string to Base64
  }

  public static from_base64_to_arraybuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }
}
