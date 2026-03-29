import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge class names without conflicts', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toContain('px-4');
    expect(result).not.toContain('px-2');
  });

  it('should handle tailwind class merging', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toContain('bg-blue-500');
    expect(result).not.toContain('bg-red-500');
  });

  it('should accept conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toContain('base');
    expect(result).toContain('active');
  });

  it('should ignore falsy values', () => {
    const result = cn('base', false && 'false-class', undefined, 'end');
    expect(result).toContain('base');
    expect(result).toContain('end');
    expect(result).not.toContain('false-class');
  });

  it('should handle array of classes', () => {
    const result = cn(['base', 'extra']);
    expect(result).toContain('base');
    expect(result).toContain('extra');
  });
});
