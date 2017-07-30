import { Component, Injector, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Domain } from '../../entity/domain';
import { AppService } from '../app.service';
import { Server } from '../../entity/server';
import { CrudService } from '../domain-portal/crud-service';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';

/**
 * This is a common dialog component for add bcc/alias/transport.
 * Because these operations have similar field and interaction.
 */
@Component({
  selector: 'app-common-edit-dialog',
  templateUrl: './common-edit-dialog.component.html',
  styleUrls: ['./common-edit-dialog.component.less']
})
export class CommonEditDialogComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  private _fieldControls = {
    source: ['', Validators.required],
    destination: ['', Validators.required],
    region: ['', Validators.required]
  };

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  domain: Domain;

  @Input()
  fields: string[];

  formGroup: FormGroup;

  formErrors = {
    source: '',
    destination: '',
    region: ''
  };

  validationMessages = {
    source: {
      required: 'source is empty'
    },
    destination: {
      required: 'destination is empty'
    },
    region: {
      required: 'region not selected'
    }
  };

  hasError = false;

  serverList: Server[];

  @Input()
  serviceClass: Type<CrudService<any>>;

  constructor(private _appService: AppService,
              private _injector: Injector,
              private _dialogRef: UIDialogRef<CommonEditDialogComponent>,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  save() {
    if (this.hasError) {
      this._toastRef.show('Form has errors');
      return;
    }
    const payload = this.formGroup.value;

    const service = this._injector.get(this.serviceClass);

    this._subscription.add(
      service.add(this.domain.id, payload)
        .subscribe(() => {
          this._toastRef.show('Add successful');
          this._dialogRef.close('ok');
        }, (resp) => {
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._appService.listServer()
        .subscribe((serverList) => {
          this.serverList = serverList;
        })
    );

    const controlGroup = {};
    this.fields.forEach((field) => {
      const controlConfig = this._fieldControls[field];
      controlGroup[field] = new FormControl(controlConfig[0], controlConfig[1]);
    });
    this.formGroup = new FormGroup(controlGroup);

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
    console.log(data);
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
