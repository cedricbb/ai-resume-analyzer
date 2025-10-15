/**
 * Convert a byte count into a human‑readable string using KB, MB, or GB.
 * - Uses base 1024 for conversions.
 * - Always returns one of: KB, MB, GB (no bytes unit as per requirement).
 * - Values are formatted with up to 2 decimals, trimming unnecessary zeros.
 */
export function formatSize(bytes: number): string {
  const n = Number(bytes);
  if (!isFinite(n) || n <= 0) return "0 KB";

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  let value: number;
  let unit: "KB" | "MB" | "GB";

  if (n < MB) {
    value = n / KB;
    unit = "KB";
  } else if (n < GB) {
    value = n / MB;
    unit = "MB";
  } else {
    value = n / GB;
    unit = "GB";
  }

  const formatted = formatNumber(value);
  return `${formatted} ${unit}`;
}

function formatNumber(value: number): string {
  // Use 0 decimals for very large numbers, 1 for >=10, else 2 decimals
  const str = value >= 100 ? value.toFixed(0) : value >= 10 ? value.toFixed(1) : value.toFixed(2);
  return trimTrailingZeros(str);
}

function trimTrailingZeros(v: string): string {
  return v.replace(/\.0+$|(?<=\..*?)0+$/g, "").replace(/\.$/, "");
}

export default formatSize;
