import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbIconModule,
    NbTooltipModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {

 }
