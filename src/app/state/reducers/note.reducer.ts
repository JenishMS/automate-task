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

  // on(notesList, state => state),
const _noteReducer = createReducer(initialState,
  on(addNote, (notes, payload) => {
    return [...notes, payload];
  }),
  on(updateNote, (notes, payload) => {
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
  on(deleteNote, (notes, payload) => {
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
  }),
  on(getNoteId, notes => {
    console.log(notes);
    // const notesArr = notes.length;

    return notes;
})
);

export function noteReducer(state, action) {
  return _noteReducer(state, action);
}
