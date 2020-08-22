import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';


export const notesList = createAction('[Note] getNoteList');
export const addNote = createAction('[Note] addNote');
export const updateNote = createAction('[Note] updateNote',
props<{noteId: number, note: Note}>()
);
export const deleteNote = createAction('[Note] deleteNote',
props<{noteId: number}>()
);
export const searchNote = createAction('[Note] searchNote',
props<{searchText: string}>()
);

// Effects called functions

export const loadNotesList = createAction('[Note] loadNoteList',
  props<{notes: Note[]}>()
);

export const addNoteState = createAction('[Note] addNote',
  props<Note>()
);

export const updateNoteState = createAction('[Note] updateNote',
  props<{noteId: number, note: Note}>()
);

export const deleteNoteState = createAction('[Note] deleteNote',
  props<{noteId: number}>()
);
