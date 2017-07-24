import { Routes } from '@angular/router';
import { DomainPortalComponent } from './domain-portal/domain-portal.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { RouteGuard } from './authentication/route-guard';

export const appRoutes: Routes = [
  {path: '', component: DomainListComponent, canActivate: [RouteGuard], pathMatch: 'full'},
  {path: ':id', component: DomainPortalComponent, canActivate: [RouteGuard]}
];
