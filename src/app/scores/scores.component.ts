import { Component, OnInit } from '@angular/core';
import { MavenService } from '../maven.service';

import { Game } from '../game';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  games: Game[] = [];

  scores;

  getGameSessions(): Observable<Game[]> {
    return this.mavenService.getGames();
  }

  constructor(private mavenService: MavenService) { }

  ngOnInit(): void {
    this.getGameSessions().subscribe(data => {
      this.scores = data['scores'].sort((a, b) => (a.score < b.score) ? 1 : -1);
    });
  }

}
