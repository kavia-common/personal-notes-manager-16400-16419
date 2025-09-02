"use client";

import React, { useState } from "react";
import Button from "./Button";
import type { Note } from "@/lib/api";

type Props = {
  note: Note;
  onSave: (id: string, title: string, content: string) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

export default function NoteItem({ note, onSave, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [busy, setBusy] = useState(false);

  const updatedAt = new Date(note.updatedAt).toLocaleString();

  async function handleSave() {
    setBusy(true);
    try {
      await onSave(note.id, title, content);
      setEditing(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article
      className="rounded-lg border p-4 md:p-5 bg-white"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-3">
        {editing ? (
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
        ) : (
          <h3 className="text-lg font-semibold text-[color:var(--color-secondary-ink)] break-words">
            {note.title || "Untitled note"}
          </h3>
        )}
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <Button onClick={handleSave} disabled={busy}>
                {busy ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  setTitle(note.title);
                  setContent(note.content);
                }}
                disabled={busy}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => onDelete(note.id)}
                aria-label={`Delete note "${note.title || "Untitled"}"`}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-3">
        {editing ? (
          <textarea
            className="w-full min-h-[100px] rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "var(--color-border)" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="text-sm leading-6 text-[color:var(--color-ink)] whitespace-pre-wrap break-words">
            {note.content || "No content"}
          </p>
        )}
      </div>

      <footer className="mt-3 text-xs text-[color:var(--color-ink-muted)]">
        Updated: {updatedAt}
      </footer>
    </article>
  );
}
