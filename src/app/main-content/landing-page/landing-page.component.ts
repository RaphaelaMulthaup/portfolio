import { Component, inject, Input } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { LogoNameComponent } from '../shared/logo-name/logo-name.component';
import { MiniMenuComponent } from '../shared/mini-menu/mini-menu.component';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    LogoNameComponent,
    MiniMenuComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  portfolioService = inject(PortfolioService);

  /** A boolean that indicates whether the gitHub button is hovered. */
  gitHubIsHovered: boolean = false;
  /** A boolean that indicates whether the linkedin button is hovered. */
  linkedinIsHovered: boolean = false;
  /** A boolean that indicates whether the mail button is hovered. */
  mailIsHovered: boolean = false;

  /**
   * The paths to different images.
   */
  public images: {
    [key: string]: { normal: string; hover: string };
  } = {
    gitHub: {
      normal: 'assets/img/gitHub.png',
      hover: 'assets/img/gitHub_hover.png',
    },
    linkedin: {
      normal: 'assets/img/linkedIn.png',
      hover: 'assets/img/linkedIn_hover.png',
    },
    mail: {
      normal: 'assets/img/mail.png',
      hover: 'assets/img/mail_hover.png',
    },
  };
}
