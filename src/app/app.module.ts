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
import { DialogFrameComponent } from './dialog-frame/dialog-frame.component';
import { AddDomainComponent } from './domain-list/add-domain/add-domain.component';
import { AddUserComponent } from './domain-portal/user/add-user/add-user.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { EditUserComponent } from './domain-portal/user/edit-user/edit-user.component';
import { CommonEditDialogComponent } from './common-edit-dialog/common-edit-dialog.component';
import { AppService } from './app.service';
import { ConfirmDialogModule } from './confirm-dialog/index';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginWrapperComponent } from './login/login-wrapper.component';

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
    FloatButtonComponent,
    DialogFrameComponent,
    AddDomainComponent,
    AddUserComponent,
    PasswordFieldComponent,
    EditUserComponent,
    CommonEditDialogComponent,
    RegisterComponent,
    ResetPasswordComponent,
    LoginWrapperComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    UIModule,
    BrowserAnimationsModule,
    ConfirmDialogModule
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
    RouteGuard,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    AddDomainComponent,
    AddUserComponent,
    EditUserComponent,
    CommonEditDialogComponent,
    RegisterComponent,
    ResetPasswordComponent
  ]
})
export class AppModule {
}
