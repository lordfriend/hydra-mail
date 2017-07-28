import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Domain } from '../../entity/domain';
import { DomainService } from '../domain-portal/domain.service';
import { UIDialog } from 'deneb-ui';
import { AddDomainComponent } from './add-domain/add-domain.component';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.less']
})
export class DomainListComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  domainList: Domain[];

  constructor(private _domainService: DomainService,
              private _dialogService: UIDialog) {
  }

  addDomain() {
    const dialogRef = this._dialogService.open(AddDomainComponent, {
      stickyDialog: true,
      backdrop: true
    });

    this._subscription.add(
      dialogRef.afterClosed()
        .filter(result => !!result)
        .flatMap(() => {
          return this._domainService.listDomain();
        })
        .subscribe(domainList => {
          this.domainList = domainList;
        })
    );
  }

  ngOnInit(): void {
    this._subscription.add(
      this._domainService.listDomain()
        .subscribe(domainList => {
          this.domainList = domainList;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
