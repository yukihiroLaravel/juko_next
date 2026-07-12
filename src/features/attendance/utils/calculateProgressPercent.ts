export function calculateProgressPercent(
  completed: number,
  total: number,
): number {
  // 浮動小数点誤差を避けるため、除算より先に 100 を掛ける
  // （例: (29 / 100) * 100 = 28.999... となり floor で 28 になってしまう）
  return total > 0 ? Math.floor((completed * 100) / total) : 0;
}
