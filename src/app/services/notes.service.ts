import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

import { Note } from '../models/note.model';
import { NOTE_CONST } from '../constants/note.constants';

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
      title: NOTE_CONST.DEFAULT_NOTE_TITLE,
      note: NOTE_CONST.DEFAULT_NOTE,
      updatedOn: new Date()
    };
    notesList.push(note)
    window.localStorage.setItem(NOTE_CONST.STORAGE_KEY, JSON.stringify(notesList));
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
      const compareNoteId = noteId != data.noteId;
      if(noteId != data.noteId){
        return data;
      }
    });
    window.localStorage.setItem(NOTE_CONST.STORAGE_KEY, JSON.stringify(notesList));
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
      const compareNoteId = data.noteId == noteId;
      if(compareNoteId)
        return noteData;
      else
        return data;
    });
    window.localStorage.setItem(NOTE_CONST.STORAGE_KEY, JSON.stringify(notesList));
  }

  /**
   * get note id for new note
   *
   * @returns {number}
   * @memberof NotesService
   */
  getNewNoteId(): number {
    let notesList: Note[] = this.getNotes();
    const checkLength = notesList.length > 0;
    if(checkLength) {
      return notesList[notesList.length -1].noteId + 1;
    }else{
      return 1;
    }
  }

  /**
   * get notes from local storage
   *
   * @returns {Note[]}
   * @memberof NotesService
   */
  getNotes(): Note[] {
    let storedData = window.localStorage.getItem(NOTE_CONST.STORAGE_KEY);
    const checkIsNull = storedData !== null;
    if(checkIsNull){
      return JSON.parse(storedData);
    }else{
      window.localStorage.setItem(NOTE_CONST.STORAGE_KEY, JSON.stringify([]));
      return [];
    }
  }
}
