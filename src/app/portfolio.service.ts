import { ElementRef, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

/**
 * Defines the image paths for a menu icon in normal and hover state.
 */
type ImgSetMenuIcons = { normal: string; hover: string };

/**
 * Defines the image sets for social media buttons.
 * Keys represent platform names (e.g. 'facebook', 'instagram').
 * Optional fields allow responsive variations.
 */
type ImgSetSocialMediaButtons = {
  [key: string]: {
    normal: string;
    hover: string;
    narrowScreen?: string;
    narrowScreenTouch?: string;
  };
};

/**
 * Marks the service as injectable and available app-wide.
 */
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  /** This Boolean specifies whether the mobile design should be shown. */
  mobileScreen: boolean = false;

  /** This boolean indicates whether the device is a touchscreen. */
  public readonly touchScreen: boolean;

  /**
   * This constructor sets German as the default language, initializes touch detection,
   * and observes screen size changes to toggle mobile layout handling.
   *
   * @param translate The TranslateService, which manages the language translations.
   * @param router Angular's router service for navigation and URL analysis.
   * @param breakpointObserver A service from the Angular CDK that monitors media queries and provides notifications when the screen size changes.
   */
  constructor(
    private translate: TranslateService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initTranslations();
    this.touchScreen = this.detectTouchScreen();
    this.initScreenSizeObserver();
  }

  /**
   * Sets the default language and activates it.
   */
  private initTranslations(): void {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  /**
   * Detects if the current device supports touch input.
   *
   * @returns True if the device is a touchscreen.
   */
  private detectTouchScreen(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }

  /**
   * Observes screen width and updates the mobile screen flag for responsive layout.
   */
  private initScreenSizeObserver(): void {
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .subscribe((result) => {
        this.mobileScreen = result.matches;
      });
  }

  /**
   * OverlayController encapsulates the state & methods for an overlay.
   *
   * @returns the OverlayController class which contains the logic for overlays
   */
  createOverlayController() {
    return new OverlayController(this.touchScreen);
  }

  /** a subject to control the menu display state */
  private menuDisplayedSubject = new Subject<boolean>();
  /** here the subject is converted into an observable */
  menuDisplayed$ = this.menuDisplayedSubject.asObservable();

  /**
   * This function checks which language is currently used and switches to the other one accordingly.
   */
  changeLanguage(): void {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'de' ? 'en' : 'de';
    this.translate.use(newLang);
  }

  /** Signal to track the index of the currently shown main component. */
  public currentIndexMainComponents = signal(0);

  /**
   * This function updates the index of the currently shown main component.
   *
   * @param index The new index value to be set.
   */
  setCurrentIndex(index: number) {
    this.currentIndexMainComponents.set(index);
  }

  /**
   * This function queries the index of the current main component.
   *
   * @returns number current index
   */
  getCurrentIndex(): number {
    return this.currentIndexMainComponents();
  }

  /** a list of the main components */
  public mainComponents: ElementRef[] = [];

  /**
   * This function assigns a list of element references of the main components to the variable 'mainComponents'.
   *
   * @param mainComponents a list of element references of the main components
   */
  setMainComponents(mainComponents: ElementRef[]) {
    this.mainComponents = mainComponents;
  }

  /**
   * This function navigates to the selected component on the main content page. If this is done from the imprint page, the corresponding component is displayed immediately; otherwise, the page scrolls to it.
   *
   * @param index (number) The index of the component to be displayed.
   * @param isImprintPage (boolean) This boolean indicates whether main header is on the imprint page.
   */
  navigateFromMainHeader(index: number, isImprintPage: boolean) {
    if (isImprintPage) {
      this.setCurrentIndex(index);
      this.router.navigate(['/']);
    } else {
      this.scrollToSection(index);
    }
  }

  /** This variable indicates whether scrolling is currently carried out, triggered by a function call. */
  public scrollingThroughFunktion = signal(false);

  /**
   * Scrolls or jumps to the main component at the specified index,
   * manages scrolling state and closes the menu during the scroll.
   *
   * @param index The index of the main component to scroll to.
   * @param smooth Whether to scroll smoothly (true) or jump instantly (false).
   */
  scrollToSection(index: number, smooth: boolean = true) {
    this.scrollingThroughFunktion.set(true);
    this.setCurrentIndex(index);
    this.menuDisplayedSubject.next(false);

    this.scrollToMainComponent(index, smooth);
    this.resetScrollingFlagAfterTimeout(smooth);
  }

  /**
   * Scrolls the DOM element of the main component into view.
   *
   * @param index The index of the main component.
   * @param smooth Whether to scroll smoothly or jump instantly.
   */
  private scrollToMainComponent(index: number, smooth: boolean) {
    const target = this.mainComponents[index]?.nativeElement;
    if (!target) return;

    target.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
    });
  }

  /**
   * Resets the scrolling flag after a timeout depending on smoothness.
   *
   * @param smooth Whether scrolling was smooth or instant.
   */
  private resetScrollingFlagAfterTimeout(smooth: boolean) {
    setTimeout(
      () => {
        this.scrollingThroughFunktion.set(false);
      },
      smooth ? 1000 : 100
    );
  }

  /**
   * Returns the correct image path based on the hover state and the screen.
   *
   * @param hoverState - A boolean indicating whether the image is hovered/touched.
   * @param imageSet - Either:
   *   - An object containing `normal` and `hover` image paths (ImgSetMenuIcons).
   *   - An object where each key corresponds to a different image variation (e.g. different social media images) (ImgSetSocialMediaButtons),
   *     with each variation containing `normal`, `hover`, `narrowScreen` and `narrowScreenTouch` image paths.
   * @returns The path to the correct image.
   */
  getImageSrc(
    hoverState: boolean,
    imageSet: ImgSetMenuIcons | ImgSetSocialMediaButtons
  ): string {
    if (this.mobileScreen && (imageSet as any).narrowScreen) {
      if (hoverState) {
        return (imageSet as any).narrowScreenTouch;
      }
      return (imageSet as any).narrowScreen;
    }
    return hoverState
      ? (imageSet as { normal: string; hover: string }).hover
      : (imageSet as { normal: string; hover: string }).normal;
  }
}

