import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs/Subscription';
import { Server } from '../../../entity/server';
import { User } from '../../../entity/user';

@Component({
  selector: 'app-client-config-guide',
  templateUrl: './client-config-guide.component.html',
  styleUrls: ['./client-config-guide.component.less']
})
export class ClientConfigGuideComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  isLoading = true;

  serverList: Server[];

  @Input()
  user: User;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._subscription.add(
      this._appService.listServer()
        .subscribe((list) => {
          this.isLoading = false;
          this.serverList = list;
        }, () => {
          this.isLoading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
