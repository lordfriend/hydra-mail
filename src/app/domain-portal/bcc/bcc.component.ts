import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BccService } from './bcc.service';
import { Bcc } from '../../../entity/bbc';

@Component({
  selector: 'app-bcc',
  templateUrl: './bcc.component.html',
  styleUrls: ['./bcc.component.less']
})
export class BccComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain_id: number;

  bccList: Bcc[];

  constructor(private _bccService: BccService) { }

  addBcc() {
    console.log('add bcc');
  }

  ngOnInit() {
    this._subscription.add(
      this._bccService.listBcc(this.domain_id)
        .subscribe(bccList => {
          this.bccList = bccList;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
