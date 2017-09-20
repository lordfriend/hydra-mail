import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less'],
  animations: [
    trigger('dialogVisibility', [
      state('active', style({
        opacity: 1
      })),
      state('inactive', style({
        opacity: 0
      })),
      transition('active => inactive', [
        animate('200ms ease-out')
      ]),
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private _toastRef: UIToastRef<UIToastComponent>;
  private _subscription = new Subscription();

  resetPasswordForm: FormGroup;

  formErrors = {
    password: '',
    code: '',
  };

  validationMessages = {
    password: {
      required: 'password is empty'
    },
    code: {
      required: 'invite code is empty'
    }
  };

  hasError = false;

  state = 'active';

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _dialogRef: UIDialogRef<ResetPasswordComponent>,
              toastService: UIToast) {
    this._toastRef = toastService.makeText();
  }

  onSubmit() {
    const credential = this.resetPasswordForm.value;
    this._subscription.add(
      this._authService.changePassword(credential.password, credential.code)
        .subscribe(() => {
          this._toastRef.show('Reset password successful. Returning to login');
          this._dialogRef.close();
        }, (resp) => {
          this._toastRef.show(resp.error.title);
        })
    );
  }

  onLogin() {
    this.state = 'inactive';
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'inactive') {
      this._dialogRef.close();
    }
  }

  ngOnInit() {
    this.resetPasswordForm = this._fb.group({
      password: ['', Validators.required],
      code: ['', Validators.required]
    });
    this._subscription.add(
      this.resetPasswordForm.valueChanges
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
    if (!this.resetPasswordForm) {
      return;
    }
    const form = this.resetPasswordForm;
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
