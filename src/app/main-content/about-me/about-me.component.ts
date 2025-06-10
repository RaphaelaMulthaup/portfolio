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

@Component({
  selector: 'app-about-me',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    CommonModule,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  portfolioService = inject(PortfolioService);
  /** This variable indicates whether the jumping image is hovered over. */
  jumpingImgIsHoverd: boolean = false;
  /** This variable indicates whether the overlay moreAboutMe was called on a touch screen. */



  overlayController: OverlayController;

  constructor() {
    this.overlayController = this.portfolioService.createOverlayController();
  }

  @ViewChild('overlayMoreAboutMe') set overlayMoreAboutMeRef(ref: ElementRef) {
    this.overlayController.overlayElementRef = ref;
  }

  openOverlay(event: MouseEvent) {
    this.overlayController.openOverlay(event);
  }

  onCloseTouchStart() {
    this.overlayController.onCloseTouchStart();
  }

  onCloseTouchEnd() {
    this.overlayController.onCloseTouchEnd();
  }

  closeOverlay() {
    this.overlayController.closeOverlay();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.overlayController.handleDocumentClick(event);
  }



  // overlayMoreAboutMeCalled: boolean = false;
  // /** This variable stores which element was clicked when JumpingImg is clicked. */
  // private lastClickedElement: EventTarget | null = null;

  // /**
  //  * If the device is a touchscreen, this function checks whether the overlay is already open and closes it if so. Otherwise, this function stores which element was clicked and sets the variable overlayMoreAboutMeCalled to true, which opens the overlay.
  //  *
  //  * @param event The click event on jumpingImg.
  //  */
  // openOverlay(event: MouseEvent): void {
  //   if (this.portfolioService.touchScreen) {
  //     if (this.overlayMoreAboutMeCalled) {
  //       this.closeOverlay();
  //     } else {
  //       this.lastClickedElement = event.target;
  //       this.overlayMoreAboutMeCalled = true;
  //     }
  //   }
  // }
  // /** The default close image path. */
  // closeImgDefault = 'assets/img/closeCream.png';
  // /** The touched version of close image path. */
  // closeImgTouched = 'assets/img/close_hover.png';
  // /** The current path of close image. */
  // closeImgPath = this.closeImgDefault;

  // /**
  //  * This function changes the path of close image to a orange version.
  //  */
  // onCloseTouchStart() {
  //   this.closeImgPath = this.closeImgTouched;
  // }

  // /**
  //  * This function changes the path of close image back to default close image and calls the closeOverlay function.
  //  */
  // onCloseTouchEnd() {
  //   this.closeImgPath = this.closeImgDefault;
  //   this.closeOverlay();
  // }

  // /**
  //  * This function sets the variable overlayMoreAboutMeCalled to false, which closes the overlay.
  //  */
  // closeOverlay(): void {
  //   this.overlayMoreAboutMeCalled = false;
  // }
  // /**
  //  * This detector looks for the overlay moreAboutMe.
  //  */
  // @ViewChild('overlayMoreAboutMe') overlayElementRef!: ElementRef;
  
  // /**
  //  * This host listener checks whether mouse events have occurred on JumpingImg. If so, it returns. If not, it checks whether the click was on the overlay. If that wasn't the case, closeOverlay() is called.
  //  *
  //  * @param event a clickEvent
  //  * @returns The return aborts the function.
  //  */
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   if (this.lastClickedElement && this.lastClickedElement === event.target) {
  //     this.lastClickedElement = null;
  //     return;
  //   }
  //   const clickedInside = this.overlayElementRef?.nativeElement.contains(
  //     event.target
  //   );
  //   if (!clickedInside) {
  //     this.closeOverlay();
  //   }
  // }
}
