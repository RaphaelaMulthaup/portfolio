import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { LogoNameComponent } from '../logo-name/logo-name.component';
import { MiniMenuComponent } from '../mini-menu/mini-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [LogoNameComponent, MiniMenuComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {
  portfolioService = inject(PortfolioService);
  /** This boolean indicates whether main header is on the imprint page. */
  isImprintPage = false;

  /**
   * This function checks whether the user is currently on the imprint page.
   * 
   * @param router Angular's router service for navigation and URL analysis.
   */
  constructor(private router: Router) {
    this.isImprintPage = this.router.url.includes('imprint');
  }


  /** A boolean that indicates whether the gitHub button is hovered. */
  gitHubIsHovered: boolean = false;
  /** A boolean that indicates whether the linkedin button is hovered. */
  linkedinIsHovered: boolean = false;
  /** A boolean that indicates whether the mail button is hovered. */
  mailIsHovered: boolean = false;
  /** A boolean that indicates whether the logo name is hovered. */
  logoNameIsHoveredImprint = false;

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

  /**
   * This function navigates you to the main content component when you are on the imprint page.
   */
  goToMainContent() {
    if (this.isImprintPage) {
      this.router.navigate(['/']);
    }
  }

  /**
   * This function changes the boolean "logoNameIsHoveredImprint" when you hover over the logo name on the imprint page or leave the element with the mouse.
   *
   * @param entering boolean that shows if you enter or leave logo name
   */
  hoverStatus(entering: boolean) {
    if (this.isImprintPage) {
      this.logoNameIsHoveredImprint = entering;
    }
  }
}
