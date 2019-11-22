import { LoginComponent } from './@theme/components/login/login.component';
import { LogoutComponent } from './@theme/components/logout/logout.component';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
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
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
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
//import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
//import { FormatDateHumanPipe } from './pipes/format-date-human.pipe';
//import { GetObservTextPipe } from './pipes/get-observ-text.pipe';
//import { GetObservationsPipe } from './pipes/get-observations.pipe';
//import { FormatStatePipe } from './pipes/format-state.pipe';
//import { FormatTimePipe } from './pipes/format-time.pipe';


@NgModule({
  declarations: [
    AppComponent, UploadImgComponent, NewTaskComponent, NewObsComponent,
    LoginComponent, LogoutComponent, NewUserComponent, SelectSubsComponent],
  imports: [
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
      multi: true
    }],
    UserService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    AuthGuard,
  ],
  exports: [UploadImgComponent, NewTaskComponent, NewObsComponent, NewUserComponent, SelectSubsComponent],
  entryComponents: [UploadImgComponent, NewTaskComponent, NewObsComponent, NewUserComponent, SelectSubsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
