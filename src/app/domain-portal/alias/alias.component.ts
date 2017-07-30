import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AliasService } from './alias.service';
import { Alias } from '../../../entity/alias';
import { Domain } from '../../../entity/domain';
import { UIDialog } from 'deneb-ui';
import { CommonEditDialogComponent } from '../../common-edit-dialog/common-edit-dialog.component';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.less']
})
export class AliasComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain: Domain;

  aliasList: Alias[];

  constructor(private _aliasService: AliasService,
              private _dialogService: UIDialog) { }

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
          return this._aliasService.list(this.domain.id);
        })
        .subscribe((aliasList) => {
          this.aliasList = aliasList;
        })
    );
  }
  deleteAlias(alias: Alias) {
    this._subscription.add(
      this._aliasService.delete(this.domain.id, alias.id)
        .flatMap(() => {
          return this._aliasService.list(this.domain.id);
        })
        .subscribe((aliasList) => {
          this.aliasList = aliasList;
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._aliasService.list(this.domain.id)
        .subscribe(aliasList => {
          this.aliasList = aliasList;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
