import substituteBytes from "../sub_bytes/substituteByte";

/**
 * RotWord: Circular left shift of a 4-byte word.
 * [a0, a1, a2, a3] -> [a1, a2, a3, a0]
 */
function rotWord(word: number[]): number[] {
  return [word[1], word[2], word[3], word[0]];
}

/**
 * SubWord: Applies AES S-Box to each byte of a 4-byte word.
 */
function subWord(word: number[]): number[] {
  return word.map((byte) => substituteBytes(byte)[1]);
}

/**
 * Round Constants (Rcon) for AES-128.
 * Rcon[i] contains the values [x^(i-1), 0x00, 0x00, 0x00] in GF(2^8).
 */
const RCON = [
  [0x00, 0x00, 0x00, 0x00], // Not used for index 0
  [0x01, 0x00, 0x00, 0x00],
  [0x02, 0x00, 0x00, 0x00],
  [0x04, 0x00, 0x00, 0x00],
  [0x08, 0x00, 0x00, 0x00],
  [0x10, 0x00, 0x00, 0x00],
  [0x20, 0x00, 0x00, 0x00],
  [0x40, 0x00, 0x00, 0x00],
  [0x80, 0x00, 0x00, 0x00],
  [0x1b, 0x00, 0x00, 0x00],
  [0x36, 0x00, 0x00, 0x00],
];

/**
 * Performs AES-128 Key Expansion.
 * @param key 16-byte array (128-bit key)
 * @returns Array of 44 words (each a 4-byte array)
 */
export function keyExpansion(key: number[]): number[][] {
  if (key.length !== 16) {
    throw new Error("Key must be 16 bytes (128 bits)");
  }

  const words: number[][] = [];

  // The first 4 words are the original key
  for (let i = 0; i < 4; i++) {
    words.push([key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]]);
  }

  // Generate the remaining 40 words
  for (let i = 4; i < 44; i++) {
    let temp = [...words[i - 1]];

    if (i % 4 === 0) {
      temp = subWord(rotWord(temp));
      const rcon = RCON[i / 4];
      temp = temp.map((byte, idx) => byte ^ rcon[idx]);
    }

    const prevWord = words[i - 4];
    const newWord = temp.map((byte, idx) => byte ^ prevWord[idx]);
    words.push(newWord);
  }

  return words;
}


// Generate a random 16 byte Hexadecimal value
export function generateHex16(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
