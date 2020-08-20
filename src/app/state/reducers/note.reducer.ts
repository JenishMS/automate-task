import { createReducer, on, ActionCreator } from '@ngrx/store';
import {
  notesList,
  addNote,
  updateNote,
  deleteNote,
  searchNote,
  getNoteId
} from '../actions/note.actions';
import { Note } from '../../models/note.model';


export const initialState: Note[] = [];

const _noteReducer = createReducer(initialState,
  on(notesList, state => state),
  on(addNote, (notes, payload) => {
    return [...notes, payload];
  }),
  on(updateNote, (notes, payload) => {
      const newNOTE = [...notes];

      return newNOTE
  }),
  on(deleteNote, (notes, payload) => ({

  })),
  on(searchNote, (notes, payload) => ({

  })),
  on(getNoteId, notes => {
    console.log(notes);
    // const notesArr = notes.length;

    return notes;
})
);

export function noteReducer(state, action) {
  return _noteReducer(state, action);
}
