import { LOCALE_ID, NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
//import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
//import { IntlModule } from "@progress/kendo-angular-intl";
// import "@progress/kendo-angular-intl/locales/es/all";
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    //BrowserModule,
    //BrowserAnimationsModule,
    //IntlModule,
    NbCardModule,
    ThemeModule,
    NbIconModule,
    NbTooltipModule,
    AngularSvgIconModule.forRoot(),
    //DateInputsModule
  ],
  //providers: [{ provide: LOCALE_ID, useValue: "es-ES" }],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {

 }
