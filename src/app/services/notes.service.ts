import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notesList =[];
  public noteSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  /**
   * Fetch notes list from localstorage
   * return Note[]
   */
  fetchNotes() {
    let storedData = JSON.parse(window.localStorage.getItem('noteList'));

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
      note: 'No additional text',
      updatedOn: new Date()
    };
    this.notesList.push(note);

    this.updateNoteList();
  }

  /**
   * delete note from localstorage
   *
   * @param {number} noteId
   * @memberof NotesService
   */
  deleteNote(noteId: number) {
    this.notesList = this.notesList.filter(data => {
      if(noteId != data.noteId){
        return data;
      }
    });

    this.updateNoteList();
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

    this.updateNoteList();
  }

  /**
   * get note id for new note
   *
   * @returns {number}
   * @memberof NotesService
   */
  getNewNoteId(): number {
    if(this.notesList.length > 0) {
      return parseInt(this.notesList[this.notesList.length - 1].noteId) + 1;
    }else{
      return 1;
    }
  }

  /**
   * search note from note list
   *
   * @param {string} searchText
   * @memberof NotesService
   */
  searchNotes(searchText: string): Note[] {
    let filteredData = this.notesList.filter(note => {
      if(note.title.toLowerCase().trim().search(searchText.trim().toLowerCase()) != -1 || note.note.toLowerCase().search(searchText.trim().toLowerCase()) != -1){
        return note;
      }
    });

    return filteredData;
  }

  /**
   *For update noteList and update to localstorage
   *
   * @memberof NotesService
   */
  updateNoteList() {
    this.noteSubject.next(this.notesList);
    window.localStorage.setItem('noteList', JSON.stringify(this.notesList));
  }

  //Effects Code

  getNotes(): Observable<Note[]> {
    let storedData = window.localStorage.getItem('noteList');
    if(storedData !== null){
      return of(JSON.parse(storedData));
    }else{
      window.localStorage.setItem('noteList', JSON.stringify([]));
      return of([]);
    }
  }
}
