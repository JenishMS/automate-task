import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter();
  @Output() deleteNote = new EventEmitter();
  searchText: string = '';

  constructor(private noteServ: NotesService) { }

  ngOnInit(): void {
  }

  /**
   * create new note
   *
   * @memberof ToolbarComponent
   */
  createNote() {
    this.noteServ.addNote();
  }

  /**
   * get search text while typing
   *
   * @memberof ToolbarComponent
   */
  searchNote() {
    this.noteServ.searchText.next(this.searchText);
  }

  clearText() {
    this.searchText = '';
    this.noteServ.searchText.next('');
    this.noteServ.updateNoteList();
  }

}
