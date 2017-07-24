import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../entity/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain_id: number;

  userList: User[];

  constructor(private _userService: UserService) { }

  addUser() {
    console.log('add user');
  }

  ngOnInit() {
    this._subscription.add(
      this._userService.listUser(this.domain_id)
        .subscribe(userList => this.userList = userList)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
