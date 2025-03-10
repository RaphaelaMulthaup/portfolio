import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, TranslatePipe, TranslateDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
