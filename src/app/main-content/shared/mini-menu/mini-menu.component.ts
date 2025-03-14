import { Component, inject, Input, HostListener, ElementRef } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PortfolioService } from '../../../portfolio.service';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-menu',
  imports: [TranslatePipe, TranslateDirective, MenuComponent, CommonModule],
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
  /** This variable indicates whether the menu is currently shown. */
  menuDisplayed: boolean = false;

  private menuDisplayedSubscription!: Subscription;


  /** A reference is created that points to the DOM element of app-mini-menu. */ 
  constructor(private elRef: ElementRef) {}

  /**
   * This function subscribes to the menuDisplayed$ observable and responds to any change in the menuDisplayed state and calls the callback function and this.menuDisplayed is set to the new value.
   */
  ngOnInit() {
    this.menuDisplayedSubscription = this.portfolioService.menuDisplayed$.subscribe((displayed) => {
      this.menuDisplayed = displayed;
    });
  }

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
    this.currentLanguageButtonImgSet =
      this.currentLanguageButtonImgSet === 'imagesEN' ? 'imagesDE' : 'imagesEN';
  }
}
