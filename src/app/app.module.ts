import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZipComponent } from './zip/zip.component';
import { StateComponent } from './state/state.component';
import { ScoresComponent } from './scores/scores.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { RecapComponent } from './recap/recap.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipComponent,
    StateComponent,
    ScoresComponent,
    GameboardComponent,
    RecapComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
