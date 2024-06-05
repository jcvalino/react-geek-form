import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export * from './forms';
export const cn = (...args: ClassValue[]) => twMerge(clsx(args));
