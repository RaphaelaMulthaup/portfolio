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

  constructor(private router: Router) {}

  ngOnInit() {
    this.isImprintPage = this.router.url.includes('imprint');
  }

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
