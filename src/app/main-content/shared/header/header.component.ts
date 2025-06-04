import { Component, inject, Input } from '@angular/core';
import { LogoNameComponent } from '../logo-name/logo-name.component';
import { MiniMenuComponent } from '../mini-menu/mini-menu.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PortfolioService } from '../../../portfolio.service';

@Component({
  selector: 'app-header',
  imports: [
    LogoNameComponent,
    MiniMenuComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  portfolioService = inject(PortfolioService);
  @Input() headerClass: string = '';
}
