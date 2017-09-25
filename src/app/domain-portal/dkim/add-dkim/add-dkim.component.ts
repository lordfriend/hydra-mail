import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DkimRecord } from '../../../../entity/dkim';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-dkim',
  templateUrl: './add-dkim.component.html',
  styleUrls: ['./add-dkim.component.less']
})
export class AddDkimComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;
  title: string;

  @Input()
  dkimRecord: DkimRecord;

  dkimForm: FormGroup;

  formErrors = {
    selector: '',
    private_key: ''
  };

  validationMessages = {
    password: {
      required: 'selector is required'
    },
    private_key: 'private key is required'
  };

  hasError = false;

  constructor(private _dialogRef: UIDialogRef<AddDkimComponent>,
              private _fb: FormBuilder,
              toastService: UIToast) {
    this._toastRef = toastService.makeText();
  }

  save() {
    if (this.hasError) {
      this._toastRef.show('Form has errors');
      return;
    }
    const dkim = this.dkimForm.value;
    this._dialogRef.close(dkim);
  }

  ngOnInit() {
    if (this.dkimRecord) {
      this.title = 'Replace DKIM record';
    } else {
      this.title = 'Add DKIM Record';
    }
    this.dkimForm = this._fb.group({
      selector: ['', Validators.required],
      private_key: ['', Validators.required]
    });
    this._subscription.add(
      this.dkimForm.valueChanges
        .subscribe(() => {
          this.onValueChanges();
        })
    );
    this.onValueChanges();
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private onValueChanges(data?: any): void {
    if (!this.dkimForm) {
      return;
    }
    const form = this.dkimForm;
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
