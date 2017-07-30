import { Component, Input } from '@angular/core';
import { UIDialogRef } from 'deneb-ui';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.html'
})
export class AlertDialogComponent {
    @Input()
    confirmButtonText: string;

    @Input()
    title: string;

    @Input()
    content: string;


    constructor(private _dialogRef: UIDialogRef<AlertDialogComponent>) {}

    confirm() {
        this._dialogRef.close('confirm');
    }
}
