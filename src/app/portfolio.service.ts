import { ElementRef, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  /** This Boolean specifies whether the mobile design should be shown. */
  mobileScreen: boolean = false;

  /** This boolean indicates whether the device is a touchscreen. */
  public readonly touchScreen: boolean;

  /**
   * This constructor sets German as the default language and activates it, checks whether it is a touchscreen and the screen size is also checked to display the design for mobile screens if necessary.
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
    this.translate.setDefaultLang('de');
    this.translate.use('de');

    this.touchScreen =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0);

    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .subscribe((result) => {
        this.mobileScreen = result.matches;
      });
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
   * This function sets the variable 'scrollingThroughFunktion' to true, assigns the new index to the variable 'currentIndexMainComponents' and scrolls or jumps to the corresponding main component. And all subscribers of the menuDisplayed$ observable are sent the value false, which closes the menu. After a timeout 'scrollingThroughFunktion' is set to false again.
   *
   * @param index (number) The index of the current main component.
   * @param smooth (boolean) The boolean specifies whether to jump or scroll to the selected component.
   */
  scrollToSection(index: number, smooth: boolean = true) {
    this.scrollingThroughFunktion.set(true);
    this.setCurrentIndex(index);

    const targetMainComponent = this.mainComponents[index]?.nativeElement;
    if (!targetMainComponent) return;

    targetMainComponent.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
    });
    this.menuDisplayedSubject.next(false);

    setTimeout(
      () => {
        this.scrollingThroughFunktion.set(false);
      },
      smooth ? 1000 : 100
    );
  }

  /**
   * Returns the correct image path based on the hover state and (optional) header class.
   *
   * @param hoverState - A boolean indicating whether the image is hovered.
   * @param imageSet - Either:
   *   - An object containing `normal` and `hover` image paths.
   *   - An object where each key corresponds to a different image variation (e.g. different color themes),
   *     with each variation containing `normal` and `hover` image paths.
   * @param headerClass - (Optional) A string specifying which image variation to use (if `imageSet` contains multiple variations).
   * @returns The path to the correct image.
   */
  getImageSrc(
    hoverState: boolean,
    imageSet:
      | { normal: string; hover: string }
      | { [key: string]: { normal: string; hover: string } },
    headerClass?: string
  ): string {
    if (
      headerClass &&
      typeof imageSet === 'object' &&
      headerClass in imageSet
    ) {
      return hoverState
        ? (imageSet as { [key: string]: { normal: string; hover: string } })[
            headerClass
          ].hover
        : (imageSet as { [key: string]: { normal: string; hover: string } })[
            headerClass
          ].normal;
    }
    return hoverState
      ? (imageSet as { normal: string; hover: string }).hover
      : (imageSet as { normal: string; hover: string }).normal;
  }
}
