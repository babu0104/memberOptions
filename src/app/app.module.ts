import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';

import { MemberOptionsHomeComponent } from './components/memberoptions-home/memberoptions-home.component';
import { OnlyNumber } from './onlynumber.directive';
import {
  AccordionModule, DataScrollerModule, TabViewModule, DialogModule, CheckboxModule, TooltipModule, ListboxModule,
  InputMaskModule, InputSwitchModule, CalendarModule, InputTextareaModule, AutoCompleteModule, PickListModule,
  DataTableModule, SharedModule, GrowlModule, RadioButtonModule, ConfirmDialogModule
} from 'primeng/primeng';

import { IcsNewComponent } from './components/ics-new/ics-new.component';
import { IcsMsoComponent } from './components/ics-mso/ics-mso.component';
import { IcsSettingsComponent } from './components/ics-settings/ics-settings.component';
import { IcsChangelogComponent } from './components/ics-changelog/ics-changelog.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { OptionsComponent } from './components/options/options.component';
import { ThresholdComponent } from './components/threshold/threshold.component';
import { RetroThresholdComponent } from './components/retro-threshold/retro-threshold.component';
import { AlertsInvalidsComponent } from './components/alerts-invalids/alerts-invalids.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { ViewThresholdComponent } from './components/view-threshold/view-threshold.component';
import { ViewRetroThresholdComponent } from './components/view-retro-threshold/view-retro-threshold.component';
import { ViewAlertsInvalidsComponent } from './components/view-alerts-invalids/view-alerts-invalids.component';
import { ViewConnectionComponent } from './components/view-connection/view-connection.component';
import { PcsAlertsInvalidsComponent } from './components/pcs-alerts-invalids/pcs-alerts-invalids.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { PcsNewComponent } from './components/pcs-new/pcs-new.component';
import { PcsOptionsComponent } from './components/pcs-options/pcs-options.component';
import { PcsThresholdComponent } from './components/pcs-threshold/pcs-threshold.component';
import { PcsConnectionComponent } from './components/pcs-connection/pcs-connection.component';
import { PcsHeirarchyComponent } from './components/pcs-heirarchy/pcs-heirarchy.component';
import { PcsContactComponent } from './components/pcs-contact/pcs-contact.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FileSelectionComponent } from './components/file-selection/file-selection.component';
import { PrescreenComponent } from './components/prescreen-new/prescreen-new.component';
import { GroupAdministrationComponent } from './components/group-administration/group-administration.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';

import { ChangeAssociationComponent } from './components/change-association/change-association.component';
import { SecurityLogComponent } from './components/security-log/security-log.component';
import { UnauthorisedUserComponent } from './components/unauthorised-user/unauthorised-user.component';
import { ApplicationVelocityComponent } from './components/application-velocity/application-velocity.component';

import { ChangeLogComponent } from './components/change-log/change-log.component';
/**** For Login Service ****/
import { AuthGuard } from '../app/_guard/index';
import { AuthAnonymousGuard } from '../app/_guard/auth.anonymousguard';
import { AuthenticationService, Auth_UserService } from '../app/_services/index';
import { LoginComponent } from './shared/login/login.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HttpModule, BaseRequestOptions } from '@angular/http';
// used to create fake backend
import { fakeBackendProvider } from '../app/_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IsGreaterValidator } from '../app/_models/isgreater-validator.directive';
import { isGreaterDirective } from '../app/_models/isGreater.directive';
import { isLesserDirective } from '../app/_models/isLesser.directive';
import { ThresholdService } from './_services/threshold.service';
import { PcsHierarchyService } from './_services/pcshierarchy.service';
import { MessageModule } from 'primeng/primeng';
import { DataElementsComponent } from './components/data-elements/data-elements.component';
import { AreacodeSelectionComponent } from './components/areacode-selection/areacode-selection.component';
import { ScfSelectionComponent } from './components/scf-selection/scf-selection.component';
import { PrescreenViewComponent } from './components/prescreen-view/prescreen-view.component';
import { ReportViewComponent } from './components/report-view/report-view.component';
import { AreacodeViewComponent } from './components/areacode-view/areacode-view.component';
import { ScfViewComponent } from './components/scf-view/scf-view.component';
import { PrescreenLogComponent } from './components/prescreen-log/prescreen-log.component';
import { DirectExchangeComponent } from './components/connection/direct-exchange/direct-exchange.component';
import { FileTransferComponent } from './components/connection/file-transfer/file-transfer.component';
import { OnlineInteractiveComponent } from './components/connection/online-interactive/online-interactive.component';
import { ICSDirectComponent } from './components/connection/ICSDirect/ICSDirect.component';
// PcsThreshold Sub components
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarModalComponent } from './components/progressbar-modal/progressbar-modal.component';
import { Util } from '../app/util';
import { ModalService } from './_services/modal.service';
// token interceptor
import { TokenInterceptor } from '../app/_guard/toke.interceptor';
import { AppGlobal } from '../app/_constants/global.static';
import { SecuritylogService } from '../app/_services/securitylog.service';
import { LogoffModalComponent } from './components/logoff-modal/logoff-modal.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastyModule } from 'ng2-toasty';
import { ToastComponent } from './components/toast/toast.component';
import { ToastCommunicationService } from '../app/_services/toast.service';




