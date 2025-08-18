export default function encodePlayfairCipher(grid: string[][], plaintext: string) {
  let cleanedPlaintext = ""
  let result = ""

  for (let i = 0; i < plaintext.length; i++) {
    let first = plaintext[i];
    let second = plaintext[i + 1];

    if (first === second) {
      cleanedPlaintext += first + 'X'
    } else {
      cleanedPlaintext += first + (second || "")
      i++;
    }
  }

  if (cleanedPlaintext.length % 2 !== 0) {
    cleanedPlaintext += 'X'
  }

  const flatGrid = grid.flat()
  for (let i = 0; i < cleanedPlaintext.length; i = i + 2) {
    let [row1, columm1] = [Math.floor(flatGrid.indexOf(cleanedPlaintext[i]) / 6), flatGrid.indexOf(cleanedPlaintext[i]) % 6]
    let [row2, columm2] = [Math.floor(flatGrid.indexOf(cleanedPlaintext[i + 1]) / 6), flatGrid.indexOf(cleanedPlaintext[i + 1]) % 6]
    console.log(`Encoding the values ${grid[row1][columm1]}`)
    if (row1 === row2) {
      result += grid[row1][(columm1 + 1) % 6]
      result += grid[row2][(columm2 + 1) % 6]
    }

    else if (columm1 === columm2) {
      result += grid[(row1 + 1) % 6][columm1]
      result += grid[(row2 + 1) % 6][columm2]
    }

    else {
      result += grid[row1][columm2]
      result += grid[row2][columm1]
    }

  }

  return result
}
