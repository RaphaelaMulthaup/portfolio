import { Component, inject, Input } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';

@Component({
  selector: 'app-social-media-buttons',
  imports: [],
  templateUrl: './social-media-buttons.component.html',
  styleUrl: './social-media-buttons.component.scss',
})
export class SocialMediaButtonsComponent {
  portfolioService = inject(PortfolioService);
  /** This boolean indicates whether main header is on the imprint page. */
  @Input() isImprintPage!: boolean;

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
  [key: string]: { normal: string; hover: string; touch?: string };
} = {
  gitHub: {
    normal: 'assets/img/gitHub.png',
    hover: 'assets/img/gitHub_hover.png',
    touch: 'assets/img/gitHubBlack.png',
  },
  linkedin: {
    normal: 'assets/img/linkedIn.png',
    hover: 'assets/img/linkedIn_hover.png',
    touch: 'assets/img/linkedinBlack.png',
  },
  mail: {
    normal: 'assets/img/mail.png',
    hover: 'assets/img/mail_hover.png',
    touch: 'assets/img/mailBlack.png',
  },
};
}
