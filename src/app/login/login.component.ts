import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UIDialog, UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { RegisterComponent } from '../register/register.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [
    trigger('dialogVisibility', [
      state('register', style({
        opacity: 0
      })),
      state('resetPassword', style({
        opacity: 0
      })),
      state('login', style({
        opacity: 1
      })),
      transition('login => register', animate('200ms ease-out')),
      transition('login => resetPassword', animate('200ms ease-out')),
      transition('* => login', animate('200ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  loginForm: FormGroup;

  formErrors = {
    username: '',
    password: ''
  };

  validationMessages = {
    username: {
      required: 'username is empty'
    },
    password: {
      required: 'password is empty'
    }
  };

  hasError = false;

  openWindow = 'login';

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _dialogRef: UIDialogRef<LoginComponent>,
              private _dialog: UIDialog,
              toastService: UIToast) {
    this._toastRef = toastService.makeText();
  }

  onSubmit() {
    const credential = this.loginForm.value;
    this._subscription.add(
      this._authService.login(credential.username, credential.password)
        .subscribe((info) => {
          this._dialogRef.close(info);
        }, (resp) => {
          this._toastRef.show(resp.error.title);
        })
    );
  }

  onRegister() {
    this.openWindow = 'register';
  }

  onResetPassword() {
    this.openWindow = 'resetPassword';
  }

  onFadeOut(event: AnimationEvent) {
    if (event.toState === 'register') {
      const dialogRef = this._dialog.open(RegisterComponent, {stickyDialog: true, backdrop: false});
      this._subscription.add(
        dialogRef.afterClosed()
          .subscribe(() => {
            this.openWindow = 'login';
          })
      );
    } else if (event.toState === 'resetPassword') {
      const dialogRef = this._dialog.open(ResetPasswordComponent, {stickyDialog: true, backdrop: false});
      this._subscription.add(
        dialogRef.afterClosed()
          .subscribe(() => {
            this.openWindow = 'login';
          })
      );
    }
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._subscription.add(
      this.loginForm.valueChanges
        .subscribe(data => {
          this.onValueChanges(data);
        })
    );
    this.onValueChanges();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private onValueChanges(data?: any): void {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    this.hasError = false;
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (!control.errors.hasOwnProperty(key)) {
            continue;
          }
          this.formErrors[field] += messages[key] + '';
          this.hasError = true;
        }
      }
    }
  }
}
