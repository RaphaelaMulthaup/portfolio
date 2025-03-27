import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from "../shared/hexagon/hexagon.component";

@Component({
  selector: 'app-skills',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    HexagonComponent
],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
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
}
