import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameboardComponent } from './gameboard/gameboard.component';
import { ScoresComponent } from './scores/scores.component';
import { StateComponent } from './state/state.component';
import { ZipComponent } from './zip/zip.component';
import { RecapComponent } from './recap/recap.component';

const routes: Routes = [
  { path: 'zip-component', component: ZipComponent },
  { path: 'state-component', component: StateComponent },
  { path: 'scores-component', component: ScoresComponent },
  { path: 'gameboard-component', component: GameboardComponent },
  { path: 'recap-component', component: RecapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
