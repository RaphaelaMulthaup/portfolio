import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-logo-name',
  imports: [TranslatePipe, TranslateDirective],
  templateUrl: './logo-name.component.html',
  styleUrl: './logo-name.component.scss'
})
export class LogoNameComponent {
  portfolioService = inject(PortfolioService);

  /**
   * This function calls the function in the portfolio service that scrolls to the main components and makes it scroll to the landing page.
   */
  scrollToLandingPage(){
    this.portfolioService.scrollToSection(0);
  }
}
