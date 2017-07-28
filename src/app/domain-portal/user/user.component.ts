import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../entity/user';
import { UserService } from './user.service';
import { UIDialog } from 'deneb-ui';
import { AddUserComponent } from './add-user/add-user.component';
import { Domain } from '../../../entity/domain';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain: Domain;

  userList: User[];

  constructor(private _userService: UserService, private _dialogService: UIDialog) {
  }

  addUser() {
    const dialogRef = this._dialogService.open(AddUserComponent, {
      stickyDialog: false,
      backdrop: true
    });
    dialogRef.componentInstance.domain = this.domain;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => !!result)
        .flatMap(() => {
          return this._userService.listUser(this.domain.id);
        })
        .subscribe((userList) => {
          this.userList = userList;
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._userService.listUser(this.domain.id)
        .subscribe(userList => this.userList = userList)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
