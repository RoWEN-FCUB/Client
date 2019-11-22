import { NgModule } from '@angular/core';
import { NbBadgeModule, NbAccordionModule, NbIconModule , NbActionsModule, NbTooltipModule, NbPopoverModule, NbMenuModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule, NbDialogModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NumberPickerModule } from 'ng-number-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { TaskWeekComponent } from './task-week/task-week.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { FormatTimePipe } from '../pipes/format-time.pipe';
import { FormatStatePipe } from '../pipes/format-state.pipe';
import { GetObservationsPipe } from '../pipes/get-observations.pipe';
import { GetObservTextPipe } from '../pipes/get-observ-text.pipe';
import { FormatDateHumanPipe } from '../pipes/format-date-human.pipe';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
@NgModule({
  imports: [
    NbSecurityModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PagesRoutingModule,
    NumberPickerModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbDialogModule,
    NbTabsetModule,
    NbPopoverModule,
    NbTooltipModule,
    NbActionsModule,
    NbIconModule,
    NbDatepickerModule,
    NbAccordionModule,
    NbBadgeModule,
  ],
  declarations: [
    PagesComponent,
    EditProfileComponent,
    AdminUsersComponent,
    TaskWeekComponent,
    AllNotificationsComponent,
    FormatTimePipe,
    FormatStatePipe,
    GetObservationsPipe,
    GetObservTextPipe,
    FormatDateHumanPipe,
    DayOfWeekPipe,
    //SelectSubsComponent,
    //NewUserComponent,
    //NewObsComponent,
    //NewTaskComponent,
    //UploadImgComponent,
  ],
})
export class PagesModule {
}
