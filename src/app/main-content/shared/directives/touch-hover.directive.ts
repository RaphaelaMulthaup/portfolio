import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';

@Directive({
  selector: '[appTouchHover]',
  standalone: true,
})
export class TouchHoverDirective {
  private portfolioService = inject(PortfolioService);
  /** Renderer for safely manipulating DOM elements. */
  private renderer = inject(Renderer2);
  /** Reference to the host DOM element. */
  private el = inject(ElementRef);
  /** CSS class that takes over the styling of the hover effect. */
  private readonly hoverClass = 'hoverEffect';

  /**
   * Adds the hover class on touchstart to give a visual feedback.
   * Prevents the default behavior to avoid double-click issues on some devices.
   */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.portfolioService.touchScreen) {
      this.renderer.addClass(this.el.nativeElement, this.hoverClass);
      event.preventDefault();
    }
  }

  /**
   * Removes the hover class with a short delay on touchend.
   * Also manually triggers a click to ensure expected interaction.
   */
  @HostListener('touchend')
  onTouchEnd() {
    if (this.portfolioService.touchScreen) {
      setTimeout(() => {
        this.renderer.removeClass(this.el.nativeElement, this.hoverClass);
        this.el.nativeElement.click();
      }, 200);
    }
  }
}
