import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    HexagonComponent,
    CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  /** An array with the names of the projects. */
  projects: string[] = ['join', 'elPolloLoco', 'dABubble'];
  /** The currend displayed project. */
  indexDisplayedProject: number = 0;
  /** The data of the projects. */
  dataProjects: {
    [key: string]: { img: string; bGroundColor: string; name: string; jumpingImg: string };
  } = {
    join: {
      img: 'assets/img/join.png',
      bGroundColor: 'bgYellow',
      name: 'Join',
      jumpingImg: 'assets/img/checkMark.png',
    },
    elPolloLoco: {
      img: 'assets/img/elPolloLoco.png',
      bGroundColor: 'bgOrange',
      name: 'El Pollo Loco',
      jumpingImg: 'assets/img/chick.png',
    },
    dABubble: {
      img: 'assets/img/elPolloLoco.png',
      bGroundColor: 'bgBlue',
      name: 'DA Bubble',
      jumpingImg: 'assets/img/speechBubble.png',
    },
  };
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
  jumpingImgIsHoverd: boolean = false;

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

    setTimeout(() => {
      this.indexDisplayedProject = nextIndex;
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
}
