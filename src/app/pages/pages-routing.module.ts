import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {RoleGuardService as RoleGuard} from '../services/role-guard.service';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { TaskWeekComponent } from './task-week/task-week.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { TallerComponent } from './taller/taller.component';
import { EnergyComponent } from './energy/energy.component';
import { GeeComponent } from './gee/gee.component';
import { AdminCompanyComponent } from './admin-company/admin-company.component';
import { AdminServiceComponent } from './admin-service/admin-service.component';
import { ComercialComponent } from './comercial/comercial.component';
import { DeliversComponent } from './delivers/delivers.component';
import { AdminGeeComponent } from './admin-gee/admin-gee.component';
// import { from } from 'rxjs';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'editProfile',
      component: EditProfileComponent,
      canActivate: [RoleGuard],
      data: {role: ['user', 'tec', 'energy', 'comercial', 'admin']},
    },
    {
      path: 'delivers',
      component: DeliversComponent,
      canActivate: [RoleGuard],
      data: {role: ['user', 'tec', 'energy', 'comercial', 'admin']},
    },
    {
      path: 'tasks',
      component: TaskWeekComponent,
      canActivate: [RoleGuard],
      data: {role: ['user', 'tec', 'energy', 'comercial', 'admin']},
    },
    {
      path: 'workshop',
      component: TallerComponent,
      canActivate: [RoleGuard],
      data: {role: ['tec', 'admin']},
    },
    {
      path: 'tasks/:id/:fecha_inicio/:fecha_fin',
      component: TaskWeekComponent,
      canActivate: [RoleGuard],
      data: {role: ['user', 'tec', 'energy', 'comercial', 'admin']},
    },
    {
      path: 'admin/users',
      component: AdminUsersComponent,
      canActivate: [RoleGuard],
      data: {role: ['admin']},
    },
    {
      path: 'admin/company',
      component: AdminCompanyComponent,
      canActivate: [RoleGuard],
      data: {role: ['admin']},
    },
    {
      path: 'admin/service',
      component: AdminServiceComponent,
      canActivate: [RoleGuard],
      data: {role: ['admin']},
    },
    {
      path: 'admin/gee',
      component: AdminGeeComponent,
      canActivate: [RoleGuard],
      data: {role: ['admin']},
    },
    {
      path: 'notifications',
      component: AllNotificationsComponent,
      canActivate: [RoleGuard],
      data: {role: ['user', 'energy', 'tec', 'comercial', 'admin']},
    },
    {
      path: 'energy',
      component: EnergyComponent,
      canActivate: [RoleGuard],
      data: {role: ['energy', 'comercial', 'admin']},
    },
    {
      path: 'gee',
      component: GeeComponent,
      canActivate: [RoleGuard],
      data: {role: ['energy', 'admin']},
    },
    {
      path: 'comercial',
      component: ComercialComponent,
      canActivate: [RoleGuard],
      data: {role: ['comercial', 'admin']},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
