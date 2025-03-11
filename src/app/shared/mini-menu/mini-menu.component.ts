import { Component, inject, Input } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PortfolioService } from '../../portfolio.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-mini-menu',
  imports: [TranslatePipe, TranslateDirective, MenuComponent],
  templateUrl: './mini-menu.component.html',
  styleUrl: './mini-menu.component.scss',
})
export class MiniMenuComponent {
  portfolioService = inject(PortfolioService);
  /** The name of a class that specifies the color of the elements in the header. */
  @Input() headerClass: string = '';
  /** A boolean that indicates whether the language change button is hovered. */
  languageIsHovered: boolean = false;
  /** A boolean that indicates whether the burger menu is hovered. */
  burgermenuIsHovered: boolean = false;
  /** The variable specifies which image set is used for the language button. */
  currentLanguageButtonImgSet: 'imagesEN' | 'imagesDE' = 'imagesDE';

  /** The paths to different colored language change to EN buttons. */
  public imagesEN: { [key: string]: { normal: string; hover: string } } = {
    black: {
      normal: 'assets/img/EN_black.png',
      hover: 'assets/img/EN_black_hover.png',
    },
    cream: {
      normal: 'assets/img/EN_cream.png',
      hover: 'assets/img/EN_cream_hover.png',
    },
  };

  /** The paths to different colored language change to DE buttons. */
  public imagesDE: { [key: string]: { normal: string; hover: string } } = {
    black: {
      normal: 'assets/img/DE_black.png',
      hover: 'assets/img/DE_black_hover.png',
    },
    cream: {
      normal: 'assets/img/DE_cream.png',
      hover: 'assets/img/DE_cream_hover.png',
    },
  };

  /**
   * The paths to different colored burger menu images.
   */
  public imagesBurgermenu: {
    [key: string]: { normal: string; hover: string };
  } = {
    black: {
      normal: 'assets/img/burgermenu_black.png',
      hover: 'assets/img/burgermenu_hover.png',
    },
    cream: {
      normal: 'assets/img/burgermenu_cream.png',
      hover: 'assets/img/burgermenu_hover.png',
    },
  };

  /**
   * This function returns a path to an image, depending on the color class of the header and whether the corresponding img tag is hovered or not.
   *
   * @param hoverState A boolean that indicates whether the img tag is hovered or not.
   * @param imageSet The image set matching the img tag.
   * @returns The path to an image.
   */
  imageSrc(
    hoverState: boolean,
    imageSet: { [key: string]: { normal: string; hover: string } }
  ): string {
    return hoverState
      ? imageSet[this.headerClass]?.hover
      : imageSet[this.headerClass]?.normal;
  }

  /**
   * This function calls the function that changes the language. In addition, the image set for the 'languageButton' is stored in the variable 'currentLanguageButtonImgSet'.
   */
  changeLanguage(): void {
    this.portfolioService.changeLanguage();
    this.currentLanguageButtonImgSet = this.currentLanguageButtonImgSet === 'imagesEN' ? 'imagesDE' : 'imagesEN';
  }
}
