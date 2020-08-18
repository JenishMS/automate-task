import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  noteList: Note[];
  selectedNote: Note;
  @Output() emitedNote = new EventEmitter();

  constructor(private noteServ: NotesService) { }

  ngOnInit(): void {
    this.selectedNote = new Note;

    this.noteServ.noteSubject.subscribe(data => {
      this.noteList = data;
    }, err => {
      console.log(err);
    });
  }

  clickedNote(data: Note) {
    this.selectedNote = data;
    this.emitedNote.emit(data);
  }

}
