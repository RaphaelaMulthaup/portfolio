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

  /** A boolean that indicates whether the linkedin button is hovered. */
  linkedinIsHovered: boolean = false;
  /** A boolean that indicates whether the mail button is hovered. */
  mailIsHovered: boolean = false;

  /**
   * Creates a hover state handler function for the specified element.
   *
   * @param {string} imageName - The base name of the element to create the handler for (e.g., 'gitHub', 'mail').
   * @returns {(state: boolean) => void} - A function that accepts a boolean state and updates the corresponding hover state.
   *
   * @example
   * // Returns a function that updates gitHubIsHovered when called
   * getHoverHandler('gitHub');
   */
  getHoverHandler(imageName: string): (state: boolean) => void {
    return (state: boolean) => this.setHoverState(imageName, state);
  }

  /**
   * Updates the hover state for the specified element by dynamically constructing the property name.
   * The property name is constructed by appending 'IsHovered' to the provided imageName.
   *
   * @param {string} imageName - The base name of the element to update (e.g., 'gitHub' becomes 'gitHubIsHovered').
   * @param {boolean} state - The new hover state (true = hovered, false = not hovered).
   *
   * @example
   * // Sets gitHubIsHovered to true
   * setHoverState('gitHub', true);
   */
  setHoverState(imageName: string, state: boolean) {
    (this as any)[imageName + 'IsHovered'] = state;
  }
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
}
