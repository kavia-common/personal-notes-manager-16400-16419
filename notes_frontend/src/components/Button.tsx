"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants: Record<string, string> = {
    primary:
      "text-white focus:ring-[var(--color-accent)]",
    secondary:
      "bg-[color:var(--color-muted)] text-[color:var(--color-ink-muted)] hover:bg-[color:var(--color-muted-strong)] focus:ring-[var(--color-accent)]",
    ghost:
      "bg-transparent text-[color:var(--color-primary)] hover:bg-black/5 focus:ring-[var(--color-accent)]",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-[var(--color-accent)]",
  };
  const bg =
    variant === "primary"
      ? "bg-[color:var(--color-primary)] hover:bg-[#135ba7]"
      : variant === "danger"
      ? ""
      : "";

  return (
    <button
      className={`${base} ${variants[variant]} ${bg} ${className}`}
      {...props}
    />
  );
}
