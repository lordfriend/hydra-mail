import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DomainService } from './domain.service';
import { Domain } from '../../entity/domain';
import { UIDialog } from 'deneb-ui';
import { DomainConfigGuideComponent } from './domain-config-guide/domain-config-guide.component';

@Component({
  selector: 'app-domain-portal',
  templateUrl: './domain-portal.component.html',
  styleUrls: ['./domain-portal.component.less']
})
export class DomainPortalComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  domain: Domain;

  currentTabIndex = 0;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _domainService: DomainService,
              private _dialogService: UIDialog) {
  }

  switchTab(index: number) {
    this.currentTabIndex = index;
  }

  openHelp() {
    this._dialogService.open(DomainConfigGuideComponent, {stickyDialog: false, backdrop: true});
  }

  deleteDomain() {
    this._subscription.add(
      this._domainService.deleteDomain(this.domain.id)
        .subscribe(() => {
          this._router.navigate(['/']);
        })
    );
  }

  ngOnInit() {
    this._subscription.add(
      this._route.paramMap
        .switchMap((params: ParamMap) => {
          return this._domainService.getDomain(parseInt(params.get('id'), 10));
        })
        .subscribe((domain: Domain) => {
          this.domain = domain;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
