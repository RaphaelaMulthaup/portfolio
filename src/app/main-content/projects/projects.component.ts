import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { CommonModule } from '@angular/common';
import { TouchHoverDirective } from '../shared/directives/touch-hover.directive';
import { TouchImageDirective } from '../shared/directives/touch-image.directive';
interface ProjectData {
  img: string;
  bGroundColor: string;
  colorHexagon: string;
  name: string;
  technologies: string;
  jumpingImg: string;
  description: string;
  development: string;
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
    TouchImageDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  /** An array with the names of the projects. */
  projects: string[] = ['join', 'dABubble', 'elPolloLoco'];
  /** The currend displayed project. */
  indexDisplayedProject: number = 0;
  /** The data of the projects. */
  dataProjects: { [key: string]: ProjectData } = {
    join: {
      img: 'assets/img/join.png',
      bGroundColor: 'bgYellow',
      colorHexagon: 'hexagonOrange',
      name: 'Join',
      technologies: 'JavaScript | Firebase | HTML | CSS',
      jumpingImg: 'assets/img/checkMark.png',
      description: 'joinDescription',
      development: 'joinDevelopment',
      gitHub: 'https://github.com/RaphaelaMulthaup/Join.git',
    },
    dABubble: {
      img: 'assets/img/elPolloLoco.png',
      bGroundColor: 'bgBlue',
      colorHexagon: 'hexagonOrange',
      name: 'DA Bubble',
      technologies: 'Angular | TypeScript | Firebase | HTML | CSS',
      jumpingImg: 'assets/img/speechBubble.png',
      description: 'dABubbleDescription',
      development: 'dABubbleDevelopment',
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
  /**
   * Sets the state of btnGitHubIsHovered depending on whether the button is touched or not.
   *
   * @param state  - A boolean indicating whether the gitHub button is touched (true) or not (false).
   */
  setbtnGitHubHovered = (state: boolean) => {
    this.btnGitHubIsHovered = state;
  };
  /** This variable indicates whether the live test button is hovered over. */
  btnLiveTestIsHovered: boolean = false;
  /**
   * Sets the state of btnLiveTestIsHovered depending on whether the button is touched or not.
   *
   * @param state  - A boolean indicating whether the live test button is touched (true) or not (false).
   */
  setbtnLiveTestHovered = (state: boolean) => {
    this.btnLiveTestIsHovered = state;
  };

  /**
   * This function cycles through the project images and provides a smooth animation. 'nextImg' receives the path of the next image. After that, 'currentImg' is faded out. Once this is done, the path of 'currentImg' is also updated, and its opacity is increased back to one. In between, the DOM is updated using change detection.
   *
   * @param direction the direction in which the index changes
   */
  changeProject(direction: string) {
    const nextIndex = this.getIndexNextDisplayedProject(direction);
    this.nextImg = this.dataProjects[this.projects[nextIndex]].img;
    this.nextJumpingImg =
      this.dataProjects[this.projects[nextIndex]].jumpingImg;
    this.cdr.detectChanges();
    this.isFadingOut = true;
    this.indexDisplayedProject = nextIndex;
    this.dataDisplayedProject =
      this.dataProjects[this.projects[this.indexDisplayedProject]];
    this.cdr.detectChanges();

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
}
