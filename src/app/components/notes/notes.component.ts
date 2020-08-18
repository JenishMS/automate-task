import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  note: Note;

  constructor(private noteServ: NotesService) { }

  ngOnInit(): void {
    this.noteServ.fetchNotes();
  }

  /**
   *For get selected note from menus component
   *
   * @param {*} event
   * @memberof NotesComponent
   */

  selectedNote(event) {
    this.note = event;
  }

  /**
   * For delete selected note
   * If not select any note no action
   * @param {*} event
   * @memberof NotesComponent
   */

  deleteNote(event) {
    if(this.note) {
      this.noteServ.deleteNote(this.note.noteId);
    }
  }
}
