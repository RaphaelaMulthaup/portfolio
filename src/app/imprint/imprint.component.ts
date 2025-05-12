import { Component } from '@angular/core';
import { FooterComponent } from "../main-content/shared/footer/footer.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  imports: [FooterComponent, TranslatePipe],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

}
