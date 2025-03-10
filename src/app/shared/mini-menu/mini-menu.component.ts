import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-menu',
  imports: [],
  templateUrl: './mini-menu.component.html',
  styleUrl: './mini-menu.component.scss'
})
export class MiniMenuComponent {
  @Input() headerClass: string = '';
  languageIsHovered: boolean = false;
  burgermenuIsHovered: boolean = false;

  public imagesLanguage: { [key: string]: { normal: string; hover: string } } = {
    'black': {
      normal: 'assets/img/EN_black.png',
      hover: 'assets/img/EN_black_hover.png',
    },
    'cream': {
      normal: 'assets/img/EN_cream.png',
      hover: 'assets/img/EN_cream_hover.png',
    }
  };

  public imagesBurgermenu: { [key: string]: { normal: string; hover: string } } = {
    'black': {
      normal: 'assets/img/burgermenu_black.png',
      hover: 'assets/img/burgermenu_hover.png',
    },
    'cream': {
      normal: 'assets/img/burgermenu_cream.png',
      hover: 'assets/img/burgermenu_hover.png',
    }
  };



  imageSrc(hoverState: boolean, imageSet: { [key: string]: { normal: string; hover: string } }): string {
    return hoverState 
      ? imageSet[this.headerClass]?.hover 
      : imageSet[this.headerClass]?.normal;
  }
}
