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

    this.freeScroll = window.innerWidth < 1024;

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
        .pipe(throttleTime(800))
        .subscribe((event) => {
          this.handleScroll(event as WheelEvent);
        });
    }
  }

  /**
   * Initializes an IntersectionObserver that observes each main component in the view and triggers whenever at least 50% of a section is visible, during manual scrolling and update the current index accordingly in the PortfolioService. If scrolling through a function is active the observer does nothing.
   */
  private initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
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
      },
      {
        threshold: [0.5],
      }
    );

    this.mainComponents.forEach((ref) => observer.observe(ref.nativeElement));
  }

  /**
   * This function checks whether 'isScrolling' is true and if free scrolling shouldn't occur. If not, it sets 'isScrolling' to true for 800ms and checks in which direction the scrolling is taking place and whether there is another main component in that direction. If so, the new 'currentIndexMainComponents' is set and the function to scroll to that direction is called.
   *
   * @param event the wheel event
   */
  private handleScroll(event: WheelEvent) {
    // if (this.freeScroll) return;
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    const isTextarea = ['textarea'].includes(tagName);

    if (isTextarea) {
      return; // Nicht reagieren, wenn z.B. in einer Textarea gescrollt wird
    }

    if (this.isScrolling) return;
    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 800);

    if (
      event.deltaY > 0 &&
      this.portfolioService.currentIndexMainComponents() <
        this.portfolioService.mainComponents.length - 1
    ) {
      const newIndex = this.portfolioService.currentIndexMainComponents() + 1;
      this.portfolioService.setCurrentIndex(newIndex);
      this.portfolioService.scrollToSection(newIndex);
    } else if (
      event.deltaY < 0 &&
      this.portfolioService.currentIndexMainComponents() > 0
    ) {
      const newIndex = this.portfolioService.currentIndexMainComponents() - 1;
      this.portfolioService.setCurrentIndex(newIndex);
      this.portfolioService.scrollToSection(newIndex);
    }
  }

  /**
   * This HostListener checks whether a keydown event occurs and free scrolling shouldn't occur. If so, the function is called. It checks whether one of the up or down arrow keys is pressed and whether there is another main component in that direction. If so, the new 'currentIndexMainComponents' is set and the function to scroll to that direction is called.
   *
   * @param event the keydown event
   */
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.freeScroll) return;
    if (
      event.key === 'ArrowDown' &&
      this.portfolioService.currentIndexMainComponents() <
        this.portfolioService.mainComponents.length - 1
    ) {
      const newIndex = this.portfolioService.currentIndexMainComponents() + 1;
      this.portfolioService.setCurrentIndex(newIndex);
      this.portfolioService.scrollToSection(newIndex);
    } else if (
      event.key === 'ArrowUp' &&
      this.portfolioService.currentIndexMainComponents() > 0
    ) {
      const newIndex = this.portfolioService.currentIndexMainComponents() - 1;
      this.portfolioService.setCurrentIndex(newIndex);
      this.portfolioService.scrollToSection(newIndex);
    }
  }

  /**
   * This host listener changes the variable 'freeScroll' to true if the screen is narrower than 1024px.
   */
  @HostListener('window:resize')
  onResize() {
    const wasFreeScroll = this.freeScroll;
    this.freeScroll = window.innerWidth < 1024;
    if (wasFreeScroll !== this.freeScroll) {
      location.reload(); // Nur bei Modus-Wechsel neuladen
    }
  }
}
