import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  HostListener,
  inject,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioService } from './portfolio.service';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  /**
   * After a timeout that ensures that the browser has fully rendered the DOM, this function calls updateHeaderHeight().
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateHeaderHeight();
    }, 0);
  }

  /**
   * When the window size changes, the updateHeaderHeight() function is called.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateHeaderHeight();
  }

  /**
   * This function determines the height of the header element and stores it as a CSS variable (--header-height) in the root of the document.
   */
  updateHeaderHeight() {
    const header = document.querySelector('header');
    if (header) {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.clientHeight}px`
      );
    }
  }
}
