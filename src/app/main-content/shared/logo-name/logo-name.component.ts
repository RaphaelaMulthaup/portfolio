import { Component, inject, Input } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { CommonModule } from '@angular/common';
import { TouchHoverDirective } from '../directives/touch-hover.directive';

@Component({
  selector: 'app-logo-name',
  imports: [CommonModule, TouchHoverDirective],
  templateUrl: './logo-name.component.html',
  styleUrl: './logo-name.component.scss'
})
export class LogoNameComponent {
  portfolioService = inject(PortfolioService);
  /** A boolean that indicates whether LogoNameComponent is included in LandingPageComponent. */
  @Input() isLandingPage: boolean = false;
  /** Indicates whether LogoNameComponent is hovered on the imprint page. */
  @Input() isHoveredImprint: boolean = false;
    /** This boolean indicates whether main header is on the imprint page. */
  @Input() isImprintPage!: boolean;
}
