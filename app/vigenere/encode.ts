export default function encodeVigenereCipher(
  text: string,
  keyword: string,
): string {
  const normalizedKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
  const normalizedText = text.toUpperCase();

  let keywordIndex = 0;

  return normalizedText.split("").map((char) => {
    if (char >= "A" && char <= "Z") {
      const base = "A".charCodeAt(0);
      const shift =
        normalizedKeyword[keywordIndex % normalizedKeyword.length].charCodeAt(
          0,
        ) - base;

      const newCharCode = ((char.charCodeAt(0) - base + shift) % 26) + base;
      keywordIndex++;

      return String.fromCharCode(newCharCode);
    } else {
      return char;
    }
  }).join("");
}
