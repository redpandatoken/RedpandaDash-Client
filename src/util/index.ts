export const DOLLAR = '$';

export function format(value: string): string {
  return new Intl.NumberFormat('en-us', { minimumFractionDigits: 2 }).format(
    Number.parseFloat(value)
  );
}

export function formatPrice(value: string): string {
  return parseFloat(value).toFixed(14);
}

export function formatLastUpdateAt(value: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(value);
}
