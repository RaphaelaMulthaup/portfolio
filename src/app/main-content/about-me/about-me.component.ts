import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { OverlayController, PortfolioService } from '../../portfolio.service';
import { CommonModule } from '@angular/common';
import { TouchHoverDirective } from '../shared/directives/touch-hover.directive';

/**
 * The AboutMeComponent displays personal information and an interactive "About Me" section
 * with hover effects and overlay functionality.
 */
@Component({
  selector: 'app-about-me',
  imports: [
    HeaderComponent,
    TranslatePipe,
    NavBulletsComponent,
    CommonModule,
    TouchHoverDirective
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  /** Injected instance of the PortfolioService for shared functionality */
  portfolioService = inject(PortfolioService);

  /** Indicates whether the jumping image is currently being hovered */
  jumpingImgIsHovered: boolean = false;

  /** Controller instance for managing overlay behavior */
  overlayController: OverlayController;

  constructor() {
    // Initialize the overlay controller from the portfolio service
    this.overlayController = this.portfolioService.createOverlayController();
  }

  /**
   * Sets the overlay element reference when the view child is available.
   * 
   * @param ref The ElementRef of the overlay container
   */
  @ViewChild('overlayMoreAboutMe') set _(ref: ElementRef) {
    this.overlayController.overlayElementRef = ref;
  }

  /**
   * Listens for document clicks to handle overlay closing when clicking outside.
   * 
   * @param event The mouse click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.overlayController.handleDocumentClick(event);
  }
}