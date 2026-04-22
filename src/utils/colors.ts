function hashString(seed: string | number): number {
  const str = String(seed);
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function seededHue(seed: string | number): number {
  return hashString(seed) % 360;
}

export function seededGradient(seed: string | number): string {
  const h1 = seededHue(seed);
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 55%) 0%, hsl(${h2}, 60%, 75%) 100%)`;
}

export function seededBubbleColor(seed: string | number): string {
  const h = seededHue(seed);
  return `hsl(${h}, 55%, 60%)`;
}
