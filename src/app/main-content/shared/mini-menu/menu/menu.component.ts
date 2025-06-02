import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PortfolioService } from '../../../../portfolio.service';
import { HexagonComponent } from '../../hexagon/hexagon.component';
import { Router } from '@angular/router';
import { SocialMediaButtonsComponent } from "../../social-media-buttons/social-media-buttons.component";

@Component({
  selector: 'app-menu',
  imports: [TranslatePipe, TranslateDirective, CommonModule, HexagonComponent, SocialMediaButtonsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  portfolioService = inject(PortfolioService);
  /** an event emitter for closing the menu */
  @Output() menuClosed = new EventEmitter<void>();
  /**
   * @param router Angular's router service for navigation and URL analysis.
   */
   constructor(private router: Router) {}
  /** the path for the standard close image */
  defaultICloseImagePath = 'assets/img/close.png';
  /** the path for the hoverd close image */
  hoverICloseImagePath = 'assets/img/close_hover.png';
  /** the path for the curred close image */
  closeImagePath = this.defaultICloseImagePath;
  /** a list of menu items */
  menuItems: string[] = [
    'aboutMe',
    'skillset',
    'portfolio',
    'references',
    'contactMe',
  ];
  /** This boolean indicates whether main header is on the imprint page. */
  @Input() isImprintPage!: boolean;

  /**
   * This function changes the path of close image to hoverd close image.
   */
  closeOnHover() {
    this.closeImagePath = this.hoverICloseImagePath;
  }

  /**
   * This function changes the path of close image to default close image.
   */
  closeOnMouseOut() {
    this.closeImagePath = this.defaultICloseImagePath;
  }

  /**
   * This function triggers the event emitter, which is passed to the parent component to close the menu.
   */
  hideMenu() {
    this.menuClosed.emit();
  }
}
