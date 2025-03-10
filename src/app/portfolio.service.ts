import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  /** the index of the currently shown main component */
  public currentIndexMainComponents = 0;
  /** a list of the main components */
  public mainComonents: ElementRef[] = [];
  /**
   * This function assigns a list of element references of the main components to the variable 'mainComonents'.
   *
   * @param mainComonents a list of element references of the main components
   */
  setMainComponents(mainComonents: ElementRef[]) {
    this.mainComonents = mainComonents;
  }

  /**
   * This function assigns the new index to the variable 'currentIndexMainComponents' and scrolls to the corresponding main component.
   *
   * @param index The index of the current main component.
   */
  scrollToSection(index: number) {
    this.currentIndexMainComponents = index;
    this.mainComonents[index].nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

}
