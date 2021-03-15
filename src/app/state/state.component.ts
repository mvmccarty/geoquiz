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

  getCitiesInStateButton() {
    this.submitQuery().subscribe(data => {
      console.log(data);
      this.queryResult = data;
    });
  }

  submitQuery(): Observable<any[]> {
    return this.mavenService.getCitiesWithinState(this.stateCodeQuery)
  }



  constructor(private mavenService: MavenService) { }

  ngOnInit(): void {
  }

}
