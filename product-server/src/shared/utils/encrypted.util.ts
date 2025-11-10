import crypto from "crypto";

/**
 * Mã hóa AES-256-CBC kèm timestamp
 * @param text Chuỗi cần mã hóa
 */
export function encryptAES(text: string): string {
  const payload = {
    text,
    timestamp: Date.now(),
  };

  const json = JSON.stringify(payload);

  const key = crypto
    .createHash("sha256")
    .update(process.env.SECRET_KEY!)
    .digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(json, "utf8", "base64");
  encrypted += cipher.final("base64");

  return iv.toString("base64") + ":" + encrypted;
}

/**
 * Giải mã AES-256-CBC, trả về text & timestamp
 * @param encryptedText Chuỗi mã hóa (dạng IV:encrypted)
 * @param maxAgeMs (optional) Thời gian sống tối đa (ms)
 */
export function decryptAES(
  encryptedText: string,
  maxAgeMs?: number
): { text: string; timestamp: number; expired: boolean } {
  const [ivBase64, encryptedData] = encryptedText.split(":");
  const iv = Buffer.from(ivBase64, "base64");

  const key = crypto
    .createHash("sha256")
    .update(process.env.SECRET_KEY!)
    .digest();

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");

  const payload = JSON.parse(decrypted);
  const now = Date.now();
  const expired = maxAgeMs ? now - payload.timestamp > maxAgeMs : false;

  return {
    text: payload.text,
    timestamp: payload.timestamp,
    expired,
  };
}
