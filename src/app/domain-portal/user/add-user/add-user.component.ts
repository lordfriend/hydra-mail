import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Domain } from '../../../../entity/domain';
import { UserService } from '../user.service';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain: Domain;

  userForm: FormGroup;

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
              private _userService: UserService,
              private _dialogRef: UIDialogRef<AddUserComponent>,
              toastService: UIToast) {
    this._toastRef = toastService.makeText();
  }

  save() {
    if (this.hasError) {
      this._toastRef.show('Error in fields');
      return;
    }
    const user = this.userForm.value;
    this._subscription.add(
      this._userService.addUser(this.domain.id, user.username, user.password)
        .subscribe(
          () => {
            this._toastRef.show('Add user successful');
            this._dialogRef.close(user);
          },
          (resp) => {
            this._toastRef.show(resp.error.title);
          }
        )
    );
  }

  ngOnInit() {
    this.userForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this._subscription.add(
      this.userForm.valueChanges
        .subscribe((data) => {
          this.onValueChanges(data);
        })
    );

    this.onValueChanges();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  private onValueChanges(data?: any): void {
    if (!this.userForm) {
      return;
    }
    console.log(data);
    const form = this.userForm;
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
