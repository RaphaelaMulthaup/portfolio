import { Component, inject, Input } from '@angular/core';
import { LogoNameComponent } from '../logo-name/logo-name.component';
import { MiniMenuComponent } from '../mini-menu/mini-menu.component';
import { PortfolioService } from '../../../portfolio.service';

@Component({
  selector: 'app-header',
  imports: [LogoNameComponent, MiniMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  portfolioService = inject(PortfolioService);
  /** The name of a class that specifies the color of the elements in the header. */
  @Input() headerClass: string = '';
}
