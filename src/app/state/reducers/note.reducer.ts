import { createReducer, on, ActionCreator } from '@ngrx/store';
import {
  loadNotesAction,
  addNoteAction,
  updateNoteAction,
  deleteNoteAction,
  resetAction
} from '../actions/note.actions';
import { Note } from '../../models/note.model';


export let initialState: Note[] = [];

  // on(notesList, state => state),
const _noteReducer = createReducer(initialState,
  on(loadNotesAction, (notes, payload) => {
    notes = [...payload.notes];
    return notes;
  }),
  on(addNoteAction, (notes, payload) => {
    return [...notes, payload];
  }),
  on(updateNoteAction, (notes, payload) => {
      let newNOTE = [...notes];
      newNOTE = newNOTE.map(note => {
        if(payload.noteId == note.noteId){
          return payload.note;
        }else{
          return note;
        }
      });
      return newNOTE;
  }),
  on(deleteNoteAction, (notes, payload) => {
    let newNotes = [...notes];
    newNotes = newNotes.filter(note => {
      if(payload.noteId != note.noteId){
        return note;
      }
    });
    return newNotes;
  }),
  on(resetAction, (notes, payload) => {
    return [...notes];
  })
);

export function noteReducer(state, action) {
  return _noteReducer(state, action);
}
