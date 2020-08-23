import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import {
    loadNotesAction,
    notesListAction,
    addAction,
    addNoteAction,
    updateNoteAction,
    updateAction,
    deleteAction,
    deleteNoteAction
  } from '../actions/note.actions';

@Injectable()
export class NoteEffect {

  constructor(private actions$: Actions, private noteService: NotesService) {}

  /**
   * Fetch note data from localstorage
   * dispatch to update note data to store
   * @memberof NoteEffect
   */
  loadNotes$ = createEffect(() => this.actions$.pipe(
    ofType(notesListAction),
    map(() => {
      const notes: Note[] = this.noteService.getNotes();

      return loadNotesAction({notes: notes});
    })
  ));

  /**
   * Add note to localstorage
   * dispatch add note to store
   * @memberof NoteEffect
   */
  addNote$ = createEffect(() => this.actions$.pipe(
    ofType(addAction),
    map(() => {
      const note: Note = this.noteService.addNote();
      return addNoteAction(note);
    }),
  ));

  /**
   * Update note data to localstorage
   * dispatch upate note from store
   *
   * @memberof NoteEffect
   */
  updateNote$ = createEffect(() => this.actions$.pipe(
    ofType(updateAction),
    map((action) => {
      this.noteService.updateNote(action.noteId, action.note);
      return updateNoteAction({noteId: action.noteId, note: action.note});
    })
  ));

  /**
   * Delete note from localstorage
   * dispatch delete note from store
   *
   * @memberof NoteEffect
   */
  deleteNote$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAction),
    map((action) => {
      this.noteService.deleteNote(action.noteId);
      return deleteNoteAction({noteId: action.noteId});
    })
  ));
}