/**
 * Helper class for managing overlay states and behavior.
 */
export class OverlayController {
  /** Whether the overlay is currently active */
  overlayCalled = false;

  /** The last clicked element that triggered the overlay */
  lastClickedElement: EventTarget | null = null;

  /** Default close button image path */
  closeImgDefault = 'assets/img/closeCream.png';

  /** Close button image path when touched */
  closeImgTouched = 'assets/img/close_hover.png';

  /** Current close button image path */
  closeImgPath = this.closeImgDefault;

  /** Whether the device is a touchscreen */
  touchScreen: boolean;

  /** Reference to the overlay element */
  overlayElementRef?: ElementRef;

  /**
   * Creates an OverlayController instance.
   *
   * @param touchScreen Whether the device is a touchscreen
   */
  constructor(touchScreen: boolean) {
    this.touchScreen = touchScreen;
  }

  /**
   * Opens the overlay or closes it if already open (touchscreen behavior).
   *
   * @param event The mouse event that triggered the action
   */
  openOverlay(event: MouseEvent): void {
    if (this.touchScreen) {
      if (this.overlayCalled) {
        this.closeOverlay();
      } else {
        this.lastClickedElement = event.target;
        this.overlayCalled = true;
      }
    }
  }

  /**
   * Handles touch start event on close button.
   */
  onCloseTouchStart() {
    this.closeImgPath = this.closeImgTouched;
  }

  /**
   * Handles touch end event on close button.
   */
  onCloseTouchEnd() {
    setTimeout(() => {
      this.closeImgPath = this.closeImgDefault;
      this.closeOverlay();
    }, 200);
  }

  /**
   * Closes the overlay.
   */
  closeOverlay(): void {
    this.overlayCalled = false;
  }

  /**
   * Handles document clicks to close overlay when clicking outside.
   *
   * @param event The click event
   */
  handleDocumentClick(event: MouseEvent) {
    if (this.lastClickedElement && this.lastClickedElement === event.target) {
      this.lastClickedElement = null;
      return;
    }
    if (
      this.overlayElementRef &&
      !this.overlayElementRef.nativeElement.contains(event.target)
    ) {
      this.closeOverlay();
    }
  }
}
