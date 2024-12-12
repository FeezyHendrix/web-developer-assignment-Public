export function generatePaginationItems(
  current: number,
  total: number
): (number | string)[] {
  const items: (number | string)[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Always show first page
  items.push(1);

  if (current > 3) {
    items.push('...');
  }

  // Calculate start and end of the middle section
  let start = Math.max(2, current - 1);
  let end = Math.min(total - 1, current + 1);

  // Adjust if current is near the beginning
  if (current <= 3) {
    end = 4;
  }

  // Adjust if current is near the end
  if (current >= total - 2) {
    start = total - 3;
  }

  // Add middle section
  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (current < total - 2) {
    items.push('...');
  }

  // Always show last page
  items.push(total);

  return items;
}
