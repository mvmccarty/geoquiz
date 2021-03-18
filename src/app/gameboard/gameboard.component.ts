import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() cities: object;

  citiesArrayCursor = 0;
  gameLog = [];
  playerScore = 0;

  constructor() { }

  correctAnswer(city) {

    this.gameLog.push(
      {
        'city' : city,
        'gameResult' : 'correct',
        'points' : 5
        // add timestamp here
      }
    );

    this.playerScore+=5
    ++this.citiesArrayCursor;
  }

  gameFault() {

  }


  ngOnInit(): void {


  }

}
