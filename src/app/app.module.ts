import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NoteEffect } from './state/effects/note.effects';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModuleModule } from './shared/material-module.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { MenusComponent } from './components/menus/menus.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NoteComponent } from './components/note/note.component';
import { SearchTextPipe } from './pipes/search-text.pipe';
import { noteReducer } from './state/reducers/note.reducer';
import { EffectsModule } from '@ngrx/effects';

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
    StoreModule.forRoot({notes: noteReducer}),
    EffectsModule.forRoot([NoteEffect]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
