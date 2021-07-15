import { Component, Inject, OnInit } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends NbLogoutComponent implements OnInit{

}
