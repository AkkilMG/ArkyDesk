
import CryptoJS from "crypto-js";

function getSecretKey(): string {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
  }
  return secretKey;
}


/** Derivable */
export async function encrypt(text: string): Promise<string> {
  const derivedKey = CryptoJS.SHA256(getSecretKey()).toString();
  const encrypted = CryptoJS.AES.encrypt(text, derivedKey).toString();
  return encrypted.replace(/\//g, '_');
}

export async function decrypt(ciphertext: string): Promise<string> {
  const derivedKey = CryptoJS.SHA256(getSecretKey()).toString();
  const sanitizedCiphertext = ciphertext.replace(/_/g, '/');
  const bytes = CryptoJS.AES.decrypt(sanitizedCiphertext, derivedKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/** Non derivable */
export async function encryptCode(code: string): Promise<string> {
  return CryptoJS.SHA256(code+getSecretKey()).toString();
}

export async function decryptCode(value: string, code: string): Promise<boolean> {
    return CryptoJS.SHA256(value+getSecretKey()).toString() === code;
}
