import { createHash } from "crypto";

/**
 * generate a salted sha256 string.
 * @param key
 * @param salt
 */
export const generateSha256Password = (key: string, salt?: string): string => {
  const secret: string = salt || "4ac1af3e9cfedb03cf34e3ccb464a8a93d1b2135";
  return createHash("sha256")
    .update(key + secret)
    .digest("hex");
};


export const generateSha256Hash = (key: string): string => {
  return createHash("sha256").update(key).digest("hex");
};

export function makeRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return [result, Math.floor(Math.random() * 1000000)].join("");
}
