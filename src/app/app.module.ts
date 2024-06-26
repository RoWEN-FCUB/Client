import { LoginComponent } from './@theme/components/login/login.component';
import { LogoutComponent } from './@theme/components/logout/logout.component';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
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
  NbCheckboxModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { AuthInterceptor } from './services/authInterceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { UploadImgComponent } from './pages/upload-img/upload-img.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewObsComponent } from './pages/new-obs/new-obs.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { SelectSubsComponent } from './pages/select-subs/select-subs.component';
// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AuthGuard } from './services/auth-guard.service';
import { NewWRecordComponent } from './pages/new-wrecord/new-wrecord.component';
import { UpdtWRecordComponent } from './pages/updt-wrecord/updt-wrecord.component';
// import { AnalyticsService } from './@core/utils/analytics.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { StateDescriptionPipe } from './pipes/state-description.pipe';
// import { DeviceStatePipe } from './pipes/device-state.pipe';
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
// import { NgxPaginationModule } from 'ngx-pagination';
import { NewErecordComponent } from './pages/new-erecord/new-erecord.component';
import { EnergyPlansComponent } from './pages/energy-plans/energy-plans.component';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { NewServiceComponent } from './pages/new-service/new-service.component';
import { AdminUserServicesComponent } from './pages/admin-user-services/admin-user-services.component';
import { WpartsComponent } from './pages/wparts/wparts.component';
import { NewCproductComponent } from './pages/new-cproduct/new-cproduct.component';
import { NewCproviderComponent } from './pages/new-cprovider/new-cprovider.component';
import { NewCreceiptComponent } from './pages/new-creceipt/new-creceipt.component';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { UserIdleModule } from 'angular-user-idle';
// import { environment } from '../environments/environment';
// import { CountdownPipe } from './pipes/countdown.pipe';
// import { NgxScrollTopModule } from 'ngx-scrolltop';
import ipserver from './ipserver';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NewGeeComponent } from './pages/new-gee/new-gee.component';
import { NewGrecordComponent } from './pages/new-grecord/new-grecord.component';
import { NewFuelCardComponent } from './pages/new-fuel-card/new-fuel-card.component';
import { NewCrecordComponent } from './pages/new-crecord/new-crecord.component';
import { QuartetsPipe } from './pipes/quartets.pipe';
import { FuelPriceComponent } from './pages/fuel-price/fuel-price.component';
import { AdminFcardComponent } from './pages/admin-fcard/admin-fcard.component';
import { AdjustFuelComponent } from './pages/adjust-fuel/adjust-fuel.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ScanQRComponent } from './pages/scan-qr/scan-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// import { ShortTimePipe } from './pipes/short-time.pipe';

// here is the default text string
@Injectable()
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
        AppComponent, UploadImgComponent, NewTaskComponent, NewObsComponent, NewErecordComponent,
        LoginComponent, LogoutComponent, NewUserComponent, SelectSubsComponent, NewWRecordComponent,
        UpdtWRecordComponent, EnergyPlansComponent, NewCompanyComponent, NewServiceComponent, AdminUserServicesComponent,
        WpartsComponent, NewCproductComponent, NewCproviderComponent, NewCreceiptComponent, NewGeeComponent, NewGrecordComponent, NewFuelCardComponent,
        QuartetsPipe, NewCrecordComponent, FuelPriceComponent, AdminFcardComponent, AdjustFuelComponent, CalendarComponent, ScanQRComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        ReactiveFormsModule,
        NbAutocompleteModule,
        NbFormFieldModule,
        NbSecurityModule,
        NbBadgeModule,
        NbListModule,
        BrowserModule,
        NbToggleModule,
        NbAccordionModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NbAlertModule,
        NbCheckboxModule,
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
        NgbModule,
        // NgxPaginationModule,
        NgxChartsModule,
        UserIdleModule.forRoot({ idle: 300, timeout: 10, ping: 120 }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        DateInputsModule,
        ZXingScannerModule,
    ],
    providers: [
        {
            provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
            useValue: function (req: HttpRequest<any>) {
                return (req.url === ipserver + 'user/refresh' || req.url === ipserver + 'user/login');
            },
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        UserService,
        NotificationService,
        { provide: OWL_DATE_TIME_LOCALE, useValue: 'es' },
        { provide: OwlDateTimeIntl, useClass: DefaultIntl },
        AuthGuard,
        { provide: LOCALE_ID, useValue: 'es' },
        // AnalyticsService,
    ],
    exports: [UploadImgComponent, NewTaskComponent, NewObsComponent, NewUserComponent, SelectSubsComponent,
        NewWRecordComponent, UpdtWRecordComponent, NewErecordComponent, EnergyPlansComponent,
        NewCompanyComponent, NewServiceComponent, AdminUserServicesComponent, WpartsComponent,
        NewCproductComponent, NewCproviderComponent, NewCreceiptComponent, NewGeeComponent, NewGrecordComponent, NewFuelCardComponent, NewCrecordComponent,
        FuelPriceComponent, AdminFcardComponent, AdjustFuelComponent, CalendarComponent, ScanQRComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
