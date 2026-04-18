export function gcd(a: bigint, b: bigint): bigint {
  let x = a;
  let y = b;
  while (y !== 0n) {
    x %= y;
    [x, y] = [y, x];
  }
  return x;
}

export function modInverse(e: bigint, phi: bigint): bigint {
  let a = e;
  let b = phi;
  let [m0, y, x] = [phi, 0n, 1n];

  if (phi === 1n) return 0n;

  while (a > 1n) {
    const q = a / b;
    let t = b;
    b = a % b;
    a = t;

    t = y;
    y = x - q * y;
    x = t;
  }

  if (x < 0n) x += m0;

  return x;
}

export function power(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  let b = base % mod;
  let e = exp;
  while (e > 0n) {
    if (e % 2n === 1n) res = (res * b) % mod;
    b = (b * b) % mod;
    e = e / 2n;
  }
  return res;
}

export function isPrime(n: bigint): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

export function generateKeys(p: bigint, q: bigint) {
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  let e = 65537n;
  if (gcd(e, phi) !== 1n) {
    e = 3n;
    while (gcd(e, phi) !== 1n) {
      e += 2n;
    }
  }

  const d = modInverse(e, phi);

  return { publicKey: e, privateKey: d, n };
}

export function hashMessage(message: string, n: bigint): bigint {
  let h = 0n;
  for (let i = 0; i < message.length; i++) {
    h = (h * 31n + BigInt(message.charCodeAt(i))) % n;
  }
  return h;
}

export function sign(message: string, privateKey: bigint, n: bigint) {
  const h = hashMessage(message, n);
  const s = power(h, privateKey, n);
  return { hash: h, signature: s };
}

export function verify(message: string, signature: bigint, publicKey: bigint, n: bigint) {
  const h = hashMessage(message, n);
  const decryptedHash = power(signature, publicKey, n);
  return { hash: h, decryptedHash, isValid: h === decryptedHash };
}

export function getRandomPrime(min: number, max: number): bigint {
  const primes: bigint[] = [];
  for (let i = min; i <= max; i++) {
    if (isPrime(BigInt(i))) {
      primes.push(BigInt(i));
    }
  }
  return primes[Math.floor(Math.random() * primes.length)];
}
