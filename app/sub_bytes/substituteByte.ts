type Poly = number[];

function cleanPolynomial(p: Poly) {
  const res = [...p].sort((a, b) => b - a);
  const clean: Poly = [];

  for (const e of res) {
    if (clean.length > 0 && clean[clean.length - 1] === e) {
      clean.pop();
    } else {
      clean.push(e);
    }
  }
  return clean;
}

function polynomialMultiplication(a: Poly, b: Poly) {
  const terms: number[] = [];
  for (const e1 of a) {
    for (const e2 of b) {
      terms.push(e1 + e2);
    }
  }
  return cleanPolynomial(terms);
}

function polynomialDivision(a: Poly, b: Poly) {
  let remainder = [...a];
  const quotient = [];

  while (remainder.length > 0 && remainder[0] >= b[0]) {
    const diff = remainder[0] - b[0];
    const factor = [diff];
    quotient.push(diff);

    const shiftedDiv = polynomialMultiplication(b, factor);
    remainder = cleanPolynomial([...remainder, ...shiftedDiv]);
  }

  return [cleanPolynomial(quotient), cleanPolynomial(remainder)];
}

function polynomialInverse(a: Poly, mod: Poly) {
  let r0 = [...mod];
  let r1 = [...a];
  let s0: Poly = [];
  let s1 = [0];

  while (r1.length > 0) {
    const [q, r2] = polynomialDivision(r0, r1);
    r0 = r1;
    r1 = r2;

    const tempS = s0;
    s0 = s1;
    const qMulS1 = polynomialMultiplication(q, s1);
    s1 = cleanPolynomial([...tempS, ...qMulS1]);
  }

  return s0;
}

function byteToPolynomial(x: number) {
  const p: Poly = [];
  for (let i = 0; i < 8; ++i) {
    if (x & (1 << i)) {
      p.push(i);
    }
  }
  return p.sort((a, b) => b - a);
}

function polynomialToByte(p: Poly) {
  let x = 0;
  for (const e of p) {
    x |= 1 << e;
  }
  return x;
}

function affineTransform(x: number): number {
  let result = 0;
  const c = 0x63;

  for (let i = 0; i < 8; ++i) {
    const bit = ((x >> i) & 1) ^
      ((x >> ((i + 4) % 8)) & 1) ^
      ((x >> ((i + 5) % 8)) & 1) ^
      ((x >> ((i + 6) % 8)) & 1) ^
      ((x >> ((i + 7) % 8)) & 1) ^
      ((c >> i) & 1);

    result |= bit << i;
  }
  return result;
}

export default function substituteBytes(byte: number) {
  const mod: Poly = [8, 4, 3, 1, 0];
  const poly = byteToPolynomial(byte);
  const invPoly = polynomialInverse(poly, mod);
  const inv = polynomialToByte(invPoly);

  return affineTransform(inv);
}
