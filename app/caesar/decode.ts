export default function decodeCaesarCipher(
  text: string,
  shift: number,
): string {
  const normalizedShift = ((-shift % 26) + 26) % 26;

  return text.split("").map((char) => {
    if (char >= "A" && char <= "Z") {
      const base = "A".charCodeAt(0);
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + normalizedShift) % 26) + base,
      );
    } else if (char >= "a" && char <= "z") {
      const base = "a".charCodeAt(0);
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + normalizedShift) % 26) + base,
      );
    } else {
      return char;
    }
  }).join("");
}
