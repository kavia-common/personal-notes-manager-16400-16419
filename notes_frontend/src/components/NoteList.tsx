"use client";

import React from "react";
import type { Note } from "@/lib/api";
import NoteItem from "./NoteItem";

type Props = {
  notes: Note[];
  onSave: (id: string, title: string, content: string) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

export default function NoteList({ notes, onSave, onDelete }: Props) {
  if (notes.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
        <div
          className="w-12 h-12 rounded-md mb-4"
          style={{ backgroundColor: "var(--color-accent)" }}
          aria-hidden
        />
        <h2 className="text-lg font-semibold text-[color:var(--color-secondary-ink)]">
          No notes yet
        </h2>
        <p className="text-sm text-[color:var(--color-ink-muted)] mt-1">
          Create your first note from the sidebar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-5">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onSave={onSave} onDelete={onDelete} />
      ))}
    </div>
  );
}
