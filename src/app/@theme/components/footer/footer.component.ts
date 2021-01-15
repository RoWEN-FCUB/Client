import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">CITMATEL</span>
    <div class="socials">
      <a href="https://www.facebook.com/Citmatel" target="_blank"><nb-icon icon="facebook-outline"></nb-icon></a>
      <a href="https://cu.linkedin.com/company/citmatel" target="_blank"><nb-icon icon="linkedin-outline"></nb-icon></a>
      <a href="https://twitter.com/citmateloficial?lang=en" target="_blank"><nb-icon icon="twitter-outline"></nb-icon></a>
      <!--
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      -->
    </div>
  `,
})
export class FooterComponent {
}
