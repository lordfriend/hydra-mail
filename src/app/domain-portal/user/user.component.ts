import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../entity/user';
import { UserService } from './user.service';
import { UIDialog, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { AddUserComponent } from './add-user/add-user.component';
import { Domain } from '../../../entity/domain';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ClientConfigGuideComponent } from '../client-config-guide/client-config-guide.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain: Domain;

  userList: User[];

  isLoading = true;

  constructor(private _userService: UserService,
              private _dialogService: UIDialog,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

  addUser() {
    const dialogRef = this._dialogService.open(AddUserComponent, {
      stickyDialog: true,
      backdrop: true
    });
    dialogRef.componentInstance.domain = this.domain;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => !!result)
        .flatMap(() => {
          this.isLoading = true;
          return this._userService.listUser(this.domain.id);
        })
        .subscribe((userList) => {
          this.isLoading = false;
          this.userList = userList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  editUser(user: User) {
    const dialogRef = this._dialogService.open(EditUserComponent, {
      stickyDialog: true,
      backdrop: true
    });
    dialogRef.componentInstance.domain = this.domain;
    dialogRef.componentInstance.user = user;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => !!result)
        .flatMap(() => {
          this.isLoading = true;
          return this._userService.listUser(this.domain.id);
        })
        .subscribe((userList) => {
          this.isLoading = false;
          this.userList = userList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  openHelp(user: User, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this._dialogService.open(ClientConfigGuideComponent, {
      stickyDialog: false,
      backdrop: true
    });
    dialogRef.componentInstance.user = user;
  }

  ngOnInit() {
    this._subscription.add(
      this._userService.listUser(this.domain.id)
        .subscribe((userList) => {
          this.isLoading = false;
          this.userList = userList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
