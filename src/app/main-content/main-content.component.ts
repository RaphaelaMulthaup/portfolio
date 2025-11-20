import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioService } from '../portfolio.service';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReferencesComponent } from './references/references.component';
import { SkillsComponent } from './skills/skills.component';
import { fromEvent, throttleTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  imports: [
    LandingPageComponent,
    AboutMeComponent,
    SkillsComponent,
    ProjectsComponent,
    ReferencesComponent,
    ContactComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements AfterViewInit {
  portfolioService = inject(PortfolioService);

  /**
   * Initializes the language service and specifies the available languages. Sets German as the default and current language.
   *
   * @param translate The TranslateService, which manages the language translations.
   * @param router Angular's router service for navigation and URL analysis.
   */
  constructor(private translate: TranslateService, private router: Router) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  /** This variable stores whether scrolling is currently in progress. */
  private isScrolling = false;
  /** This variable specifies when free scrolling should occur. */
  freeScroll = false;

  /** a list of the main components */
  @ViewChildren('section') mainComponents!: QueryList<ElementRef>;

  /**
   * This function initializes the main content view:
   *
   * - It passes the list of main components to the 'portfolioService' for internal storage.
   * - It checks the screen with to decide if free scrolling should occur.
   * - It checks whether a specific target index was previously set (e.g. from another route like the imprint page):
   *   - If a non-zero index is present, the corresponding component is shown immediately (without smooth scrolling).
   * - Two functions are called. They initiate the scroll behavior and the intersection observer.
   */
  ngAfterViewInit() {
    history.scrollRestoration = 'manual';
    this.portfolioService.setMainComponents(this.mainComponents.toArray());

    this.freeScroll = window.innerWidth <= 1024;

    const targetIndex = this.portfolioService.getCurrentIndex();
    if (targetIndex !== 0) {
      this.portfolioService.scrollToSection(targetIndex, false);
    }

    this.initScrollBehavior();
    this.initIntersectionObserver();
  }

  /**
   * If free scrolling shouldn't occur a scroll event listener is registered to detect wheel events, which are throttled (max. one every 800 milliseconds) and handled via the `handleScroll()` function.
   */
  private initScrollBehavior() {
    if (!this.freeScroll) {
      fromEvent(window, 'wheel')
        .pipe(throttleTime(1000))
        .subscribe((event) => {
          this.handleScroll(event as WheelEvent);
        });
    }
  }

  /**
   * Initializes an IntersectionObserver that observes each main component.
   * It triggers when at least 50% of a section is visible and updates
   * the current index in the PortfolioService, unless a programmatic scroll is active.
   */
  private initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: [0.5] }
    );

    this.mainComponents.forEach((ref) => observer.observe(ref.nativeElement));
  }

  /**
   * Handles the logic for IntersectionObserver entries.
   * Updates the current index in the PortfolioService if scrolling is manual.
   *
   * @param entries The IntersectionObserver entries being evaluated.
   */
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    if (this.portfolioService.scrollingThroughFunktion()) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const index = this.mainComponents
          .toArray()
          .findIndex((el) => el.nativeElement === entry.target);
        if (index !== -1) {
          this.portfolioService.setCurrentIndex(index);
        }
      }
    });
  }

  /**
   * Handles the wheel scroll event to navigate between sections,
   * unless scrolling is inside a textarea or a scroll lock is active.
   *
   * @param event The wheel event triggered by user scrolling.
   */
  private handleScroll(event: WheelEvent) {
    if (this.shouldIgnoreScroll(event)) return;
    if (!this.lockScrollTemporarily()) return;

    const currentIndex = this.portfolioService.currentIndexMainComponents();
    const maxIndex = this.portfolioService.mainComponents.length - 1;

    this.evaluateScrollDirection(event, currentIndex, maxIndex);
  }

  /**
   * Determines if the scroll should be ignored (e.g., inside a textarea).
   *
   * @param event The wheel event.
   * @returns True if scrolling should be ignored.
   */
  private shouldIgnoreScroll(event: WheelEvent): boolean {
    const target = event.target as HTMLElement;
    return target.tagName.toLowerCase() === 'textarea' || (target.tagName.toLowerCase() === 'span' && target.classList.contains('textReference'));
  }

  /**
   * Locks scroll handling for a short duration to prevent rapid repeats.
   *
   * @returns False if already locked (i.e., a scroll is in progress), true otherwise.
   */
  private lockScrollTemporarily(): boolean {
    if (this.isScrolling) {
      return false;
    }
    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 800);
    return true;
  }

  /**
   * Evaluates scroll direction and triggers navigation if applicable.
   *
   * @param event The wheel event.
   * @param currentIndex The currently active section index.
   * @param maxIndex The highest valid section index.
   */
  private evaluateScrollDirection(
    event: WheelEvent,
    currentIndex: number,
    maxIndex: number
  ): void {
    if (this.shouldScrollDown(event, currentIndex, maxIndex)) {
      this.scrollToIndex(currentIndex + 1);
    } else if (this.shouldScrollUp(event, currentIndex)) {
      this.scrollToIndex(currentIndex - 1);
    }
  }

  /**
   * Checks if scrolling down is allowed.
   *
   * @param event The wheel event.
   * @param currentIndex The currently active section index.
   * @param maxIndex The highest valid section index.
   * @returns True if the user scrolled down and there's a next section.
   */
  private shouldScrollDown(
    event: WheelEvent,
    currentIndex: number,
    maxIndex: number
  ): boolean {
    return event.deltaY > 0 && currentIndex < maxIndex;
  }

  /**
   * Checks if scrolling up is allowed.
   *
   * @param event The wheel event.
   * @param currentIndex The currently active section index.
   * @returns True if the user scrolled up and there's a previous section.
   */
  private shouldScrollUp(event: WheelEvent, currentIndex: number): boolean {
    return event.deltaY < 0 && currentIndex > 0;
  }

  /**
   * Updates the current index in the service and scrolls to that section.
   *
   * @param index The target section index.
   */
  private scrollToIndex(index: number): void {
    this.portfolioService.setCurrentIndex(index);
    this.portfolioService.scrollToSection(index);
  }

