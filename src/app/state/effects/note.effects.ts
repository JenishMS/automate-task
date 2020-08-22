import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { map } from 'rxjs/operators';
import { loadNotesAction, notesListAction, addAction, addNoteAction, updateNoteAction, updateAction, deleteAction, deleteNoteAction } from '../actions/note.actions';

@Injectable()
export class NoteEffect {

  constructor(private actions$: Actions, private noteServ: NotesService) {}

  loadNotes$ = createEffect(() => this.actions$.pipe(
    ofType(notesListAction),
    map((action) => {
      const notes: Note[] = this.noteServ.getNotes();

      return loadNotesAction({notes: notes});
    })
  ));

  addNote$ = createEffect(() => this.actions$.pipe(
    ofType(addAction),
    map((action) => {
      const note: Note = this.noteServ.addNote();
      return addNoteAction(note);
    }),
  ));

  updateNote$ = createEffect(() => this.actions$.pipe(
    ofType(updateAction),
    map((action) => {
      this.noteServ.updateNote(action.noteId, action.note);
      return updateNoteAction({noteId: action.noteId, note: action.note});
    })
  ));

  deleteNote$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAction),
    map((action) => {
      this.noteServ.deleteNote(action.noteId);
      return deleteNoteAction({noteId: action.noteId});
    })
  ));
}
