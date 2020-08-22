import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  /**
   *
   * add note to localstorage
   * @param {Note} data
   * @memberof NotesService
   */

  addNote(): Note{
    let notesList = this.getNotes();
    let note = {
      noteId: this.getNewNoteId(),
      title: 'New Note',
      note: 'No additional text',
      updatedOn: new Date()
    };
    notesList.push(note)
    window.localStorage.setItem('noteList', JSON.stringify(notesList));
    return note;
  }

  /**
   * delete note from localstorage
   *
   * @param {number} noteId
   * @memberof NotesService
   */
  deleteNote(noteId: number) {
    let notesList: Note[] = this.getNotes();
    notesList = notesList.filter(data => {
      if(noteId != data.noteId){
        return data;
      }
    });
    window.localStorage.setItem('noteList', JSON.stringify(notesList));
  }

  /**
   * update note data to localstorage
   *
   * @param {number} noteId
   * @param {Note} data
   * @memberof NotesService
   */

  updateNote(noteId: number, noteData: Note) {
    let notesList: Note[] = this.getNotes();
    notesList = notesList.map(data => {
      if(data.noteId == noteId)
        return noteData;
      else
        return data;
    });
    window.localStorage.setItem('noteList', JSON.stringify(notesList));
  }

  /**
   * get note id for new note
   *
   * @returns {number}
   * @memberof NotesService
   */
  getNewNoteId(): number {
    let notesList: Note[] = this.getNotes();
    if(notesList.length > 0) {
      return notesList[notesList.length -1].noteId + 1;
    }else{
      return 1;
    }
  }

  //Effects Code

  getNotes(): Note[] {
    let storedData = window.localStorage.getItem('noteList');
    if(storedData !== null){
      return JSON.parse(storedData);
    }else{
      window.localStorage.setItem('noteList', JSON.stringify([]));
      return [];
    }
  }
}
