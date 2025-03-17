import { Component, ElementRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../portfolio.service';

@Component({
  selector: 'app-nav-bullets',
  imports: [CommonModule],
  templateUrl: './nav-bullets.component.html',
  styleUrl: './nav-bullets.component.scss',
})
export class NavBulletsComponent {
  portfolioService = inject(PortfolioService);
  @Input() themeClass: 'bGroundBlack' | 'bGroundCreme' = 'bGroundCreme';
  currentIndexMainComponents =
    this.portfolioService.currentIndexMainComponents;
  bulletArray = Array(6);
}
