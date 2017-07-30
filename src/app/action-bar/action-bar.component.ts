import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ActionBarComponent implements OnInit {

  @Input()
  backRoute: string;

  constructor() { }

  ngOnInit() {
  }

}
