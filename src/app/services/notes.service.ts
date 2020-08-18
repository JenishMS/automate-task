import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notesList =[];
  public noteSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  constructor() { }

  /**
   * Fetch notes list from localstorage
   * return Note[]
   */
  fetchNotes() {
    let storedData = JSON.parse(window.localStorage.getItem('noteList'));
    // console.log('fetch', storedData);
    if(storedData.length > 0) {
      this.notesList = storedData;
      this.noteSubject.next(this.notesList);
    }else{
      window.localStorage.setItem('noteList', JSON.stringify([]));
    }

  }

  /**
   *
   * add note to localstorage
   * @param {Note} data
   * @memberof NotesService
   */

  addNote(){
    let note = {
      noteId: this.getNewNoteId(),
      title: 'New Note',
      note: '',
      updatedOn: new Date()
    };

    this.notesList.unshift(note);
    this.noteSubject.next(this.notesList);
    window.localStorage.setItem('noteList', JSON.stringify(this.notesList));
  }

  /**
   * delete note from localstorage
   *
   * @param {number} noteId
   * @memberof NotesService
   */
  deleteNote(noteId: number) {

  }

  /**
   * update note data to localstorage
   *
   * @param {number} noteId
   * @param {Note} data
   * @memberof NotesService
   */

  updateNote(noteId: number, noteData: Note) {

    this.notesList = this.notesList.map(data => {
      if(data.noteId == noteId)
        return noteData;
      else
        return data;
    });

    this.noteSubject.next(this.notesList);
    window.localStorage.setItem('noteList', JSON.stringify(this.notesList));
  }

  getNewNoteId(): number {
    if(this.notesList.length > 0) {
      console.log(this.notesList[this.notesList.length - 1]);
      return this.notesList[this.notesList.length - 1].noteId + 1;
    }else{
      return 0;
    }
  }
}
