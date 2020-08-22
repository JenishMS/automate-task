import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { Store } from '@ngrx/store';
import { updateNote } from '../../state/actions/note.actions';

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

  changeNote() {
    this.selectedNote.updatedOn = new Date();
    // this.noteServ.updateNote(this.selectedNote.noteId, this.selectedNote);

    //Redux
    this.store.dispatch(updateNote({noteId: this.selectedNote.noteId, note: {...this.selectedNote}}));
  }

}
