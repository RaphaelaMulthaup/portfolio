import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { PortfolioService } from '../../portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [HeaderComponent, TranslatePipe, TranslateDirective, NavBulletsComponent, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  portfolioService = inject(PortfolioService);
  /** This variable indicates whether the jumping image is hovered over. */
  jumpingImgIsHoverd: boolean = false;
}
