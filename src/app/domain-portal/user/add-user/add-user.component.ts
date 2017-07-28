import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Domain } from '../../../../entity/domain';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain: Domain;

  userForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
  }
}
