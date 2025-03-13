import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  HostListener,
  inject,
  AfterViewInit,
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
export class AppComponent {
  title = 'portfolio';
}