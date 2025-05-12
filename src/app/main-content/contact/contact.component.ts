import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormComponent } from './form/form.component';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-contact',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    FooterComponent,
    FormComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  portfolioService = inject(PortfolioService);
}
