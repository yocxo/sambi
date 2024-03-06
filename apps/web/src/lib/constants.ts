export const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : '';

export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL ?? VERCEL_URL ?? 'http://localhost:3000';

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const userColors = [
  '#C2F0C2',
  '#B1F1CB',
  '#ADF0D4',
  '#ADF0DD',
  '#B6ECF7',
  '#C2E6FF',
  '#D6E1FF',
  '#E0DFFE',
  '#E2DDFE',
  '#AFB5AD',
  '#ADB5B2',
  '#B5B2BC',
];

export function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = date.getUTCFullYear();
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();

  if (dateString.split('-').length > 2) {
    return `${month} ${day}, ${year}`;
  } else {
    return `${month} ${year}`;
  }
}

export function randomElement(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)] ?? '';
}