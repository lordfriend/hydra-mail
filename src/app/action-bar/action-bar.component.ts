import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.less']
})
export class ActionBarComponent implements OnInit {

  @Input()
  backRoute: string;

  constructor() { }

  ngOnInit() {
  }

}
