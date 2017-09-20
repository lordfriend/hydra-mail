import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UIDialog } from 'deneb-ui';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-login-wrapper',
  template: `
    <div class="login-wrapper">
      <div class="waiting-tip" *ngIf="waiting">
        <div class="ui large active text loader">
          Logout...
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `
  ]
})
export class LoginWrapperComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  waiting = true;

  constructor(private _dialog: UIDialog, private _router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._subscription.add(
      this._authService.logout()
        .flatMap(() => {
          this.waiting = false;
          return this._dialog.open(LoginComponent, {stickyDialog: true, backdrop: true}).afterClosed();
        })
        .subscribe(() => {
          this._router.navigateByUrl('/', {replaceUrl: true});
        }, () => {
          this._router.navigateByUrl('/', {replaceUrl: true});
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
