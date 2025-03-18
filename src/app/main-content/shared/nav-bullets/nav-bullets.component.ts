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

  /** This variable has the value 'bGroundCreme' by default, unless it has received the value 'bGroundBlack' from the html template where 'app-nav-bullets' is included. */
  @Input() bGroundBulletPoints: 'bGroundBlack' | 'bGroundCreme' = 'bGroundCreme';
  /** the index of the currently shown main component */
  currentIndexMainComponents =
    this.portfolioService.currentIndexMainComponents;
  /** An array that represents the bullet points */
  bulletArray = Array(6);

  /**
   * This function calls the function to scroll to the selected main component.
   * 
   * @param index the index of the selected main component
   */
  scrollToSection(index: number) {
    this.portfolioService.scrollToSection(index);
  }
}
