import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TransportService } from './transport.service';
import { Transport } from '../../../entity/transport';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.less']
})
export class TransportComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain_id: number;

  transportList: Transport[];

  constructor(private _transportService: TransportService) { }

  addTransport() {
    console.log('add transport');
  }

  ngOnInit() {
    this._subscription.add(
      this._transportService.listTransport(this.domain_id)
        .subscribe(transportList => {
          this.transportList = transportList;
        })
    );
  }

  ngOnDestroy(): void {
  }
}
