import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-skills',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    HexagonComponent,
    CommonModule,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  portfolioService = inject(PortfolioService);

  /** An array with the names and image paths for the displayed skills. */
  skillList: { name: string; path: string }[] = [
    {
      name: 'HTML',
      path: 'assets/img/0_html.png',
    },
    {
      name: 'CSS',
      path: 'assets/img/1_css.png',
    },
    {
      name: 'JavaScript',
      path: 'assets/img/2_javaScript.png',
    },
    {
      name: 'TypeScript',
      path: 'assets/img/3_typeScript.png',
    },
    {
      name: 'Angular',
      path: 'assets/img/4_angular.png',
    },
    {
      name: 'Firebase',
      path: 'assets/img/5_firebase.png',
    },
    {
      name: 'Git',
      path: 'assets/img/6_git.png',
    },
    {
      name: 'Rest-Api',
      path: 'assets/img/7_restApi.png',
    },
    {
      name: 'Scrum',
      path: 'assets/img/8_scrum.png',
    },
    {
      name: 'Material Design',
      path: 'assets/img/9_materialDesign.png',
    },
  ];
  /** This variable indicates whether the hat is hovered over. */
  hatIsHoverd: boolean = false;

  /** This variable indicates whether the overlay was called on a touch screen. */
  overlayCalled: boolean = false;
  /** This variable stores which element was clicked when the hat image is clicked. */
  private lastClickedElement: EventTarget | null = null;

  /**
   * If the device is a touchscreen, this function checks whether the overlay is already open and closes it if so. Otherwise, this function stores which element was clicked and sets the variable overlayMoreAboutMeCalled to true, which opens the overlay.
   *
   * @param event The click event on the hat image.
   */
  openOverlay(event: MouseEvent): void {
    if (this.portfolioService.touchScreen) {
      if (this.overlayCalled) {
        this.closeOverlay();
      } else {
        this.lastClickedElement = event.target;
        this.overlayCalled = true;
      }
    }
  }

  /** The default close image path. */
  closeImgDefault = 'assets/img/closeCream.png';
  /** The touched version of close image path. */
  closeImgTouched = 'assets/img/close_hover.png';
  /** The current path of close image. */
  closeImgPath = this.closeImgDefault;

  /**
   * This function changes the path of close image to a orange version.
   */
  onCloseTouchStart() {
    this.closeImgPath = this.closeImgTouched;
  }

  /**
   * This function changes the path of close image back to default close image and calls the closeOverlay function.
   */
  onCloseTouchEnd() {
    this.closeImgPath = this.closeImgDefault;
    this.closeOverlay();
  }

  /**
   * This function sets the variable overlayCalled to false, which closes the overlay.
   */
  closeOverlay(): void {
    this.overlayCalled = false;
  }

  /**
   * This detector looks for the overlay.
   */
  @ViewChild('overlaySkills') overlayElementRef!: ElementRef;

  /**
   * This host listener checks whether mouse events have occurred on the hat. If so, it returns. If not, it checks whether the click was on the overlay. If that wasn't the case, closeOverlay() is called.
   *
   * @param event a clickEvent
   * @returns The return aborts the function.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.lastClickedElement && this.lastClickedElement === event.target) {
      this.lastClickedElement = null;
      return;
    }
    const clickedInside = this.overlayElementRef?.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.closeOverlay();
    }
  }
}
