import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { NbCheckboxModule, NbBadgeModule, NbAccordionModule, NbIconModule , NbActionsModule, NbTooltipModule, NbPopoverModule, NbMenuModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule, NbDialogModule, NbTabsetModule, NbDatepickerModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NumberPickerModule } from 'ng-number-picker';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
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
import { UserNamePipe } from '../pipes/user-name.pipe';
import { TallerComponent } from './taller/taller.component';
import { OnlyDatePipe } from '../pipes/only-date.pipe';
import { ShortSerialPipe } from '../pipes/short-serial.pipe';
import { ShortNamePipe } from '../pipes/short-name.pipe';
import { DeviceStatePipe } from '../pipes/device-state.pipe';
import { StateDescriptionPipe } from '../pipes/state-description.pipe';
// import { UpdtWRecordComponent } from './updt-wrecord/updt-wrecord.component';
// import { NewWRecordComponent } from './new-wrecord/new-wrecord.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnergyComponent } from './energy/energy.component';

export class DefaultIntl extends OwlDateTimeIntl {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'Añadir un segundo';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'Disminuir un segundo';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'Añadir un minuto';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'Disminuir un minuto';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'Añadir una hora';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'Disminuir una hora';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Mes anterior';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Mes siguiente';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Año anterior';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Siguiente año';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel = 'Anteriores 21 años';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel = 'Siguientes 21 años';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Cambiar a vista de meses';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Seleccionar mes y año';

  /** A label for the cancel button */
  cancelBtnLabel = 'Cancelar';

  /** A label for the set button */
  setBtnLabel = 'Aceptar';

  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'Desde';

  /** A label for the range 'to' in picker info */
  rangeToLabel = 'Hasta';

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'PM';
}

@NgModule({
  imports: [
    NbSecurityModule,
    // NgxMaterialTimepickerModule,
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
    NbCheckboxModule,
    NgxPaginationModule,
    NbLayoutModule,
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
    UserNamePipe,
    TallerComponent,
    OnlyDatePipe,
    DeviceStatePipe,
    StateDescriptionPipe,
    ShortSerialPipe, ShortNamePipe, EnergyComponent, // UpdtWRecordComponent, // NewWRecordComponent,
    // SelectSubsComponent,
    // NewUserComponent,
    // NewObsComponent,
    // NewTaskComponent,
    // UploadImgComponent,
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: DefaultIntl},
  ],
})
export class PagesModule {
}
