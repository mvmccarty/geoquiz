import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer, Observable } from 'rxjs';


import { MavenService } from '../maven.service';


@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() cities: object;
  @Input() quizInfo: object;


  @Output() quizFinishEvent = new EventEmitter<object>();

  playerName = "";

  citiesArrayCursor = 0;
  gameLog = [];
  playerScore = 0;

  totalAllotedTime = 180;
  roundTimeInSeconds = 0;
  timeLeft: number = this.totalAllotedTime;
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

    this.playSound('drum.wav');

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        if (this.timeLeft == 4) {
          this.playSound('countdown.wav');
        }
        this.timeLeft--;
        this.roundTimeInSeconds++;
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
    this.playSound('ding.wav');
    this.gameLog.push(
      {
        'city' : city,
        'result' : 'correct',
        'points' : 5,
        'seconds' : this.roundTimeInSeconds
      }
    );

    this.playerScore+=5
    this.roundTimeInSeconds = 0;
    ++this.citiesArrayCursor;
  }

  gameFault(city) {
    this.playSound('buzzer.wav')
    this.gameLog.push(
      {
        'city' : city,
        'result' : 'fault',
        'points' : 0,
        'seconds' : this.roundTimeInSeconds
      }
    );

    this.roundTimeInSeconds = 0;
    ++this.citiesArrayCursor;
  }

  endQuiz(city) {
    if (!this.gameRecapInProgress) {
      this.gameLog.push(
        {
          'city' : city,
          'result' : 'in-progress',
          'points' : 0,
          'seconds' : this.roundTimeInSeconds
        }
      );
      this.gameRecapInProgress = true;

      let gameSessionObject = {
        "playerName" : this.playerName,
        "citiesCount" : Object.values(this.cities).length,
        "gameTime" : new Date().toLocaleDateString(),
        "rounds" : this.gameLog,
        "score" : this.playerScore,
        "quizMinutes" : this.totalAllotedTime / 60,
        "gameOptions" : this.quizInfo
      };

      // console.log();

      this.postGameSession(gameSessionObject).subscribe(data => {
        console.log("added to high scores.");
      });

    }
  }

  postGameSession(session): Observable<any[]> {
    return this.mavenService.postGameSession(session)
  }


  playSound(fileName) {
    let audio = new Audio();
    audio.src = "../../../assets/sounds/" + fileName;
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
