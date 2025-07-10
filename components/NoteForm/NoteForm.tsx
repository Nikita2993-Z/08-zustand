'use client';

import type { ChangeEvent, FormEvent } from 'react';
import type { NoteStore, Draft } from '@/lib/store/noteStore';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const draft = useNoteStore((state: NoteStore) => state.draft);
  const setDraft = useNoteStore((state: NoteStore) => state.setDraft);
  const clearDraft = useNoteStore((state: NoteStore) => state.clearDraft);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearDraft();
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ title: e.target.value })
          }
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDraft({ content: e.target.value })
          }
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setDraft({ tag: e.target.value as Draft['tag'] })
          }
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}