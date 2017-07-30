import { Directive, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { UIDialog } from 'deneb-ui';
import { ConfirmDialogModalComponent } from './confirm-dialog-modal.component';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[appConfirmDialog]'
})
export class ConfirmDialogDirective implements OnDestroy {

    private _subscription = new Subscription();

    @Input()
    dialogTitle: string;

    @Input()
    dialogContent: string;

    @Output()
    onConfirm = new EventEmitter<any>();

    @Output()
    onCancel = new EventEmitter<any>();

    constructor(private _dialog: UIDialog) {}

    @HostListener('click', ['$event'])
    onClickHandler($event: MouseEvent) {
        $event.preventDefault();

        const dialogRef = this._dialog.open(ConfirmDialogModalComponent, {stickyDialog: true, backdrop: true});
        dialogRef.componentInstance.title = this.dialogTitle;
        dialogRef.componentInstance.content = this.dialogContent;
        this._subscription.add(
            dialogRef.afterClosed()
                .subscribe(
                    (result: string) => {
                        if (result === 'confirm') {
                            this.onConfirm.emit('confirm');
                        } else {
                            this.onCancel.emit('cancel');
                        }
                    }
                )
        );
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
