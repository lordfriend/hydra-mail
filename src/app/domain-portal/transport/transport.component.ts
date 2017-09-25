import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TransportService } from './transport.service';
import { Transport } from '../../../entity/transport';
import { Domain } from '../../../entity/domain';
import { UIDialog, UIToast, UIToastComponent, UIToastRef } from 'deneb-ui';
import { AddTransportComponent } from './add-transport/add-transport.component';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.less']
})
export class TransportComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _toastRef: UIToastRef<UIToastComponent>;

  @Input()
  domain: Domain;

  transportList: Transport[];

  isLoading = true;

  constructor(private _transportService: TransportService,
              private _dialogService: UIDialog,
              toast: UIToast) {
    this._toastRef = toast.makeText();
  }

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
          this.isLoading = true;
          return this._transportService.list(this.domain.id);
        })
        .subscribe((transportList) => {
          this.isLoading = false;
          this.transportList = transportList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  deleteTransport(transport: Transport) {
    this._subscription.add(
      this._transportService.delete(this.domain.id, transport.id)
        .flatMap(() => {
          this.isLoading = true;
          return this._transportService.list(this.domain.id);
        })
        .subscribe((transportList) => {
          this.isLoading = false;
          this.transportList = transportList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._transportService.list(this.domain.id)
        .subscribe(transportList => {
          this.isLoading = false;
          this.transportList = transportList;
        }, (resp) => {
          this.isLoading = false;
          this._toastRef.show(resp.error.title);
        })
    );
  }

  ngOnDestroy(): void {
  }
}
