import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  try {
    return formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    });
  } catch (error) {
    return 'Invalid date';
  }
};

export const truncateHash = (hash: string): string => {
  if (!hash) return '';
  if (hash.length <= 12) return hash;

  const start = hash.slice(0, 6);
  const end = hash.slice(-4);
  return `${start}...${end}`;
};
