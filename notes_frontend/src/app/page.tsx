"use client";

import React, { useEffect, useState } from "react";
import NoteList from "@/components/NoteList";
import Sidebar from "@/components/Sidebar";
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
  type Note,
} from "@/lib/api";

/**
 * Static export compatibility:
 * This is a client component. All browser APIs are guarded inside lib/api.ts.
 * Removing dynamic='force-dynamic' allows Next.js static export to succeed.
 */

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyCreate, setBusyCreate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const data = await listNotes();
      setNotes(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Runs only in the browser after hydration
    refresh();
  }, []);

  async function handleCreate(title: string, content: string) {
    setBusyCreate(true);
    setError(null);
    try {
      await createNote({ title, content });
      await refresh();
    } catch (e) {
      console.error(e);
      setError("Failed to create note.");
    } finally {
      setBusyCreate(false);
    }
  }

  async function handleSave(id: string, title: string, content: string) {
    setError(null);
    try {
      await updateNote(id, { title, content });
      await refresh();
    } catch (e) {
      console.error(e);
      setError("Failed to update note.");
    }
  }

  async function handleDelete(id: string) {
    setError(null);
    try {
      await deleteNote(id);
      await refresh();
    } catch (e) {
      console.error(e);
      setError("Failed to delete note.");
    }
  }

  return (
    <>
      <section className="app-content">
        <div className="container-limited">
          <header className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-[color:var(--color-secondary-ink)]">
              Your Notes
            </h2>
            <p className="text-sm text-[color:var(--color-ink-muted)]">
              Create, edit, and manage your personal notes.
            </p>
          </header>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md border px-4 py-3 text-sm bg-white"
              style={{ borderColor: "var(--color-border)" }}
            >
              <strong className="font-medium">Error:</strong> {error}
            </div>
          )}

          {loading ? (
            <div className="w-full h-[50vh] flex items-center justify-center">
              <div
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden
              />
              <span className="ml-2 text-sm text-[color:var(--color-ink-muted)]">
                Loading notes...
              </span>
            </div>
          ) : (
            <NoteList
              notes={notes}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          )}
        </div>
      </section>

      <Sidebar onCreate={handleCreate} busy={busyCreate} />
    </>
  );
}
