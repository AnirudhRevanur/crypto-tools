const mapping = Object.fromEntries(
  Array.from(
    { length: 26 }, (_, i) =>
    [
      String.fromCharCode(65 + i),
      `0x${i.toString(16).padStart(2, '0')}`
    ]
  )
)

export default function alphabetToHex(inputText: string): string[] {
  return inputText
    .toUpperCase()
    .split("")
    .map(char => mapping[char] ?? char)

}
