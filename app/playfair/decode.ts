export default function decodePlayfairCipher(grid: string[][], ciphertext: string) {
  let result = "";
  const flatGrid = grid.flat()
  for (let i = 0; i < ciphertext.length; i = i + 2) {
    let [row1, columm1] = [Math.floor(flatGrid.indexOf(ciphertext[i]) / 6), flatGrid.indexOf(ciphertext[i]) % 6]
    let [row2, columm2] = [Math.floor(flatGrid.indexOf(ciphertext[i + 1]) / 6), flatGrid.indexOf(ciphertext[i + 1]) % 6]
    console.log(`Encoding the values ${grid[row1][columm1]}`)
    if (row1 === row2) {
      result += grid[row1][(columm1 - 1) % 6]
      result += grid[row2][(columm2 - 1) % 6]
    }

    else if (columm1 === columm2) {
      result += grid[(row1 - 1) % 6][columm1]
      result += grid[(row2 - 1) % 6][columm2]
    }

    else {
      result += grid[row1][columm2]
      result += grid[row2][columm1]
    }
  }

  return result
}
