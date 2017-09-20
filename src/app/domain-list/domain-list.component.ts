import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Domain } from '../../entity/domain';
import { DomainService } from '../domain-portal/domain.service';
import { UIDialog } from 'deneb-ui';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { AccountInfo } from '../../entity/account-info';
import { AuthService } from '../authentication/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.less']
})
export class DomainListComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  domainList: Domain[];
  accountInfo: AccountInfo;

  constructor(private _domainService: DomainService,
              private _authService: AuthService,
              private _router: Router,
              private _dialogService: UIDialog) {
  }

  addDomain() {
    const dialogRef = this._dialogService.open(AddDomainComponent, {
      stickyDialog: true,
      backdrop: true
    });

    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => !!result)
        .flatMap(() => {
          return this._domainService.listDomain();
        })
        .subscribe(domainList => {
          this.domainList = domainList;
        })
    );
  }

  changePassword() {
    const dialogRef = this._dialogService.open(ResetPasswordComponent, {stickyDialog: true, backdrop: true});
    dialogRef.componentInstance.cancelable = true;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => result !== 'cancel')
        .subscribe(() => {
          this._router.navigateByUrl('/login');
        })
    );
  }

  logout() {
    this._router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this._subscription.add(
      this._domainService.listDomain()
        .subscribe(domainList => {
          this.domainList = domainList;
        })
    );
    this._subscription.add(
      this._authService.accountInfo
        .subscribe((info) => {
          this.accountInfo = info;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