@NgModule({
  declarations: [
    ToastComponent,
    LogoffModalComponent,
    ProgressBarModalComponent,
    AppComponent,
    OnlyNumber,
    HeaderComponent,
    MemberOptionsHomeComponent,
    IcsNewComponent,
    IcsMsoComponent,
    IcsSettingsComponent,
    IcsChangelogComponent,
    ContactsComponent,
    OptionsComponent,
    ThresholdComponent,
    RetroThresholdComponent,
    AlertsInvalidsComponent,
    ConnectionComponent,
    PcsNewComponent,
    PcsThresholdComponent,
    PcsConnectionComponent,
    PcsHeirarchyComponent,
    PcsContactComponent,
    PcsOptionsComponent,
    PcsAlertsInvalidsComponent,
    LoginComponent,
    LoaderComponent,
    FooterComponent,
    ChangePasswordComponent,
    GroupAdministrationComponent,
    UserAdministrationComponent,
    ChangeAssociationComponent,
    SecurityLogComponent,
    IsGreaterValidator,
    isGreaterDirective,
    isLesserDirective,
    FileSelectionComponent,
    PrescreenComponent,
    DataElementsComponent,
    AreacodeSelectionComponent,
    ScfSelectionComponent,
    ViewContactsComponent,
    ViewOptionsComponent,
    ViewThresholdComponent,
    ViewRetroThresholdComponent,
    ViewAlertsInvalidsComponent,
    ViewConnectionComponent,
    UnauthorisedUserComponent,
    ApplicationVelocityComponent,
    ChangeLogComponent,
    PrescreenViewComponent,
    ReportViewComponent,
    AreacodeViewComponent,
    ScfViewComponent,
    PrescreenLogComponent,
    DirectExchangeComponent,
    FileTransferComponent,
    OnlineInteractiveComponent,
    ICSDirectComponent
  ],
  imports: [
    ConfirmDialogModule,
    MessageModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    DialogModule,
    InputSwitchModule,
    AutoCompleteModule,
    DataTableModule,
    SharedModule,
    ListboxModule,
    TabViewModule,
    CheckboxModule,
    CalendarModule,
    InputTextareaModule,
    FormsModule,
    TooltipModule,
    InputMaskModule,
    PickListModule,
    HttpModule,
    HttpClientModule,
    GrowlModule,
    RadioButtonModule,
    DataScrollerModule,
    MomentModule,
    NgbModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ToastyModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    HttpClient,
    AuthenticationService,
    Auth_UserService,
    AuthGuard,
    AuthAnonymousGuard,
    BaseRequestOptions,
    SecuritylogService,
    ThresholdService,
    PcsHierarchyService,
    AppComponent,
    HeaderComponent,
    Util,
    ModalService,
    AppGlobal,
    MessageService,
    ToastCommunicationService,
    ToastComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProgressBarModalComponent, LogoffModalComponent]
})
export class AppModule { }
