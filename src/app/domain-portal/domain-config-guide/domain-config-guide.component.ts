import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DkimService } from '../dkim/dkim.service';
import { Subscription } from 'rxjs/Subscription';
import { UIDialogRef } from 'deneb-ui';
import { AppService } from '../../app.service';
import { Server } from '../../../entity/server';

@Component({
  selector: 'app-domain-config-guide',
  templateUrl: './domain-config-guide.component.html',
  styleUrls: ['./domain-config-guide.component.less']
})
export class DomainConfigGuideComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain_id;

  dkimSetting: any;

  serverList: Server[];

  isLoading = true;

  constructor(private _dkimService: DkimService,
              private _appService: AppService,
              private _dialogRef: UIDialogRef<DomainConfigGuideComponent>) { }

  goToDKIM() {
    this._dialogRef.close('dkim');
  }

  ngOnInit() {
    this._subscription.add(
      this._dkimService.getDkimRecord(this.domain_id)
        .subscribe((setting) => {
          this.isLoading = false;
          this.dkimSetting = setting;
        }, () => {
          this.isLoading = false;
        })
    );
    this._subscription.add(
      this._appService.listServer()
        .subscribe((list) => {
          this.serverList = list;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
