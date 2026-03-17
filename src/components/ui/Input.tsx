import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const baseInputClass =
  'w-full border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300 disabled:opacity-50 disabled:bg-neutral-50';

export function Input({ label, error, className, id, ...rest }: InputProps): React.JSX.Element {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-caption text-neutral-500 block mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(baseInputClass, error && 'border-red-400', className)}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className, id, ...rest }: TextareaProps): React.JSX.Element {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-caption text-neutral-500 block mb-2">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(baseInputClass, 'resize-none', error && 'border-red-400', className)}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
