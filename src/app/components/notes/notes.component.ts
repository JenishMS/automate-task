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

  selectedNote(event) {
    this.note = event;
  }

}
