import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from 'src/app/models/note.model';
import { Store, select } from '@ngrx/store';
import { resetAction } from '../../state/actions/note.actions';

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
      this.store.dispatch(resetAction());
        if(text.trim().length > 0){
          this.noteList = this.noteList.filter(note => {
            if(note.title.toLowerCase().search(text.trim().toLowerCase()) != -1 || note.note.toLowerCase().search(text.trim().toLowerCase()) != -1){
              return note;
            }
          });
        }
    });

    this.noteServ.newNoteTriger.subscribe(status => {
      if(status === true){
        this.store.dispatch(resetAction());
        this.store.pipe(select(state => state)).subscribe(state => {
            this.selectedNote = this.noteList[this.noteList.length - 1];
            this.emitedNote.emit(this.selectedNote);
          });
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
