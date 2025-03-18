import { ElementRef, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  /**
   * This constructor sets German as the default language and activates it.
   *
   * @param translate The TranslateService, which manages the language translations.
   */
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
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
   * This function assigns the new index to the variable 'currentIndexMainComponents' and scrolls to the corresponding main component. And all subscribers of the menuDisplayed$ observable are sent the value false, which closes the menu.
   *
   * @param index The index of the current main component.
   */
  scrollToSection(index: number) {
    this.setCurrentIndex(index);
    console.log(this.currentIndexMainComponents);

    this.mainComponents[index].nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
    this.menuDisplayedSubject.next(false);
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
