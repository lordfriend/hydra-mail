import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TransportService } from './transport.service';
import { Transport } from '../../../entity/transport';
import { Domain } from '../../../entity/domain';
import { UIDialog } from 'deneb-ui';
import { CommonEditDialogComponent } from '../../common-edit-dialog/common-edit-dialog.component';
import { AddTransportComponent } from './add-transport/add-transport.component';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.less']
})
export class TransportComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain: Domain;

  transportList: Transport[];

  constructor(private _transportService: TransportService,
              private _dialogService: UIDialog) { }

  addTransport() {
    const dialogRef = this._dialogService.open(AddTransportComponent, {
      stickyDialog: true,
      backdrop: true
    });
    dialogRef.componentInstance.domain = this.domain;
    this._subscription.add(
      dialogRef.afterClosed()
        .filter((result) => !!result)
        .flatMap(() => {
          return this._transportService.list(this.domain.id);
        })
        .subscribe((transportList) => {
          this.transportList = transportList;
        })
    );
  }

  deleteTransport(transport: Transport) {
    this._subscription.add(
      this._transportService.delete(this.domain.id, transport.id)
        .flatMap(() => {
          return this._transportService.list(this.domain.id);
        })
        .subscribe((transportList) => {
          this.transportList = transportList;
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._transportService.list(this.domain.id)
        .subscribe(transportList => {
          this.transportList = transportList;
        })
    );
  }

  ngOnDestroy(): void {
  }
}
