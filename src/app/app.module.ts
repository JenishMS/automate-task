import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModuleModule } from './shared/material-module.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { MenusComponent } from './components/menus/menus.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
