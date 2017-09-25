import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DkimService } from '../dkim/dkim.service';
import { Subscription } from 'rxjs/Subscription';
import { UIDialogRef } from 'deneb-ui';

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

  isLoading = true;

  constructor(private _dkimService: DkimService, private _dialogRef: UIDialogRef<DomainConfigGuideComponent>) { }

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
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
