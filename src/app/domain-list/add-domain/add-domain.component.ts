import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomainService } from '../../domain-portal/domain.service';
import { UIDialogRef } from 'deneb-ui';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.less']
})
export class AddDomainComponent implements OnInit {

  domainForm: FormGroup;

  constructor(private _dialogRef: UIDialogRef<AddDomainComponent>,
              private _fb: FormBuilder,
              private _domainService: DomainService) { }

  save() {
    if (this.domainForm.valid) {
      const value = this.domainForm.value;
      this._domainService.addDomain(value.domain)
        .subscribe((domain) => {
          return this._dialogRef.close(domain);
        });
    }
  }

  ngOnInit() {
    this.domainForm = this._fb.group({
      domain: ['', Validators.required]
    });
  }
}
