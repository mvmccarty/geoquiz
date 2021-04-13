import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  @Input() gameLog: object;
  @Input() playerScore: number;
  @Input() playerName: string;

  returnGoogleHref(cityName) {
    return "http://www.google.com/"
  }


  constructor() { }

  ngOnInit(): void {

  }

}
