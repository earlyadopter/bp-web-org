import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  charCount?: number;
  maxChars?: number;
}

export function Textarea({
  label,
  error,
  id,
  charCount,
  maxChars,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {maxChars !== undefined && charCount !== undefined && (
          <span
            className={`text-xs ${
              charCount > maxChars ? "text-brand-error" : "text-gray-400"
            }`}
          >
            {charCount}/{maxChars}
          </span>
        )}
      </div>
      <textarea
        id={id}
        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-brand-accent"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-brand-error">{error}</p>}
    </div>
  );
}
