import { Component } from '@angular/core';
import { HexagonComponent } from '../hexagon/hexagon.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TouchHoverDirective } from '../directives/touch-hover.directive';

@Component({
  selector: 'app-footer',
  imports: [HexagonComponent, TranslatePipe, TouchHoverDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
