import { Component } from '@angular/core';
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
  displayedProject: 'join' | 'elPolloLoco' | 'dABubble' = 'join';
  dataProjects : { [key: string]: { img: string; name: string } } = {
    join: {
      img: 'assets/img/join.png',
      name: 'Join',
    },
    elPolloLoco: {
      img: 'assets/img/elPolloLoco.png',
      name: 'El Pollo Loco',
    },
  };
}
