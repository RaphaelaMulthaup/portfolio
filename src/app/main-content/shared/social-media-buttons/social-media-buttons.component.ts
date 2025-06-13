import { Component, inject, Input } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { TouchImageDirective } from '../directives/touch-image.directive';

@Component({
  selector: 'app-social-media-buttons',
  imports: [TouchImageDirective],
  templateUrl: './social-media-buttons.component.html',
  styleUrl: './social-media-buttons.component.scss',
})
export class SocialMediaButtonsComponent {
  portfolioService = inject(PortfolioService);
  /** This boolean indicates whether main header is on the imprint page. */
  @Input() isImprintPage!: boolean;

  /** A boolean that indicates whether the gitHub button is hovered. */
  gitHubIsHovered: boolean = false;

  /**
   * Sets the state of gitHubIsHovered depending on whether the image is touched or not.
   *
   * @param state  - A boolean indicating whether the gitHub image is touched (true) or not (false).
   */
  setGitHubHovered = (state: boolean) => {
    this.gitHubIsHovered = state;
  };

  /** A boolean that indicates whether the linkedin button is hovered. */
  linkedinIsHovered: boolean = false;
  /**
   * Sets the state of linkedinIsHovered depending on whether the image is touched or not.
   *
   * @param state  - A boolean indicating whether the linkedIn image is touched (true) or not (false).
   */
  setLinkedInHovered = (state: boolean) => {
    this.linkedinIsHovered = state;
  };

  /** A boolean that indicates whether the mail button is hovered. */
  mailIsHovered: boolean = false;
  /**
   * Sets the state of mailIsHovered depending on whether the image is touched or not.
   *
   * @param state  - A boolean indicating whether the mail image is touched (true) or not (false).
   */
  setMailHovered = (state: boolean) => {
    this.mailIsHovered = state;
  };

  /**
   * The paths to different images.
   */
  public images: {
    [key: string]: {
      normal: string;
      hover: string;
      narrowScreen: string;
      narrowScreenTouch: string;
    };
  } = {
    gitHub: {
      normal: 'assets/img/gitHub.png',
      hover: 'assets/img/gitHub_hover.png',
      narrowScreen: 'assets/img/gitHubBlack.png',
      narrowScreenTouch: 'assets/img/gitHub_touch.png',
    },
    linkedin: {
      normal: 'assets/img/linkedIn.png',
      hover: 'assets/img/linkedIn_hover.png',
      narrowScreen: 'assets/img/linkedinBlack.png',
      narrowScreenTouch: 'assets/img/linkedIn_touch.png',
    },
    mail: {
      normal: 'assets/img/mail.png',
      hover: 'assets/img/mail_hover.png',
      narrowScreen: 'assets/img/mailBlack.png',
      narrowScreenTouch: 'assets/img/mail_touch.png',
    },
  };

  // touchStart(event: TouchEvent, contactOption: string) {
  //   // event.preventDefault(); // Verhindert Standardverhalten (z. B. Scrollen)
  //   const touchedImg = event.target as HTMLImageElement;
  //   touchedImg.src = 'assets/img/' + contactOption + '_touch.png';
  // }

  // touchEnd(event: TouchEvent, contactOption: string) {
  //   const touchedImg = event.target as HTMLImageElement;
  //   setTimeout(() => {
  //     touchedImg.src = this.portfolioService.getImageSrc(
  //       this.gitHubIsHovered,
  //       this.images[contactOption]
  //     );
  //   }, 300);
  // }
}