/**
 * This HostListener checks whether a keydown event occurs and free scrolling shouldn't occur.
 * If an arrow key is pressed, and the navigation is valid, it updates the current index
 * and scrolls to the corresponding section.
 *
 * @param event The keydown event.
 */
@HostListener('window:keydown', ['$event'])
onKeyDown(event: KeyboardEvent) {
  if (this.freeScroll) return;

  const currentIndex = this.portfolioService.currentIndexMainComponents();
  const maxIndex = this.portfolioService.mainComponents.length - 1;

  this.evaluateKeyNavigation(event, currentIndex, maxIndex);
}

/**
 * Evaluates key press direction and triggers navigation if applicable.
 *
 * @param event The keyboard event.
 * @param currentIndex The currently active section index.
 * @param maxIndex The highest valid section index.
 */
private evaluateKeyNavigation(
  event: KeyboardEvent,
  currentIndex: number,
  maxIndex: number
): void {
  if (event.key === 'ArrowDown' && currentIndex < maxIndex) {
    this.scrollToIndex(currentIndex + 1);
  } else if (event.key === 'ArrowUp' && currentIndex > 0) {
    this.scrollToIndex(currentIndex - 1);
  }
}

  /**
   * This host listener changes the variable 'freeScroll' to true if the screen is narrower than 1024px.
   */
  @HostListener('window:resize')
  onResize() {
    const wasFreeScroll = this.freeScroll;
    this.freeScroll = window.innerWidth <= 1024;
    if (wasFreeScroll !== this.freeScroll) {
      location.reload(); // Nur bei Modus-Wechsel neuladen
    }
  }
}
