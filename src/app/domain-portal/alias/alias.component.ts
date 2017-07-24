import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AliasService } from './alias.service';
import { Alias } from '../../../entity/alias';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.less']
})
export class AliasComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  @Input()
  domain_id: number;

  aliasList: Alias[];

  constructor(private _aliasService: AliasService) { }

  addAlias() {
    console.log('add alias');
  }

  ngOnInit() {
    this._subscription.add(
      this._aliasService.listAlias(this.domain_id)
        .subscribe(aliasList => {
          this.aliasList = aliasList;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
