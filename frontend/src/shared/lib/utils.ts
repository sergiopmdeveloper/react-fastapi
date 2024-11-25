import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 *  Merges tailwind classes using twMerge and clsx
 *  @param {ClassValue[]} inputs - Array of tailwind classes to merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
