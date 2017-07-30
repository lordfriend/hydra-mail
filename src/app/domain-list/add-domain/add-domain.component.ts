import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomainService } from '../../domain-portal/domain.service';
import { UIDialogRef, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.less']
})
export class AddDomainComponent implements OnInit {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  domainForm: FormGroup;

  constructor(private _dialogRef: UIDialogRef<AddDomainComponent>,
              private _fb: FormBuilder,
              private _domainService: DomainService,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  save() {
    if (this.domainForm.valid) {
      const value = this.domainForm.value;
      this._subscription.add(
        this._domainService.addDomain(value.domain)
          .subscribe((domain) => {
            this._toastRef.show('Add domain successful');
            this._dialogRef.close(domain);
          }, (resp) => {
            this._toastRef.show(resp.error.title);
          })
      );
    } else {
      this._toastRef.show('field has error');
    }
  }

  ngOnInit() {
    this.domainForm = this._fb.group({
      domain: ['', Validators.required]
    });
  }
}
