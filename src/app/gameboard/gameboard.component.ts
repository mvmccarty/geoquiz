import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';

import { MavenService } from '../maven.service';


@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() cities: object;

  @Output() quizFinishEvent = new EventEmitter<object>();

  playerName = "";

  citiesArrayCursor = 0;
  gameLog = [];
  playerScore = 0;

  timeLeft: number = 180;
  interval;
  subscribeTimer: any;

  nameEntryInProgress = true;
  gameRecapInProgress = false;

  constructor(
    private mavenService: MavenService
  ) { }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timeLeft = 60;
        clearInterval(this.interval);
        this.endQuiz(this.cities[this.citiesArrayCursor]);
        this.returnGameLog(this.gameLog);
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);
    
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  
    // The output in MM:SS format
  }

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
    if (!this.gameRecapInProgress) {
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
  }

  playDing() {
    let audio = new Audio();
    audio.src = "../../../assets/sounds/ding.wav";
    audio.load();
    audio.play();
  }

  returnGameLog(log: object) {
    this.quizFinishEvent.emit(log);
  }



  ngOnInit(): void {
    // this.startTimer();
  }

}
