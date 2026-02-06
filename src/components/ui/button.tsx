import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-accent text-white hover:bg-brand-accent-hover focus:ring-brand-accent",
    secondary:
      "bg-white text-brand-charcoal border border-gray-300 hover:bg-gray-50 focus:ring-brand-accent",
    outline:
      "bg-transparent text-white border border-white/40 hover:bg-white/10 focus:ring-white",
    danger:
      "bg-brand-error text-white hover:bg-red-700 focus:ring-red-500",
    ghost:
      "text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 focus:ring-brand-accent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
