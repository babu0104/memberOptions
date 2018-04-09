import { Routes, RouterModule } from '@angular/router';


import { MemberOptionsHomeComponent } from './components/memberoptions-home/memberoptions-home.component';
import { IcsNewComponent } from './components/ics-new/ics-new.component';
import { IcsMsoComponent } from './components/ics-mso/ics-mso.component';
import { IcsSettingsComponent } from './components/ics-settings/ics-settings.component';
import { IcsChangelogComponent } from './components/ics-changelog/ics-changelog.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { OptionsComponent } from './components/options/options.component';
import { ThresholdComponent } from './components/threshold/threshold.component';
import { RetroThresholdComponent } from './components/retro-threshold/retro-threshold.component';
import { AlertsInvalidsComponent } from './components/alerts-invalids/alerts-invalids.component';
import { PcsAlertsInvalidsComponent } from './components/pcs-alerts-invalids/pcs-alerts-invalids.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { ViewThresholdComponent } from './components/view-threshold/view-threshold.component';
import { ViewRetroThresholdComponent } from './components/view-retro-threshold/view-retro-threshold.component';
import { ViewAlertsInvalidsComponent } from './components/view-alerts-invalids/view-alerts-invalids.component';
import { ViewConnectionComponent } from './components/view-connection/view-connection.component';
import { PcsNewComponent } from './components/pcs-new/pcs-new.component';
import { PcsThresholdComponent } from './components/pcs-threshold/pcs-threshold.component';
import { PcsConnectionComponent } from './components/pcs-connection/pcs-connection.component';
import { PcsHeirarchyComponent } from './components/pcs-heirarchy/pcs-heirarchy.component';
import { PcsContactComponent } from './components/pcs-contact/pcs-contact.component';
import { LoginComponent } from './shared/login/login.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { GroupAdministrationComponent } from './components/group-administration/group-administration.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { ChangeAssociationComponent } from './components/change-association/change-association.component';
import { SecurityLogComponent } from './components/security-log/security-log.component';
import { AuthAnonymousGuard } from 'app/_guard/auth.anonymousguard';
import { PrescreenComponent } from './components/prescreen-new/prescreen-new.component';
import { PrescreenViewComponent } from './components/prescreen-view/prescreen-view.component';
import { PrescreenLogComponent } from './components/prescreen-log/prescreen-log.component';
import { ChangeLogComponent } from './components/change-log/change-log.component';
import { AuthGuard } from '../app/_guard/index';
export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthAnonymousGuard] },
    { path: 'home', component: MemberOptionsHomeComponent, canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'ics-new', component: IcsNewComponent},
          { path: 'ics-mso', component: IcsMsoComponent},
          { path: 'ics-settings', component: IcsSettingsComponent},
          { path: 'ics-changelog', component: IcsChangelogComponent},
          { path: 'pcs-new', component: PcsNewComponent},
          { path: 'change-password', component: ChangePasswordComponent},
          { path: 'group-administration', component: GroupAdministrationComponent},
          { path: 'user-administration', component: UserAdministrationComponent},
          { path: 'change-association', component: ChangeAssociationComponent},
          { path: 'security-log', component: SecurityLogComponent},
          { path: 'prescreen-new', component: PrescreenComponent},
          { path: 'prescreen-view', component: PrescreenViewComponent},
          { path: 'prescreen-log', component: PrescreenLogComponent}
        ]
    }

];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
