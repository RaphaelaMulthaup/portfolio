import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';

@Component({
  selector: 'app-projects',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    HexagonComponent,
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
  dataProjects: { [key: string]: { img: string; name: string } } = {
    join: {
      img: 'assets/img/join.png',
      name: 'Join',
    },
    elPolloLoco: {
      img: 'assets/img/elPolloLoco.png',
      name: 'El Pollo Loco',
    },
    dABubble: {
      img: 'assets/img/elPolloLoco.png',
      name: 'El Pollo Loco',
    }
  };
  /** Indicates whether the current image is currently fading out. */
  isFadingOut: boolean = false;
  /** The currend image. */
  currentImg: string = this.dataProjects[this.projects[this.indexDisplayedProject]].img;
  /** The next image that lies behind the current image. */
  nextImg = this.currentImg;

  /**
   * This function cycles through the project images and provides a smooth animation. 'nextImg' receives the path of the next image. After that, 'currentImg' is faded out. Once this is done, the path of 'currentImg' is also updated, and its opacity is increased back to one. In between, the DOM is updated using change detection.
   * 
   * @param direction the direction in which the index changes
   */
  changeProject(direction: string) {
    const nextIndex = this.getIndexNextDisplayedProject(direction);
    this.nextImg = this.dataProjects[this.projects[nextIndex]].img;
    this.cdr.detectChanges();
    this.isFadingOut = true;

    setTimeout(() => {
      this.indexDisplayedProject = nextIndex;
      this.currentImg = this.nextImg;      
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
  getIndexNextDisplayedProject(direction: string){
    return direction === "previous"
    ? (this.indexDisplayedProject - 1 + 3) % 3
    : (this.indexDisplayedProject + 1) % 3;
  }
}
