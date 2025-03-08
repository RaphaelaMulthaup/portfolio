import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-logo-name',
  imports: [],
  templateUrl: './logo-name.component.html',
  styleUrl: './logo-name.component.scss'
})
export class LogoNameComponent {
  portfolioService = inject(PortfolioService);

  // /**
  //  * This function calls the function in the portfolio service that scrolls to the main components and makes it scroll to the landing page.
  //  */
  // scrollToLandingPage(){
  //   this.portfolioService.scrollToSection(0);
  // }

  jumpToSection(index: number) {
    this.portfolioService.jumpToSection(index);
  }
}
