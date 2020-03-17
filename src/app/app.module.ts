import { LoginComponent } from './@theme/components/login/login.component';
import { LogoutComponent } from './@theme/components/logout/logout.component';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbTabsetModule,
  NbPopoverModule,
  NbTooltipModule,
  NbIconModule,
  NbToggleModule,
  NbAccordionModule,
  NbBadgeModule,
  NbListModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NumberPickerModule } from 'ng-number-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './services/authInterceptor';
import { UploadImgComponent } from './pages/upload-img/upload-img.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewObsComponent } from './pages/new-obs/new-obs.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { SelectSubsComponent } from './pages/select-subs/select-subs.component';
import { NbAlertModule, NbCheckboxModule} from '@nebular/theme';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AuthGuard } from './services/auth-guard.service';
import { ExportAsModule } from 'ngx-export-as';
import { NewWRecordComponent } from './pages/new-wrecord/new-wrecord.component';
// import { ShortSerialPipe } from './pipes/short-serial.pipe';
// import { ShortNamePipe } from './pipes/short-name.pipe';
// import { OnlyDatePipe } from './pipes/only-date.pipe';
// import { UserNamePipe } from './pipes/user-name.pipe';
// import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
// import { FormatDateHumanPipe } from './pipes/format-date-human.pipe';
// import { GetObservTextPipe } from './pipes/get-observ-text.pipe';
// import { GetObservationsPipe } from './pipes/get-observations.pipe';
// import { FormatStatePipe } from './pipes/format-state.pipe';
// import { FormatTimePipe } from './pipes/format-time.pipe';

// here is the default text string
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
  declarations: [
    AppComponent, UploadImgComponent, NewTaskComponent, NewObsComponent,
    LoginComponent, LogoutComponent, NewUserComponent, SelectSubsComponent, NewWRecordComponent],
  imports: [
    ExportAsModule,
    NbSecurityModule,
    NbBadgeModule,
    NbListModule,
    BrowserModule,
    NbToggleModule,
    NbAccordionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NumberPickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NbAlertModule,
    NbCheckboxModule,
    NgxMaterialTimepickerModule,
    ThemeModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    NbPopoverModule,
    NbTooltipModule,
    NbIconModule,
    FormsModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
    UserService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: DefaultIntl},
    AuthGuard,
    {provide: LOCALE_ID, useValue: 'es'},
  ],
  exports: [UploadImgComponent, NewTaskComponent, NewObsComponent, NewUserComponent, SelectSubsComponent, NewWRecordComponent],
  entryComponents: [UploadImgComponent, NewTaskComponent, NewObsComponent, NewUserComponent, SelectSubsComponent, NewWRecordComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
