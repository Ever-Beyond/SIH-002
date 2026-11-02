import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge tailwind classes', () => {
    expect(cn('p-4', 'm-4')).toBe('p-4 m-4');
  });

  it('should handle conditional classes', () => {
    expect(cn('p-4', 'text-red-500', '')).toBe('p-4 text-red-500');
  });

  it('should handle tailwind class conflicts correctly', () => {
    expect(cn('p-4 bg-red-500', 'bg-blue-500')).toBe('p-4 bg-blue-500');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['p-4', 'bg-red-500'], 'text-white')).toBe('p-4 bg-red-500 text-white');
  });
});
