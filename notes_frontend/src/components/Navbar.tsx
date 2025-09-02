"use client";

import React from "react";

type Props = {
  title?: string;
};

export default function Navbar({ title = "Notes Manager" }: Props) {
  return (
    <nav
      className="w-full px-6 py-4 flex items-center justify-between shadow-sm"
      style={{ backgroundColor: "var(--color-primary)", color: "white" }}
    >
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="w-7 h-7 rounded-sm"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
        <h1 className="text-lg md:text-xl font-semibold tracking-tight">
          {title}
        </h1>
      </div>
      <span className="text-xs md:text-sm opacity-90">
        Modern, light UI • Local mock API
      </span>
    </nav>
  );
}
