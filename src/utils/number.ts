export function stringToFloat(input: string): number | null {
    const normalized = input.replace(",", ".");
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? null : parsed;
  }