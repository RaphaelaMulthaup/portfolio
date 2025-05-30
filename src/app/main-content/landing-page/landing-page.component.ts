import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { PortfolioService } from '../../portfolio.service';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { ScrollDownAnimationComponent } from './scroll-down-animation/scroll-down-animation.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    HexagonComponent,
    MainHeaderComponent,
    ScrollDownAnimationComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  portfolioService = inject(PortfolioService);
}
