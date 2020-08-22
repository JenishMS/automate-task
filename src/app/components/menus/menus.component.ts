import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from 'src/app/models/note.model';
import { Store, select } from '@ngrx/store';
import { searchNote } from '../../state/actions/note.actions';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  noteList: Note[];
  selectedNote: Note;
  searchText: string;
  @Output() emitedNote = new EventEmitter();

  constructor(private noteServ: NotesService, private store: Store) { }

  ngOnInit(): void {
    this.selectedNote = new Note;

    this.noteServ.searchText.subscribe(text => {
      this.searchText =  text;

      if(text.length > 0){
        // this.noteList = this.noteServ.searchNotes(text);
        this.store.dispatch(searchNote({searchText: text}));
      }
    });

    this.store.pipe(select(state => state)).subscribe(state => {
      this.noteList = JSON.parse(JSON.stringify((state as any).notes));
    });

  }

  clickedNote(data: Note) {
    this.selectedNote = data;
    this.emitedNote.emit(data);
  }

}
