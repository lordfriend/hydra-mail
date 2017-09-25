import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BccService } from './bcc.service';
import { Bcc } from '../../../entity/bbc';
import { UIDialog, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { CommonEditDialogComponent } from '../../common-edit-dialog/common-edit-dialog.component';
import { Domain } from '../../../entity/domain';

@Component({
  selector: 'app-bcc',
  templateUrl: './bcc.component.html',
  styleUrls: ['./bcc.component.less']
})
export class BccComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain: Domain;

  bccList: Bcc[];

  isLoading = true;

  constructor(private _bccService: BccService,
              private _dialogService: UIDialog,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  addBcc() {
    const dialogRef = this._dialogService.open(CommonEditDialogComponent, {
      stickyDialog: true,
      backdrop: true
    });
    dialogRef.componentInstance.title = 'Add Bcc';
    dialogRef.componentInstance.domain = this.domain;
    dialogRef.componentInstance.description = `BCC: blind carbon copy to tertiary recipients who receive the message.
     The primary and secondary recipients cannot see the tertiary recipients. Depending on email software, the tertiary 
     recipients may only see their own email address in BCC,
     or they may see the email addresses of all primary and secondary recipients.`;
    dialogRef.componentInstance.fields = ['source', 'destination', 'region'];
    dialogRef.componentInstance.serviceClass = BccService;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter((result) => !!result)
        .flatMap(() => {
          this.isLoading = true;
          return this._bccService.list(this.domain.id);
        })
        .subscribe((bccList) => {
          this.isLoading = false;
          this.bccList = bccList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  deleteBcc(bcc: Bcc) {
    this._subscription.add(
      this._bccService.delete(this.domain.id, bcc.id)
        .flatMap(() => {
          this.isLoading = true;
          return this._bccService.list(this.domain.id);
        })
        .subscribe((bccList) => {
          this.isLoading = false;
          this.bccList = bccList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._bccService.list(this.domain.id)
        .subscribe(bccList => {
          this.isLoading = false;
          this.bccList = bccList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
