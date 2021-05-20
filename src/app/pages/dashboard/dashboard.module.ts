import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbIconModule,
    NbTooltipModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {

 }
