import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModuleModule } from './shared/material-module.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { MenusComponent } from './components/menus/menus.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NoteComponent } from './components/note/note.component';
import { SearchTextPipe } from './pipes/search-text.pipe';
import { noteReducer } from './state/reducers/note.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    MenusComponent,
    ToolbarComponent,
    NoteComponent,
    SearchTextPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    StoreModule.forRoot({notes: noteReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
