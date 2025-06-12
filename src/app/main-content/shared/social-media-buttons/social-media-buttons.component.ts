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
      touchScreen?: string;
      touchScreenTouched?: string;
    };
  } = {
    gitHub: {
      normal: 'assets/img/gitHub.png',
      hover: 'assets/img/gitHub_hover.png',
      touchScreen: 'assets/img/gitHubBlack.png',
      touchScreenTouched: 'assets/img/gitHub_touch.png',
    },
    linkedin: {
      normal: 'assets/img/linkedIn.png',
      hover: 'assets/img/linkedIn_hover.png',
      touchScreen: 'assets/img/linkedinBlack.png',
      touchScreenTouched: 'assets/img/linkedIn_touch.png',
    },
    mail: {
      normal: 'assets/img/mail.png',
      hover: 'assets/img/mail_hover.png',
      touchScreen: 'assets/img/mailBlack.png',
      touchScreenTouched: 'assets/img/mail_touch.png',
    },
  };
  cd: any;
}
