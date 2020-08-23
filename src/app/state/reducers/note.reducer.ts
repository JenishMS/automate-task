import { createReducer, on } from '@ngrx/store';

import {
  loadNotesAction,
  addNoteAction,
  updateNoteAction,
  deleteNoteAction,
  resetAction
} from '../actions/note.actions';
import { Note } from '../../models/note.model';


export let initialState: Note[] = [];

/**
 * create note reducer
 */
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
        // Check payload noteId and store noteId
        const isValidNoteId = payload.noteId == note.noteId;
        if(isValidNoteId){
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
      // check noteId equal or not
      const isNotValidNoteId = payload.noteId != note.noteId;
      if(isNotValidNoteId){
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
