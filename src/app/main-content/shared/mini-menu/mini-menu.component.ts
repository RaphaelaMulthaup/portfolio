import {
  Component,
  inject,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TouchImageDirective } from '../directives/touch-image.directive';

@Component({
  selector: 'app-mini-menu',
  imports: [MenuComponent, CommonModule, TouchImageDirective],
  templateUrl: './mini-menu.component.html',
  styleUrl: './mini-menu.component.scss',
})
export class MiniMenuComponent {
  portfolioService = inject(PortfolioService);
  /** The name of a class that specifies the color of the elements in the header. */
  @Input() headerClass: string = '';
  /** The variable specifies which image set is used for the language button. */
  currentLanguageButtonImgSet: 'imagesEN' | 'imagesDE' = 'imagesEN';
  /** This variable indicates whether the menu is currently shown. */
  menuDisplayed: boolean = false;
  /** Subscription object to track and manage the menuDisplayed$ observable subscription. */
  private menuDisplayedSubscription!: Subscription;
  /** This boolean indicates whether main header is on the imprint page. */
  @Input() isImprintPage!: boolean;

  /** A reference is created that points to the DOM element of app-mini-menu. */
  constructor(private elRef: ElementRef) {}

  /**
   * Lifecycle hook that is executed when the component is initialized.
   *
   * This function subscribes to the menuDisplayed$ observable and responds to any change in the menuDisplayed state and calls the callback function and this.menuDisplayed is set to the new value.
   */
  ngOnInit() {
    this.menuDisplayedSubscription =
      this.portfolioService.menuDisplayed$.subscribe((displayed) => {
        this.menuDisplayed = displayed;
      });
  }

  /**
   * Lifecycle hook that is executed when the component is destroyed.
   *
   * Unsubscribes from `menuDisplayedSubscription` to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.menuDisplayedSubscription) {
      this.menuDisplayedSubscription.unsubscribe();
    }
  }

  /**
   * This HostListener checks whether a click was made anywhere on the page. If so, it calls the function that checks whether the click was within the menu. If the click was not within the menu, the menu is closed.
   *
   * @param event the click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Überprüfen, ob der Klick innerhalb des Menüs war
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.hideMenu();
    }
  }

  /**
   * This function sets the variable menuDisplayed to true.
   */
  displayMenu() {
    this.menuDisplayed = true;
  }

  /**
   * This function sets the variable menuDisplayed to false.
   */
  hideMenu() {
    this.menuDisplayed = false;
  }

  /** A boolean that indicates whether the language change button is hovered. */
  languageIsHovered: boolean = false;

  /** A boolean that indicates whether the burger menu is hovered. */
  burgermenuIsHovered: boolean = false;

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
   * This function calls the function that changes the language. In addition, the image set for the 'languageButton' is stored in the variable 'currentLanguageButtonImgSet'.
   */
  changeLanguage(): void {
    this.portfolioService.changeLanguage();
    this.currentLanguageButtonImgSet =
      this.currentLanguageButtonImgSet === 'imagesEN' ? 'imagesDE' : 'imagesEN';
  }
}
