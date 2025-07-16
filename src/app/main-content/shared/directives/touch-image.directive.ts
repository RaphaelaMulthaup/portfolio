import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { PortfolioService } from '../../../portfolio.service';

@Directive({
  selector: '[appTouchImage]',
  standalone: true,
})
export class TouchImageDirective {
  private portfolioService = inject(PortfolioService);
  /** Reference to the image element this directive is applied to. */
  private el = inject(ElementRef<HTMLImageElement>);

  /**
   * Function to set the hovered state in the parent component.
   * Should update the image via Angular binding.
   */
  @Input() appTouchImage!: (hovered: boolean) => void;

  /**
   * Triggers the hover effect manually when a touch starts (on touchscreen only).
   * Prevents default to avoid double events.
   *
   * @param event - The touch event.
   */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.portfolioService.touchScreen && this.appTouchImage) {
      this.appTouchImage(true);
      event.preventDefault();
    }
  }

  /**
   * Removes the hover effect after a short delay and triggers a click manually.
   */
  @HostListener('touchend')
  onTouchEnd() {
    if (this.portfolioService.touchScreen && this.appTouchImage) {
      setTimeout(() => {
        this.appTouchImage(false);
        this.el.nativeElement.click();
      }, 200);
    }
  }
}
