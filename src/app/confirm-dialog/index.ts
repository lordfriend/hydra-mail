import {NgModule} from '@angular/core';
import {ConfirmDialogDirective} from './confirm-dialog.directive';
import {UIDialogModule} from 'deneb-ui';
import {ConfirmDialogModalComponent} from './confirm-dialog-modal.component';

@NgModule({
    declarations: [ConfirmDialogDirective, ConfirmDialogModalComponent],
    imports: [UIDialogModule],
    exports: [ConfirmDialogDirective],
    entryComponents: [ConfirmDialogModalComponent]
})
export class ConfirmDialogModule {

}

export * from './confirm-dialog.directive';
