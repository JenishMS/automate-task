import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';

// For get notes list from localstorage
export const notesListAction = createAction('[Note] getNoteList');

// Add new note to localstorage
export const addAction = createAction('[Note] addNote');

// Update note to localstorage
export const updateAction = createAction('[Note] updateNote',
  props<{ noteId: number, note: Note }>()
);

// Delete note from localstorage
export const deleteAction = createAction('[Note] deleteNote',
  props<{ noteId: number }>()
);

// reset store data
export const resetAction = createAction('[Note] resetNotes');

// add notes list to store @Effect
export const loadNotesAction = createAction('[Note] loadNoteList',
  props<{ notes: Note[] }>()
);

// add note to store @Effect
export const addNoteAction = createAction('[Note] addNoteState',
  props<Note>()
);

// update note to store @Effect
export const updateNoteAction = createAction('[Note] updateNoteState',
  props<{ noteId: number, note: Note }>()
);

// delete note from store @Effect
export const deleteNoteAction = createAction('[Note] deleteNoteState',
  props<{ noteId: number }>()
);
