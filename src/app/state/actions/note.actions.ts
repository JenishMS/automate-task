import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';


export const notesListAction = createAction('[Note] getNoteList');
export const addAction = createAction('[Note] addNote');
export const updateAction = createAction('[Note] updateNote',
props<{noteId: number, note: Note}>()
);
export const deleteAction = createAction('[Note] deleteNote',
props<{noteId: number}>()
);
export const resetAction = createAction('[Note] resetNotes');

// Effects called functions

export const loadNotesAction = createAction('[Note] loadNoteList',
  props<{notes: Note[]}>()
);

export const addNoteAction = createAction('[Note] addNoteState',
  props<Note>()
);

export const updateNoteAction = createAction('[Note] updateNoteState',
  props<{noteId: number, note: Note}>()
);

export const deleteNoteAction = createAction('[Note] deleteNoteState',
  props<{noteId: number}>()
);
