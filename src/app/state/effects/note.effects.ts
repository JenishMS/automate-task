import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { Observable,of, EMPTY, pipe } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { loadNotesList, notesList, addNote, addNoteState, updateNoteState, updateNote } from '../actions/note.actions';

@Injectable()
export class NoteEffect {

  constructor(private actions$: Actions, private noteServ: NotesService) {}

  loadNotes$ = createEffect(() => this.actions$.pipe(
    ofType(notesList),
    map((action) => {
      const notes: Note[] = this.noteServ.getNotes();

      return loadNotesList({notes: notes});
    })
  ));

  addNote$ = createEffect(() => this.actions$.pipe(
    ofType(addNote),
    mergeMap(_ => this.noteServ.addNote()
      .map(note => addNoteState(note))
    )
  ));

  updateNote$ = createEffect(() => this.actions$.pipe(
    ofType(updateNote),
    map((action) => {
      this.noteServ.updateNote(action.noteId, action.note);
      console.log("Here");
      return updateNoteState({noteId: action.noteId, note: action.note});
    })
  ));
}
