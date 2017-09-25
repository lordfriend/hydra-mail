import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AliasService } from './alias.service';
import { Alias } from '../../../entity/alias';
import { Domain } from '../../../entity/domain';
import { UIDialog, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { CommonEditDialogComponent } from '../../common-edit-dialog/common-edit-dialog.component';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.less']
})
export class AliasComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain: Domain;

  aliasList: Alias[];

  isLoading = true;

  constructor(private _aliasService: AliasService,
              private _dialogService: UIDialog,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  addAlias() {
    const dialogRef = this._dialogService.open(CommonEditDialogComponent, {
      stickyDialog: true,
      backdrop: true
    });
    dialogRef.componentInstance.title = 'Add Alias';
    dialogRef.componentInstance.domain = this.domain;
    dialogRef.componentInstance.description = `Alias can hide your real username or redirect different email address to
    the same user`;
    dialogRef.componentInstance.fields = ['source', 'destination'];
    dialogRef.componentInstance.serviceClass = AliasService;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter((result) => !!result)
        .flatMap(() => {
          this.isLoading = true;
          return this._aliasService.list(this.domain.id);
        })
        .subscribe((aliasList) => {
          this.isLoading = false;
          this.aliasList = aliasList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }
  deleteAlias(alias: Alias) {
    this._subscription.add(
      this._aliasService.delete(this.domain.id, alias.id)
        .flatMap(() => {
          this.isLoading = true;
          return this._aliasService.list(this.domain.id);
        })
        .subscribe((aliasList) => {
          this.isLoading = false;
          this.aliasList = aliasList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._aliasService.list(this.domain.id)
        .subscribe(aliasList => {
          this.isLoading = false;
          this.aliasList = aliasList;
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
