import { Component, OnInit } from '@angular/core';
import { UIDialogRef } from 'deneb-ui';

@Component({
  selector: 'app-dialog-frame',
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.less']
})
export class DialogFrameComponent implements OnInit {

  constructor(private _dialogRef: UIDialogRef<DialogFrameComponent>) {
  }

  back() {
    this._dialogRef.close(null);
  }

  ngOnInit() {
  }

}
