import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { Observable,of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { loadNotesList, notesList, loadNotesListFailed } from '../actions/note.actions';

@Injectable()
export class NoteEffect {

  constructor(private actions$: Actions, private noteServ: NotesService) {}

  // @Effect()
  // loadNotes$ = this.actions$.pipe(
  //   ofType(notesList),mergeMap(actions => {
  //     return this.noteServ.getNotes().pipe(map((notes: Note[]) => {
  //       loadNotesList({notes: notes});
  //     }), catchError(err => of(loadNotesListFailed)))
  //   })
  // );

  loadEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(notesList),
      map(() => this.noteServ.getNotes().pipe(map((notes) => loadNotesList(notes))))
    )
  );

}
