import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MavenService } from '../maven.service';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit {

  zipCodeQuery;
  kmRadiusQuery;

  queryResult;

  gameIsRunning = false;
  quizInfo = {
    "quizType" : "zipCodeRadius",
  };
    


  getCitiesButton() {

    this.submitQuery().subscribe(data => {
      // console.log(data);
      this.queryResult = data;
    });

  }

  submitQuery(): Observable<any[]> {
    return this.mavenService.getCitiesWithinZipCodeRadius(this.zipCodeQuery, this.kmRadiusQuery)
  }

  mergeGameLog(log) {
    // console.log(log);
  }

  loadGame() {

    this.gameIsRunning = true;
    this.queryResult.cities = this.shuffle(this.queryResult.cities)

    this.quizInfo['zipCode'] = this.queryResult.zipCode;
    this.quizInfo['kmRadius'] = this.queryResult.kmRadius;
    this.quizInfo['cityMatch'] = this.queryResult.cityMatch;

  }



  constructor(private mavenService: MavenService) { }

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
