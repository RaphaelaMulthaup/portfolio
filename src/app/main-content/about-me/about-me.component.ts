import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
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
    TranslateDirective,
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
  @ViewChild('overlayMoreAboutMe') set overlayMoreAboutMeRef(ref: ElementRef) {
    this.overlayController.overlayElementRef = ref;
  }

  /**
   * Opens the overlay or toggles its state on touch devices.
   * 
   * @param event The mouse event that triggered the action
   */
  openOverlay(event: MouseEvent) {
    this.overlayController.openOverlay(event);
  }

  /**
   * Handles the touch start event on the close button.
   */
  onCloseTouchStart() {
    this.overlayController.onCloseTouchStart();
  }

  /**
   * Handles the touch end event on the close button.
   */
  onCloseTouchEnd() {
    this.overlayController.onCloseTouchEnd();
  }

  /**
   * Closes the overlay explicitly.
   */
  closeOverlay() {
    this.overlayController.closeOverlay();
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