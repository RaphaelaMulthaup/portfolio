import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HexagonComponent } from '../../shared/hexagon/hexagon.component';

@Component({
  selector: 'app-scroll-down-animation',
  imports: [TranslatePipe, HexagonComponent],
  templateUrl: './scroll-down-animation.component.html',
  styleUrl: './scroll-down-animation.component.scss'
})
export class ScrollDownAnimationComponent {

}
