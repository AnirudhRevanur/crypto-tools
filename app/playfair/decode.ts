export default function decodePlayfairCipher(
  allChars: string[],
  ciphertext: string
) {
  const size = 6;

  const positionMap: Record<string, [number, number]> = {};
  allChars.forEach((ch, i) => {
    positionMap[ch] = [Math.floor(i / size), i % size];
  });

  const result: string[] = [];
  for (let i = 0; i < ciphertext.length; i += 2) {
    const first = ciphertext[i];
    const second = ciphertext[i + 1];

    const [row1, col1] = positionMap[first];
    const [row2, col2] = positionMap[second];

    if (row1 === row2) {
      result.push(allChars[row1 * size + ((col1 + size - 1) % size)]);
      result.push(allChars[row2 * size + ((col2 + size - 1) % size)]);
    }
    else if (col1 === col2) {
      result.push(allChars[((row1 + size - 1) % size) * size + col1]);
      result.push(allChars[((row2 + size - 1) % size) * size + col2]);
    }
    else {
      result.push(allChars[row1 * size + col2]);
      result.push(allChars[row2 * size + col1]);
    }
  }

  return result.join("");
}
