import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() cities: object;
  @Input() playerName: string;

  @Output() quizFinishEvent = new EventEmitter<object>();


  citiesArrayCursor = 0;
  gameLog = [];
  playerScore = 0;

  gameRecapInProgress = false;

  constructor() { }

  correctAnswer(city) {

    this.gameLog.push(
      {
        'city' : city,
        'result' : 'correct',
        'points' : 5
        // add seconds/time here
      }
    );

    this.playerScore+=5
    ++this.citiesArrayCursor;
  }

  gameFault(city) {

    this.gameLog.push(
      {
        'city' : city,
        'result' : 'fault',
        'points' : 0
        // add seconds/time here
      }
    );

    ++this.citiesArrayCursor;
  }

  endQuiz(city) {

    this.gameLog.push(
      {
        'city' : city,
        'result' : 'in-progress',
        'points' : 0
        // add seconds/time here
      }
    );
    this.gameRecapInProgress = true;
  }

  returnGameLog(log: object) {
    this.quizFinishEvent.emit(log);
  }


  ngOnInit(): void {


  }

}
