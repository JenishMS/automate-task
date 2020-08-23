import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { updateAction } from '../../state/actions/note.actions';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() selectedNote: Note;
  @ViewChild('title') title: HTMLTextAreaElement;

  constructor(private noteServ: NotesService, private store: Store) { }

  ngOnInit(): void {
    this.selectedNote = new Note();
  }

  /**
   * get the entering title and update to store and local storage
   *
   * @memberof NoteComponent
   */
  changeNote() {
    this.selectedNote.updatedOn = new Date();
    this.store.dispatch(updateAction({noteId: this.selectedNote.noteId, note: {...this.selectedNote}}));
  }

}
