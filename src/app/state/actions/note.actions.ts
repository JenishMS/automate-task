import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';

export const notesList = createAction('[Note] getNoteList');
export const addNote = createAction('[Note] addNote',
  props<Note>()
);
export const updateNote = createAction('[Note] updateNote',
  props<{noteId: number, note: Note}>()
);
export const deleteNote = createAction('[Note] deleteNote',
  props<Number>()
);
export const searchNote = createAction('[Note] searchNote',
  props<String>()
);
export const getNoteId = createAction('[Note] getNoteId');
