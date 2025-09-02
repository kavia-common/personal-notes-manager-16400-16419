import React from "react";

export default function NotFound() {
  return (
    <main className="app-content">
      <section
        className="rounded-md border p-6 bg-white"
        style={{ borderColor: "var(--color-border)" }}
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-2xl font-semibold text-[color:var(--color-secondary-ink)]">
          404 – Page Not Found
        </h1>
        <p className="text-sm text-[color:var(--color-ink-muted)] mt-2">
          The page you’re looking for doesn’t exist.
        </p>
      </section>
    </main>
  );
}
