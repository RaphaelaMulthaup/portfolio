import { Component, Input } from '@angular/core';
import { LogoNameComponent } from '../logo-name/logo-name.component';
import { MiniMenuComponent } from '../mini-menu/mini-menu.component';

@Component({
  selector: 'app-header',
  imports: [LogoNameComponent, MiniMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() headerClass: string = '';
}
