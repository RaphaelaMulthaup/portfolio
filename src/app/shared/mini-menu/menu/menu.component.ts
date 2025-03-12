import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [TranslatePipe, TranslateDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Output() menuClosed = new EventEmitter<void>(); // EventEmitter für das Schließen des Menüs
  /** the path for the standard close image */
  defaultICloseImagePath = 'assets/img/close.png';
  /** the path for the hoverd close image */
  hoverICloseImagePath = 'assets/img/close_hover.png';
  /** the path for the curred close image */
  closeImagePath = this.defaultICloseImagePath;

  /**
   * This function changes the path of close image to hoverd close image.
   */
  closeOnHover() {
    this.closeImagePath = this.hoverICloseImagePath;
  }

  /**
   * This function changes the path of close image to default close image.
   */
  closeOnMouseOut() {
    this.closeImagePath = this.defaultICloseImagePath;
  }

  hideMenu() {
    this.menuClosed.emit(); // Event auslösen, um das Menü in der Elternkomponente zu schließen
  }
}
