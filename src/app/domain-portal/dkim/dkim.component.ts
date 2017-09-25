import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DkimService } from './dkim.service';
import { DkimRecord } from '../../../entity/dkim';
import { UIDialog, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { AddDkimComponent } from './add-dkim/add-dkim.component';

@Component({
  selector: 'app-dkim',
  templateUrl: './dkim.component.html',
  styleUrls: ['./dkim.component.less']
})
export class DkimComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain_id: number;

  currentDkimRecord: DkimRecord;

  isLoading = true;

  constructor(private _dkimService: DkimService,
              private _dialogService: UIDialog,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  editDkim() {
    const dialogRef = this._dialogService.open(AddDkimComponent, {
      stickyDialog: true,
      backdrop: true
    });
    dialogRef.componentInstance.dkimRecord = this.currentDkimRecord;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => !!result)
        .flatMap((result) => {
          this.isLoading = true;
          return this._dkimService.updateDkimRecord(this.domain_id, result);
        })
        .flatMap(() => {
          return this._dkimService.getDkimRecord(this.domain_id);
        })
        .subscribe((record) => {
          this.isLoading = false;
          this.currentDkimRecord = record;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._dkimService.getDkimRecord(this.domain_id)
        .subscribe(
          (record) => {
            this.isLoading = false;
            this.currentDkimRecord = record;
          },
          (resp) => {
            this.isLoading = false;
            this._toastRef.show(resp.error.title);
          }
        )
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
