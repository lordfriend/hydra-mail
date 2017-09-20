import { Routes } from '@angular/router';
import { DomainPortalComponent } from './domain-portal/domain-portal.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { RouteGuard } from './authentication/route-guard';
import { LoginWrapperComponent } from './login/login-wrapper.component';

export const appRoutes: Routes = [
  {path: 'login', component: LoginWrapperComponent},
  {path: '', component: DomainListComponent, canActivate: [RouteGuard], pathMatch: 'full'},
  {path: ':id', component: DomainPortalComponent, canActivate: [RouteGuard]},
];
