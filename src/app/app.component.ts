import {
  Component,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
  // /**
  //  * After a timeout that ensures that the browser has fully rendered the DOM, this function calls updateHeaderHeight().
  //  */
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.updateHeaderHeight();
  //   }, 0);
  // }

  // /**
  //  * When the window size changes, the updateHeaderHeight() function is called.
  //  */
  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.updateHeaderHeight();
  // }

  // /**
  //  * This function determines the height of the header element and stores it as a CSS variable (--header-height) in the root of the document.
  //  */
  // updateHeaderHeight() {
  //   const header = document.querySelector('header');
  //   if (header) {
  //     document.documentElement.style.setProperty(
  //       '--header-height',
  //       `${header.clientHeight}px`
  //     );
  //   }
  // }
}
