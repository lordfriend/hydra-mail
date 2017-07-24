import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DkimService } from './dkim.service';
import { DkimRecord } from '../../../entity/dkim';

@Component({
  selector: 'app-dkim',
  templateUrl: './dkim.component.html',
  styleUrls: ['./dkim.component.less']
})
export class DkimComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain_id: number;

  currentDkimRecord: DkimRecord;

  constructor(private _dkimService: DkimService) { }

  editDkim() {
    console.log('edit dkim');
  }

  ngOnInit() {
    this._subscription.add(
      this._dkimService.getDkimRecord(this.domain_id)
        .subscribe(
          (record) => {
            this.currentDkimRecord = record;
          }
        )
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
