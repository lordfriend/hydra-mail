import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Domain } from '../../entity/domain';
import { DomainService } from '../domain-portal/domain.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.less']
})
export class DomainListComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  domainList: Domain[];

  constructor(private _domainService: DomainService) {
    console.log('domain list');
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
