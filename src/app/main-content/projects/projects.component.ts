import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { CommonModule } from '@angular/common';
import { TouchHoverDirective } from '../shared/directives/touch-hover.directive';
import { TouchImageDirective } from '../shared/directives/touch-image.directive';
import { OverlayController, PortfolioService } from '../../portfolio.service';
interface ProjectData {
  img: string;
  bGroundColor: string;
  colorHexagon: string;
  name: string;
  technologies: string;
  jumpingImg: string;
  description: string;
  development: string;
  subdomain: string;
  gitHub: string;
}

@Component({
  selector: 'app-projects',
  imports: [
    HeaderComponent,
    TranslatePipe,
    NavBulletsComponent,
    HexagonComponent,
    CommonModule,
    TouchHoverDirective,
    TouchImageDirective,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  portfolioService = inject(PortfolioService);
  /** Controller instance for managing overlay behavior */
  overlayController: OverlayController;
  /** Initialize overlay controller from portfolio service. */
  constructor(private cdr: ChangeDetectorRef) {
    this.overlayController = this.portfolioService.createOverlayController();
  }
  /** An array with the names of the projects. */
  projects: string[] = ['dABubble', 'join', 'elPolloLoco'];
  /** The currend displayed project. */
  indexDisplayedProject: number = 0;
  /** The data of the projects. */
  dataProjects: { [key: string]: ProjectData } = {
    dABubble: {
      img: 'assets/img/dabubble.png',
      bGroundColor: 'bgBlue',
      colorHexagon: 'hexagonOrange',
      name: 'DA Bubble',
      technologies: 'Angular | TypeScript | Firebase | HTML | CSS',
      jumpingImg: 'assets/img/speechBubble.png',
      description: 'dABubbleDescription',
      development: 'dABubbleDevelopment',
      subdomain: 'da-bubble',
      gitHub: 'https://github.com/RaphaelaMulthaup/DABubble.git',
    },
    join: {
      img: 'assets/img/join.jpg',
      bGroundColor: 'bgYellow',
      colorHexagon: 'hexagonOrange',
      name: 'Join',
      technologies: 'JavaScript | Firebase | HTML | CSS',
      jumpingImg: 'assets/img/checkMark.png',
      description: 'joinDescription',
      development: 'joinDevelopment',
      subdomain: 'join',
      gitHub: 'https://github.com/RaphaelaMulthaup/Join.git',
    },
    elPolloLoco: {
      img: 'assets/img/elPolloLoco.png',
      bGroundColor: 'bgOrange',
      colorHexagon: 'hexagonYellow',
      name: 'El Pollo Loco',
      technologies: 'JavaScript | HTML | CSS',
      jumpingImg: 'assets/img/chick.png',
      description: 'elPolloLocoDescription',
      development: 'elPolloLocoDevelopment',
      subdomain: 'el-pollo-loco',
      gitHub: 'https://github.com/RaphaelaMulthaup/EL-POLLO-LOCO.git',
    },
  };
  /** The data set belonging to the currently displayed project. */
  dataDisplayedProject: ProjectData =
    this.dataProjects[this.projects[this.indexDisplayedProject]];
  /** Indicates whether the current image is currently fading out. */
  isFadingOut: boolean = false;
  /** The currend image. */
  currentImg: string =
    this.dataProjects[this.projects[this.indexDisplayedProject]].img;
  /** The next image that lies behind the current image. */
  nextImg = this.currentImg;
  /** The currend image. */
  currentJumpingImg: string =
    this.dataProjects[this.projects[this.indexDisplayedProject]].jumpingImg;
  /** The next image that lies behind the current image. */
  nextJumpingImg = this.currentJumpingImg;
  /** This variable indicates whether the jumping image is hovered over. */
  jumpingImgIsHovered: boolean = false;
  /** This variable indicates whether the gitHub button is hovered over. */
  btnGitHubIsHovered: boolean = false;
  /** This variable indicates whether the live test button is hovered over. */
  btnLiveTestIsHovered: boolean = false;

  /**
   * Creates a hover state handler function for the specified element.
   *
   * @param {string} imageName - The base name of the element to create the handler for (e.g., 'gitHub', 'mail').
   * @returns {(state: boolean) => void} - A function that accepts a boolean state and updates the corresponding hover state.
   *
   * @example
   * // Returns a function that updates gitHubIsHovered when called
   * getHoverHandler('gitHub');
   */
  getHoverHandler(imageName: string): (state: boolean) => void {
    return (state: boolean) => this.setHoverState(imageName, state);
  }

  /**
   * Updates the hover state for the specified element by dynamically constructing the property name.
   * The property name is constructed by appending 'IsHovered' to the provided imageName.
   *
   * @param {string} imageName - The base name of the element to update (e.g., 'gitHub' becomes 'gitHubIsHovered').
   * @param {boolean} state - The new hover state (true = hovered, false = not hovered).
   *
   * @example
   * // Sets gitHubIsHovered to true
   * setHoverState('gitHub', true);
   */
  setHoverState(imageName: string, state: boolean) {
    (this as any)[imageName + 'IsHovered'] = state;
  }

  /**
   * Initiates the image change for a project by preparing the next image,
   * updating the project index, and triggering the fade-out animation.
   *
   * @param direction The direction in which the index changes ('next' or 'prev').
   */
  changeProject(direction: string) {
    const nextIndex = this.getIndexNextDisplayedProject(direction);
    this.prepareNextProjectImage(nextIndex);
    this.fadeOutAndSwapImages();
  }

  /**
   * Prepares the next project image and updates the necessary state.
   *
   * @param nextIndex The index of the next project to be displayed.
   */
  private prepareNextProjectImage(nextIndex: number) {
    this.nextImg = this.dataProjects[this.projects[nextIndex]].img;
    this.nextJumpingImg =
      this.dataProjects[this.projects[nextIndex]].jumpingImg;
    this.cdr.detectChanges();
    this.isFadingOut = true;
    this.indexDisplayedProject = nextIndex;
    this.dataDisplayedProject =
      this.dataProjects[this.projects[this.indexDisplayedProject]];
    this.cdr.detectChanges();
  }

  /**
   * Handles the fade-out transition and swaps the current image with the next one.
   * Also triggers change detection to update the DOM.
   */
  private fadeOutAndSwapImages() {
    setTimeout(() => {
      this.currentImg = this.nextImg;
      this.currentJumpingImg = this.nextJumpingImg;
      this.cdr.detectChanges();
      this.isFadingOut = false;
    }, 200);
  }

  /**
   * This function returns the index of the next displayed project.
   *
   * @param direction the direction in which the index changes
   * @returns the index of the next displayed project
   */
  getIndexNextDisplayedProject(direction: string) {
    return direction === 'previous'
      ? (this.indexDisplayedProject - 1 + 3) % 3
      : (this.indexDisplayedProject + 1) % 3;
  }

  /**
   *  This function opens the GitHub repository of the displayed project.
   */
  openGitHub() {
    window.open(
      this.dataProjects[this.projects[this.indexDisplayedProject]].gitHub,
      '_blank'
    );
  }

  /**
   * Sets the overlay element reference when view child is available.
   *
   * @param ref The ElementRef of the projects overlay container
   */
  @ViewChild('overlayProjects') set _(ref: ElementRef) {
    this.overlayController.overlayElementRef = ref;
  }

  /**
   * Listens for document clicks to handle overlay closing when clicking outside.
   *
   * @param event The mouse click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.overlayController.handleDocumentClick(event);
  }

  /**
   * Opens the specified project in a new browser tab.
   *
   * @param {string} projectName The subdomain name of the project to open.
   */
  openProject(projectName: string) {
    const baseDomain = 'raphaela-multhaup.de';
    const url = `https://${projectName}.${baseDomain}`;
    window.open(url, '_blank');
  }
}
