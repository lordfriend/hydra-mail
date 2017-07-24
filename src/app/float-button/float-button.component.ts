import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.less']
})
export class FloatButtonComponent {

  @Output()
  btnClick = new EventEmitter<any>();

  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.btnClick.emit('');
  }
}
