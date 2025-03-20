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
  imports: [
    RouterOutlet,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  ngOnInit() {
    this.updateHeaderHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateHeaderHeight();
  }

  updateHeaderHeight() {
    const header = document.querySelector('header');
    if (header) {
      document.documentElement.style.setProperty('--header-height', `${header.clientHeight}px`);
    }
  }
}