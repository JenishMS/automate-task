import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Store } from '@ngrx/store';
import { addAction, resetAction} from '../../state/actions/note.actions';

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
  }

  /**
   * create new note
   *
   * @memberof ToolbarComponent
   */
  createNote() {
    this.store.dispatch(addAction());
    this.searchText = '';
    this.noteServ.searchText.next('');
  }

  /**
   * get search text while typing
   *
   * @memberof ToolbarComponent
   */
  searchNote() {
    if(this.searchText.trim() == ''){
      this.noteServ.searchText.next('');
      this.store.dispatch(resetAction());
      this.clearText();
    }
    else{
      this.noteServ.searchText.next(this.searchText);
    }
  }

  clearText() {
    this.searchText = '';
    this.store.dispatch(resetAction());
  }

}
