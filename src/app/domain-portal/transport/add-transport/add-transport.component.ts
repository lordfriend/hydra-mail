import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Domain } from '../../../../entity/domain';
import { TransportService } from '../transport.service';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.less']
})
export class AddTransportComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain: Domain;

  formGroup: FormGroup;

  formErrors = {
    destination: '',
    region: ''
  };

  validationMessages = {
    destination: {
      required: 'destination is empty'
    },
    region: {
      required: 'region not selected'
    }
  };

  hasError = false;

  constructor(private _transportService: TransportService,
              private _fb: FormBuilder,
              private _dialogRef: UIDialogRef<AddTransportComponent>,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  save() {
    if (this.hasError) {
      this._toastRef.show('Form has errors');
      return;
    }
    const payload = this.formGroup.value;

    this._subscription.add(
      this._transportService.add(this.domain.id, payload)
        .subscribe(() => {
          this._toastRef.show('Add successful');
          this._dialogRef.close('ok');
        }, (resp) => {
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {

    this.formGroup = this._fb.group({
      source: [''],
      destination: ['', Validators.required],
      region: ['', Validators.required]
    });

    this._subscription.add(this.formGroup.valueChanges
      .subscribe(
        (data) => {
          this.onValueChanges(data);
        }
      )
    );
    this.onValueChanges();
  }

  ngOnDestroy(): void {
  }

  private onValueChanges(data?: any): void {
    if (!this.formGroup) {
      return;
    }
    const form = this.formGroup;
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
