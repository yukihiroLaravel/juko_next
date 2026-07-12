export function calculateProgressPercent(
  completed: number,
  total: number,
): number {
  return total > 0 ? Math.floor((completed / total) * 100) : 0;
}
