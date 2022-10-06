import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './board/board.component';
import { ModelComponent } from './model/model.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, GameComponent, BoardComponent, ModelComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
