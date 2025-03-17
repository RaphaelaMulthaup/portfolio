import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';

@Component({
  selector: 'app-projects',
  imports: [HeaderComponent, TranslatePipe, TranslateDirective, NavBulletsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
