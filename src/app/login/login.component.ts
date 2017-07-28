import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
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

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _dialogRef: UIDialogRef<LoginComponent>,
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
          this._toastRef.show(resp.json().title);
        })
    );
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
    console.log(data);
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
