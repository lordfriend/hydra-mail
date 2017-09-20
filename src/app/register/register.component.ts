import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
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
export class RegisterComponent implements OnInit, OnDestroy {
  private _toastRef: UIToastRef<UIToastComponent>;
  private _subscription = new Subscription();

  registerForm: FormGroup;

  formErrors = {
    username: '',
    password: '',
    code: '',
  };

  validationMessages = {
    username: {
      required: 'username is empty'
    },
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
              private _dialogRef: UIDialogRef<RegisterComponent>,
              toastService: UIToast) {
    this._toastRef = toastService.makeText();
  }

  onSubmit() {
    const credential = this.registerForm.value;
    this._subscription.add(
      this._authService.register(credential.username, credential.password, credential.code)
        .subscribe((info) => {
          this._toastRef.show('Register successful. Please login');
          this._dialogRef.close(info);
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
    this.registerForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      code: ['', Validators.required]
    });
    this._subscription.add(
      this.registerForm.valueChanges
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
    if (!this.registerForm) {
      return;
    }
    console.log(data);
    const form = this.registerForm;
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
