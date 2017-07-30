import {Component, Input} from '@angular/core';
import {UIDialogRef} from 'deneb-ui';
@Component({
    selector: 'app-confirm-dialog-modal',
    templateUrl: './confirm-dialog-modal.html',
    styles: [`
        .ui.modal.active {
            transform: translate3d(0, -50%, 0);
        }
    `]
})
export class ConfirmDialogModalComponent {

    @Input()
    title;

    @Input()
    content;

    constructor(private _dialogRef: UIDialogRef<ConfirmDialogModalComponent>) {}

    cancel() {
        this._dialogRef.close('cancel');
    }

    confirm() {
        this._dialogRef.close('confirm');
    }
}
