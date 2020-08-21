import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Store, select } from '@ngrx/store';
import { addNote, notesList, deleteNote } from '../../state/actions/note.actions'
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter();
  @Output() deleteNote = new EventEmitter();
  searchText: string = '';
  newId = 1;
  constructor(private noteServ: NotesService, private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(state => state)).subscribe(data => {
      let length = data['notes'].length;
      if(length > 0){
        this.newId = data['notes'][length - 1].noteId + 1;
      }
    });
  }

  /**
   * create new note
   *
   * @memberof ToolbarComponent
   */
  createNote() {
    this.noteServ.addNote();

    this.store.dispatch(addNote({
      noteId: this.newId,
      title: 'New Note',
      note: 'No additional text',
      updatedOn: new Date()
    }));
  }

  /**
   * get search text while typing
   *
   * @memberof ToolbarComponent
   */
  searchNote() {
    if(this.searchText == '')
      this.clearText();
    else
      this.noteServ.searchText.next(this.searchText);
  }

  clearText() {
    this.searchText = '';
    this.noteServ.searchText.next('');
    this.noteServ.updateNoteList();
  }

}
