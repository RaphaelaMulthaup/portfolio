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

  /** the index of the currently shown main component */
  public currentIndexMainComponents = signal(0);

  // Methode, um den Index zu aktualisieren
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
}
