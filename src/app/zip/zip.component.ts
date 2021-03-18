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

  getCitiesButton() {

    this.submitQuery().subscribe(data => {
      // console.log(data);
      this.queryResult = data;
    });
  }

  submitQuery(): Observable<any[]> {
    return this.mavenService.getCitiesWithinZipCodeRadius(this.zipCodeQuery, this.kmRadiusQuery)
  }

  constructor(private mavenService: MavenService) { }

  ngOnInit(): void {
  }

}
