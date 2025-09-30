function xtime(a: number): number {
  return ((a << 1) & 0xff) ^ ((a & 0x80) ? 0x1b : 0);
}

function multiplicationGaloisField(a: number, b: number): number {
  let res = 0;
  while (b > 0) {
    if (b & 1) {
      res ^= a;
    }
    a = xtime(a);
    b >>= 1;
  }
  return res;
}

function mixColumn(col: number[]): number[] {
  const [a0, a1, a2, a3] = col;

  return [
    multiplicationGaloisField(a0, 2) ^ multiplicationGaloisField(a1, 3) ^ multiplicationGaloisField(a2, 1) ^ multiplicationGaloisField(a3, 1),
    multiplicationGaloisField(a0, 1) ^ multiplicationGaloisField(a1, 2) ^ multiplicationGaloisField(a2, 3) ^ multiplicationGaloisField(a3, 1),
    multiplicationGaloisField(a0, 1) ^ multiplicationGaloisField(a1, 1) ^ multiplicationGaloisField(a2, 2) ^ multiplicationGaloisField(a3, 3),
    multiplicationGaloisField(a0, 3) ^ multiplicationGaloisField(a1, 1) ^ multiplicationGaloisField(a2, 1) ^ multiplicationGaloisField(a3, 2),
  ]
}

export default function mixColumns(state: number[][]): number[][] {
  console.log("Called")

  const newState: number[][] = [];

  for (let c = 0; c < 4; c++) {
    const col = [state[0][c], state[1][c], state[2][c], state[3][c]];
    const mixed = mixColumn(col);

    for (let r = 0; r < 4; r++) {
      if (!newState[r]) newState[r] = [];
      newState[r][c] = mixed[r];
    }
  }

  return newState;
}
