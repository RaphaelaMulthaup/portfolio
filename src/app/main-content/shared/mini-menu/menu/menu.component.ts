import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PortfolioService } from '../../../../portfolio.service';

@Component({
  selector: 'app-menu',
  imports: [TranslatePipe, TranslateDirective, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  portfolioService = inject(PortfolioService);
  /** an event emitter for closing the menu */
  @Output() menuClosed = new EventEmitter<void>();

  /** the path for the standard close image */
  defaultICloseImagePath = 'assets/img/close.png';
  /** the path for the hoverd close image */
  hoverICloseImagePath = 'assets/img/close_hover.png';
  /** the path for the curred close image */
  closeImagePath = this.defaultICloseImagePath;

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
