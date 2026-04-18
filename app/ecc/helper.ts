export type Point = {
  x: number,
  y: number,
}

function modInverse(a: number, m: number): number | null {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m === 1) return 0;

  a = ((a % m) + m) % m;

  while (a > 1) {
    const q = Math.floor(a / m);
    const temp_m = a % m;  // remainder
    a = m;                  // swap
    m = temp_m;
    const temp_x = x0;
    x0 = x1 - q * x0;
    x1 = temp_x;
  }

  if (a !== 1) return null

  return (x1 + m0) % m0;
}

export function addPoints(P: Point, Q: Point, A: number, M: number): Point | null {

  if (P === null) return Q;
  if (Q === null) return P;

  if (P.x === Q.x && P.y !== Q.y) return null;

  let slope: number;

  if (P.x === Q.x && P.y === Q.y) {
    slope = (3 * P.x * P.x + A) * modInverse(2 * P.y, M)!;
  }

  else {
    slope = (Q.y - P.y) * modInverse(Q.x - P.x, M)!;
  }

  slope = ((slope % M) + M) % M;

  const rx = ((slope * slope - P.x - Q.x) % M + M) % M;
  const ry = ((slope * (P.x - rx) - P.y) % M + M) % M;

  return { x: rx, y: ry }
}

function scalarMultiply(k: number, P: Point, A: number, M: number): Point | null {
  let result: Point | null = null;
  let current: Point = P;

  while (k > 0) {
    if (k & 1) {
      result = result === null ? current : addPoints(result, current, A, M)!;
    }
    current = addPoints(current, current, A, M)!;
    k >>= 1;
  }

  return result;
}

export function isOnCurve(P: Point, A: number, B: number, M: number): boolean {
  const lhs = (P.y * P.y) % M;
  const rhs = ((P.x * P.x * P.x + A * P.x + B) % M + M) % M;

  return lhs === rhs;
}
