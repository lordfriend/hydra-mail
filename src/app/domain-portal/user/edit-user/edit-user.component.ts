import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../entity/user';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';
import { Domain } from '../../../../entity/domain';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  user: User;

  @Input()
  domain: Domain;

  userForm: FormGroup;
  deleteConfirmForm: FormGroup;

  formErrors = {
    password: ''
  };

  validationMessages = {
    password: {
      required: 'password is empty'
    }
  };

  constructor(private _fb: FormBuilder,
              private _dialogRef: UIDialogRef<EditUserComponent>,
              private _userService: UserService,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  save() {
    if (this.userForm.invalid) {
      this._toastRef.show('form has error');
      return;
    }
    const password = this.userForm.value.password;
    this._subscription.add(
      this._userService.updateUser(this.domain.id, this.user.id, password)
        .subscribe(() => {
          this._toastRef.show('Update user successful');
          this._dialogRef.close('ok');
        }, (resp) => {
          this._toastRef.show(resp.json().title);
        })
    );
  }

  delete() {
    if (this.deleteConfirmForm.invalid) {
      return;
    }
    this._subscription.add(
      this._userService.deleteUser(this.domain.id, this.user.id)
        .subscribe(() => {
          this._toastRef.show('User deleted');
          this._dialogRef.close('ok');
        }, (resp) => {
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {
    this.userForm = this._fb.group({
      password: ['', Validators.required]
    });
    this.deleteConfirmForm = this._fb.group({
      deleteConfirm: ['', this.userNameCheckValidator(this.user)]
    });
    this._subscription.add(
      this.userForm.valueChanges
        .subscribe((data) => {
          this.onValueChanges(data);
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  userNameCheckValidator(user: User) {
    return function (control: AbstractControl): ValidationErrors | null {
      return control.value === user.email ? null : {'userNameNotMatch': true};
    };
  }

  private onValueChanges(data?: any): void {
    if (!this.userForm) {
      return;
    }
    console.log(data);
    const form = this.userForm;
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
        }
      }
    }
  }
}
