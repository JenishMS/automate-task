import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/note.model';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { deleteNote, notesList } from '../../state/actions/note.actions';

const SMALL_WIDTH_BRAEKPOINT = 720;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  note: Note;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BRAEKPOINT}px)`);
  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private noteServ: NotesService, private router: Router, zone: NgZone,private store: Store) {
    this.mediaMatcher.addListener(mql => {
      if(mql.matches) {
        this.drawer.close();
      }else if(this.drawer.opened === false){
        this.drawer.open();
      }
    });

    this.store.dispatch(notesList());

    this.store.pipe(select(state => state)).subscribe(state => {
      console.log(state);
    });
  }

  ngOnInit(): void {
    this.noteServ.fetchNotes();

    this.router.events.subscribe( () => {
      if(this.isScreenSmall()) {
        this.drawer.close();
      }
    });

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

      //Redux Code
      this.store.dispatch(deleteNote({noteId: this.note.noteId}));
    }
  }

  isScreenSmall():boolean {
    return this.mediaMatcher.matches;
  }
}
