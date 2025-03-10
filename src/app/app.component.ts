import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  HostListener,
  inject,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioService } from './portfolio.service';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LandingPageComponent,
    AboutMeComponent,
    SkillsComponent,
    ProjectsComponent,
    ReferencesComponent,
    ContactComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
  title = 'portfolio';
  portfolioService = inject(PortfolioService);

  /** This variable stores whether scrolling is currently in progress. */
  private isScrolling = false;

  /** a list of the main components */
  @ViewChildren('section') mainComponents!: QueryList<ElementRef>;

  /**
   * This function passes the list of main components to 'portfolioService' to store it in a variable.
   */
  ngAfterViewInit() {
    this.portfolioService.setMainComponents(this.mainComponents.toArray());
  }

  /**
   * This HostListener checks whether scrolling is currently taking place. If so, the function that checks whether 'isScrolling' is true is executed. If not, it sets 'isScrolling' to true and checks in which direction the scrolling is taking place and whether there is another main component in that direction. If so, the function to scroll to that direction is called.
   *
   * @param event the wheel event
   * @returns 'true' and stops the function if, 'isScrolling' is true
   */
  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling) return;
    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 800);

    if (
      event.deltaY > 0 &&
      this.portfolioService.currentIndexMainComponents <
        this.portfolioService.mainComonents.length - 1
    ) {
      this.portfolioService.scrollToSection(
        ++this.portfolioService.currentIndexMainComponents
      );
    } else if (
      event.deltaY < 0 &&
      this.portfolioService.currentIndexMainComponents > 0
    ) {
      this.portfolioService.scrollToSection(
        --this.portfolioService.currentIndexMainComponents
      );
    }
  }

  /**
   * This HostListener checks whether whether a keydown event occurs. If so, the function is called. It checks whether one of the up or down arrow keys is pressed and whether there is another main component in that direction. If so, the function to scroll to that direction is called.
   *
   * @param event the keydown event
   */
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'ArrowDown' &&
      this.portfolioService.currentIndexMainComponents <
        this.portfolioService.mainComonents.length - 1
    ) {
      this.portfolioService.scrollToSection(
        ++this.portfolioService.currentIndexMainComponents
      );
    } else if (
      event.key === 'ArrowUp' &&
      this.portfolioService.currentIndexMainComponents > 0
    ) {
      this.portfolioService.scrollToSection(
        --this.portfolioService.currentIndexMainComponents
      );
    }
  }
}