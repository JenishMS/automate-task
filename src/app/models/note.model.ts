export class Note {
  noteId: number;
  title: string;
  note: string;
  updatedOn: Date;
}

export interface AppState {
  notes: Note[]
}
