export default function formatNumberString(
  numStr: string,
  locale?: string,
  options?: Intl.NumberFormatOptions
): string {
  const number = parseFloat(numStr);
  if (isNaN(number)) {
    return numStr;
  }

  return number.toLocaleString(locale, options);
}
