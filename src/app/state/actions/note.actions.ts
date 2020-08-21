import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';

export const loadNotesList = createAction('[Note] loadNoteList',
  props<{notes: Note[]}>()
);
export const loadNotesListFailed = createAction('[Note] loadNotesListFailed');
export const notesList = createAction('[Note] getNoteList');
export const addNote = createAction('[Note] addNote',
  props<Note>()
);
export const updateNote = createAction('[Note] updateNote',
  props<{noteId: number, note: Note}>()
);
export const deleteNote = createAction('[Note] deleteNote',
  props<{noteId: number}>()
);
export const searchNote = createAction('[Note] searchNote',
  props<{searchText: string}>()
);
export const getNoteId = createAction('[Note] getNoteId');
