import { createReducer, on, ActionCreator } from '@ngrx/store';
import {
  loadNotesList,
  addNoteState,
  updateNoteState,
  deleteNoteState,
  searchNote
} from '../actions/note.actions';
import { Note } from '../../models/note.model';


export let initialState: Note[] = [];

  // on(notesList, state => state),
const _noteReducer = createReducer(initialState,
  on(loadNotesList, (notes, payload) => {
    notes = [...payload.notes];
    return notes;
  }),
  on(addNoteState, (notes, payload) => {
    return [...notes, payload];
  }),
  on(updateNoteState, (notes, payload) => {
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
  on(deleteNoteState, (notes, payload) => {
    let newNotes = [...notes];
    newNotes = newNotes.filter(note => {
      if(payload.noteId != note.noteId){
        return note;
      }
    });
    return newNotes;
  }),
  on(searchNote, (notes, payload) => {
    let filteredData = [...notes];
    filteredData = filteredData.filter(note => {
      if(note.title.toLowerCase().search(payload.searchText.toLowerCase()) != -1 || note.note.toLowerCase().search(payload.searchText.toLowerCase()) != -1){
        return note;
      }
    });

    return filteredData;
  })
);

export function noteReducer(state, action) {
  return _noteReducer(state, action);
}
