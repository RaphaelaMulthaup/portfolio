import { Component } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, TranslatePipe, TranslateDirective, NavBulletsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
