import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { UIDialog } from 'deneb-ui';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private _authService: AuthService, private _uiDialog: UIDialog) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.getAccountInfo()
      .then(() => {
        return true;
      }, () => {
        const dialogRef = this._uiDialog.open(LoginComponent, {
          stickyDialog: true,
          backdrop: true
        });
        return dialogRef.afterClosed()
          .toPromise()
          .then(() => true);
      });
  }
}
