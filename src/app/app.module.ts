import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DomainPortalComponent } from './domain-portal/domain-portal.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { UserComponent } from './domain-portal/user/user.component';
import { DkimComponent } from './domain-portal/dkim/dkim.component';
import { BccComponent } from './domain-portal/bcc/bcc.component';
import { AliasComponent } from './domain-portal/alias/alias.component';
import { TransportComponent } from './domain-portal/transport/transport.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token-interceptor';
import { DomainService } from './domain-portal/domain.service';
import { UserService } from './domain-portal/user/user.service';
import { BccService } from './domain-portal/bcc/bcc.service';
import { DkimService } from './domain-portal/dkim/dkim.service';
import { AliasService } from './domain-portal/alias/alias.service';
import { TransportService } from './domain-portal/transport/transport.service';
import { AuthService } from './authentication/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DomainListComponent } from './domain-list/domain-list.component';
import { RouteGuard } from './authentication/route-guard';
import { UIModule } from 'deneb-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FloatButtonComponent } from './float-button/float-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DomainPortalComponent,
    ActionBarComponent,
    UserComponent,
    DkimComponent,
    BccComponent,
    AliasComponent,
    TransportComponent,
    DomainListComponent,
    FloatButtonComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    UIModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DomainService,
    UserService,
    BccService,
    DkimService,
    AliasService,
    TransportService,
    AuthService,
    RouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule {
}
