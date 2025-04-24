import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format time spent in a human-readable way
 * Converts days to a combination of years, months, and days
 */
export const formatTimeSpent = (days: number): string => {
  if (days === 0) return '0 days';
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;

  const years = Math.floor(days / 365);
  const remainingDaysAfterYears = days % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const remainingDays = remainingDaysAfterYears % 30;

  let result = '';

  if (years > 0) {
    result += `${years} ${years === 1 ? 'year' : 'years'}`;
    if (months > 0 || remainingDays > 0) result += ', ';
  }

  if (months > 0) {
    result += `${months} ${months === 1 ? 'month' : 'months'}`;
    if (remainingDays > 0) result += ', ';
  }

  if (remainingDays > 0 || (years === 0 && months === 0)) {
    result += `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
  }

  return result;
}; 