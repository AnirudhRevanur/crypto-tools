export function railFenceCipher(text: string, rails: number): string {
  if (rails <= 1) return text;

  // Explicitly declare the type of rail as an array of arrays of strings
  const rail: string[][] = Array.from({ length: rails }, () => []);
  let railIndex = 0;
  let direction = -1;

  for (const char of text) {
    rail[railIndex].push(char);

    if (railIndex === 0 || railIndex === rails - 1) direction *= -1;
    railIndex += direction;
  }

  return rail.flat().join("");
}

