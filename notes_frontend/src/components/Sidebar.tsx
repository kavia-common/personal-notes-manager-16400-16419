"use client";

import React, { useState } from "react";
import Button from "./Button";

type Props = {
  onCreate: (title: string, content: string) => Promise<void> | void;
  busy?: boolean;
};

export default function Sidebar({ onCreate, busy = false }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const canSubmit = title.trim().length > 0 || content.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    await onCreate(title, content);
    setTitle("");
    setContent("");
  }

  return (
    <aside
      className="w-full md:w-[340px] xl:w-[380px] shrink-0 border-l p-4 md:p-6 flex flex-col gap-4"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
      aria-label="Create a new note"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[color:var(--color-secondary-ink)]">
          New Note
        </h2>
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "var(--color-accent)" }}
          aria-hidden
        />
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-[color:var(--color-ink-muted)]">
          Title
          <input
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            style={{ borderColor: "var(--color-border)" }}
            placeholder="E.g., Grocery list"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
        </label>

        <label className="text-sm font-medium text-[color:var(--color-ink-muted)]">
          Content
          <textarea
            className="mt-1 min-h-[140px] w-full rounded-md border px-3 py-2 text-sm bg-white"
            style={{ borderColor: "var(--color-border)" }}
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <div className="flex items-center gap-2 pt-1">
          <Button
            type="submit"
            disabled={!canSubmit || busy}
            aria-disabled={!canSubmit || busy}
          >
            {busy ? "Creating..." : "Create Note"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setTitle("");
              setContent("");
            }}
            disabled={busy}
          >
            Reset
          </Button>
        </div>

        <p className="text-xs text-[color:var(--color-ink-muted)]">
          Notes are saved locally for this demo.
        </p>
      </form>
    </aside>
  );
}
