import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  playerScore = 15;
  timeLeft = 180;


  playSound(fileName) {
    let audio = new Audio();
    audio.src = "../../../assets/sounds/" + fileName;
    audio.load();
    audio.play();
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


  constructor() { }

  ngOnInit(): void {
  }

}
