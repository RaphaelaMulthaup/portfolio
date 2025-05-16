import { Component } from '@angular/core';
import { FooterComponent } from '../main-content/shared/footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MainHeaderComponent } from '../main-content/shared/main-header/main-header.component';

@Component({
  selector: 'app-imprint',
  imports: [FooterComponent, TranslatePipe, MainHeaderComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent {}
