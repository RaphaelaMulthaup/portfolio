import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { PortfolioService } from '../../portfolio.service';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { ScrollDownAnimationComponent } from './scroll-down-animation/scroll-down-animation.component';
import { TouchHoverDirective } from '../shared/directives/touch-hover.directive';

@Component({
  selector: 'app-landing-page',
  imports: [
    TranslatePipe,
    NavBulletsComponent,
    HexagonComponent,
    MainHeaderComponent,
    ScrollDownAnimationComponent,
    TouchHoverDirective
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  portfolioService = inject(PortfolioService);
}
