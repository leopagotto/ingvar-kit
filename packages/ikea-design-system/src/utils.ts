import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatClassName(className: string): string {
  return className.trim().replace(/\s+/g, ' ');
}

export function createVariants<T extends Record<string, string>>(
  base: string,
  variants: T
): T & { base: string } {
  return {
    base,
    ...variants
  };
}
