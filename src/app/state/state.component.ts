import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MavenService } from '../maven.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  stateCodeQuery;

  queryResult;

  gameIsRunning = false;
  quizInfo = {
    "quizType" : "entireState"
  };

  getCitiesInStateButton() {
    this.submitQuery().subscribe(data => {
      // console.log(data);
      this.queryResult = data;
    });
  }

  submitQuery(): Observable<any[]> {
    return this.mavenService.getCitiesWithinState(this.stateCodeQuery)
  }

  mergeGameLog(log) {
    // console.log(log);
  }

  loadGame() {
    this.gameIsRunning = true;
    this.queryResult.cities = this.shuffle(this.queryResult.cities);

    this.quizInfo['stateCode'] = this.queryResult.stateCode

  }


  constructor(
    private mavenService: MavenService
  ) { }

  shuffle(list) {
    return list.reduce((p, n) => {
      const size = p.length;
      const index = Math.trunc(Math.random() * (size - 1));
      p.splice(index, 0, n);
      return p;
    }, []);
  };



  ngOnInit(): void {
  }

}
